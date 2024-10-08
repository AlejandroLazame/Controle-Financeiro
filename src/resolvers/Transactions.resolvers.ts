import transactionController from "../controller/Transactions.controller";
import IContext from '../model/types/IContext';
import { INewTransaction, IUpdateTransaction, IDeleteTransaction, IFilterTransactions } from "../model/types/ITransaction";
import { ObjectId } from "mongodb";

const Query = {
    listTransactions: async (_: unknown, args: { input: IFilterTransactions}, ctx: IContext) => {
        return await transactionController.listTransactions(_, args, ctx);
    },
    getTransactionById: async (_: unknown, args: { input: IFilterTransactions}, ctx: IContext) => {
        return await transactionController.getTransactionById(_, args, ctx);
    },
    getTotalExpenses: async (_: unknown, args: any, ctx: IContext) => {
        return await transactionController.getTotalExpenses(_, ctx);
    },
    getTotalReceipts: async (_: unknown, args: any, ctx: IContext) => {
        return await transactionController.getTotalReceipts(_, ctx);
    },
    getCurrentBalance: async (_: unknown, args: any, ctx: IContext) => {
        return await transactionController.getCurrentBalance(_, ctx);
    }
}

const TransactionUnion = {
    __resolveType(obj: INewTransaction) {
        if(obj.category) {
            return 'Expense';
        }
        
        return 'Receipt';
    }
}

const Expense = {
    category: async (expense: INewTransaction, _: null, ctx: IContext) => {
        const { db } = ctx;
        const category = await db.collection('categories')
            .findOne({_id: new ObjectId(expense.category)});
        
        if(!category){
            throw new Error('Despesa nao categorizada.')
        }            

        return category;
    }
}

const Mutation = {
    addNewTransaction: async (_: unknown, args: { input: INewTransaction}, ctx: IContext) => {
        return await transactionController.addNewTransaction(_, args, ctx);
    },
    updateTransaction: async (_: unknown, args: { input: IUpdateTransaction}, ctx: IContext) => {
        return await transactionController.updateTransaction(_, args, ctx);
    },
    deleteTransactionById: async (_: unknown, args: { input: IDeleteTransaction}, ctx: IContext) => {
        return await transactionController.deleteTransaction(_, args, ctx);
    }
}

export default { Query, Mutation, TransactionUnion, Expense}