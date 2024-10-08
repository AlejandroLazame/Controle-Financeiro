import IContext from '../model/types/IContext';
import { INewTransaction, IUpdateTransaction, IDeleteTransaction, IFilterTransactions, TransactionType } from "../model/types/ITransaction";
import { ObjectId } from 'mongodb';

interface TransactionController {
    listTransactions: (
        _: unknown,
        args: {input: IFilterTransactions},
        ctx: IContext
    ) => Promise<Array<INewTransaction>>;
    getTransactionById: (
        _: unknown,
        args: {input: IFilterTransactions},
        ctx: IContext
    ) => Promise<INewTransaction>;
    getTotalExpenses: (
        _: unknown,
        ctx: IContext
    ) => Promise<Number>;
    getTotalReceipts: (
        _: unknown,
        ctx: IContext
    ) => Promise<Number>;
    getCurrentBalance: (
        _: unknown,
        ctx: IContext
    ) => Promise<Number>;

    addNewTransaction: (
        _: unknown,
        args: { input : INewTransaction},
        ctx: IContext
    ) => Promise<INewTransaction>;
    updateTransaction: (
        _: unknown,
        args: { input: IUpdateTransaction},
        ctx: IContext
    ) => Promise<Boolean>;
    deleteTransaction: (
        _: unknown,
        args: { input: IDeleteTransaction},
        ctx: IContext
    ) => Promise<Boolean>;
}

const transactionController: TransactionController = {
    listTransactions: async (_: unknown, args: { input: IFilterTransactions}, ctx: IContext): Promise<Array<INewTransaction>> => {
        const { db } = ctx;
        const filters = {
            ...args.input
        }

        const expenses: Array<INewTransaction> = await db.collection('transactions')
            .find<INewTransaction>({...filters, type: TransactionType.Expense})
            .toArray();

        const receipts: Array<INewTransaction> = await db.collection('transactions')
            .find<INewTransaction>({...filters, type: TransactionType.Receipt})
            .toArray();
        
        if(!expenses && !receipts){
            throw new Error('Não foram encontradas transações para os filtros fornecidos');
        }

        return [...expenses, ...receipts]!
    },
    getTransactionById: async (_: unknown, args: { input: IFilterTransactions }, ctx: IContext): Promise<INewTransaction> => {
        const { db } = ctx;        
        const { _id } = args.input;

        if(!_id || typeof _id !== 'string') {
            throw new Error('ID invalido fornecido.')
        }
        
        const transaction: INewTransaction | null = await db.collection('transactions')
            .findOne<INewTransaction>({_id: new ObjectId(_id)});

        if(transaction === null){
            throw new Error('Não foram encontradas transações para os filtros fornecidos');
        }

        return transaction!
    },
    getTotalExpenses: async (_: unknown, ctx: IContext) => {
        const { db } = ctx;
        const expenses = await db.collection('transactions').aggregate([
            {
                $match: {
                    type: TransactionType.Expense
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$value"}
                }
            }
        ]).toArray();

        const totalExpenses = expenses.length > 0 ? expenses[0].total : 0

        return totalExpenses;
    },
    getTotalReceipts: async (_: unknown, ctx: IContext) => {
        const { db } = ctx;
        const receipts = await db.collection('transactions').aggregate([
            {
                $match: {
                    type: TransactionType.Receipt
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$value"}
                }
            }
        ]).toArray();

        const totalReceipts = receipts.length > 0 ? receipts[0].total : 0

        return totalReceipts;
    },
    getCurrentBalance: async (_: unknown, ctx: IContext) => {
        const totalExpenses = +await transactionController.getTotalExpenses(null, ctx); 
        const totalReceipts = +await transactionController.getTotalReceipts(null, ctx);

        const balance = totalReceipts - totalExpenses; 
        return balance && balance;
    },

    addNewTransaction: async (_: unknown, args: { input: INewTransaction }, ctx: IContext): Promise<INewTransaction> => {
        const input = args.input;
        const { db } = ctx;
        try {
            const newTransaction = {
                ...input,
                date: new Date()
            }
            const { insertedId } = await db.collection('transactions')
                .insertOne(newTransaction);
            newTransaction._id = insertedId;

            return newTransaction
        } catch (error) {
            console.error('Ocorreu um erro ao adicionar nova transação: ', error);
            throw new Error(`Erro ao salvar transação ${(error as Error).message}`);
        }
    },
    updateTransaction: async (_: unknown, args: { input: IUpdateTransaction}, ctx: IContext): Promise<Boolean> => {
        const { _id, data} = args.input;
        const { db } = ctx;
        try {
            const { acknowledged } = await db.collection('transactions')
                .updateOne({_id: new ObjectId(_id)}, {$set: data}, { upsert: false});
           
            return acknowledged;
        } catch (error) {
            console.error('Ocorreu um erro ao adicionar nova transação: ', error);
            throw new Error(`Erro ao salvar transação ${(error as Error).message}`);
        }
    },
    deleteTransaction: async (_: unknown, args: {input: IDeleteTransaction}, ctx: IContext): Promise<Boolean> => {
        const { _id } = args.input;
        const { db } = ctx;
        try {
            const { acknowledged } = await db.collection('transactions')
                .deleteOne({ _id: new ObjectId(_id)});

            return acknowledged;
        } catch (error) {
            console.error(`Ocorreu um erro ao deletar uma transação`, error);
            throw new Error(`Erro ao excluir transação ${(error as Error).message}`);
        }
    }
}

export default transactionController;