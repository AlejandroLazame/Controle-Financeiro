import transactionController from "./Transactions.controller";
import mongoDb from '../utils/ConnectOnMongo';
import { IFilterTransactions, INewTransaction, IUpdateTransaction } from "../model/types/ITransaction";
import { TransactionType } from "../model/types/ITransaction";
import { ObjectId } from "mongodb";
import exp from "constants";

let _id: ObjectId;

test('Gravação de nova transação no banco de dados, 200 = Sucesso', async ()=> {
    const input: INewTransaction = {
        description: "Compra de mantimentos mensal",
        value: 500.00,
        type: TransactionType.Expense,
        date: new Date(),
        category: 'Casa'
    }
    
    const MockTransaction = {
        input
    }
    
    const expectedResult = {
        description: "Compra de mantimentos mensal",
        value: 500.00,
        type: TransactionType.Expense,
        date: expect.any(Date),
        category: 'Casa',
        _id: expect.any(ObjectId)
    }
    const db = await mongoDb.connectToMongo()
    const result = await transactionController.addNewTransaction(null, MockTransaction, { db });
    _id = result._id!;
    expect(result).toEqual(expectedResult);
})

test('Atualizando Valor da Transacao no banco de dados', async () => {
    const input: IUpdateTransaction = {
        _id: new ObjectId('66f60e1133d28e97c0a4b253'),
        data: {
            value: 250.00
        }
    };

    const MockTransaction = {
        input
    };

    const db = await mongoDb.connectToMongo();
    const result = await transactionController.updateTransaction(null, MockTransaction, { db });
    expect(result).toBeTruthy();
})

test('Atualizando Descricao da Transacao no banco de dados', async () => {
    const input: IUpdateTransaction = {
        _id: new ObjectId('66f60e1133d28e97c0a4b253'),
        data: {
            description: 'Compra do Mes'
        }
    };

    const MockTransaction = {
        input
    };

    const db = await mongoDb.connectToMongo();
    const result = await transactionController.updateTransaction(null, MockTransaction, { db });
    expect(result).toBeTruthy();
})

test('Atualizando Date da Transacao no banco de dados', async () => {
    const input: IUpdateTransaction = {
        _id: new ObjectId('66f60e1133d28e97c0a4b253'),
        data: {
            date: new Date()
        }
    };

    const MockTransaction = {
        input
    };

    const db = await mongoDb.connectToMongo();
    const result = await transactionController.updateTransaction(null, MockTransaction, { db });
    expect(result).toBeTruthy();
})


test('Atualizando categoria da Transacao no banco de dados', async () => {
    const input: IUpdateTransaction = {
        _id: new ObjectId('66f60e1133d28e97c0a4b253'),
        data: {
            category: 'Lazer'
        }
    };

    const MockTransaction = {
        input
    };

    const db = await mongoDb.connectToMongo();
    const result = await transactionController.updateTransaction(null, MockTransaction, { db });
    expect(result).toBeTruthy();
})

test('Atualizando Tipo da Transacao no banco de dados', async () => {
    const input: IUpdateTransaction = {
        _id: new ObjectId('66f60e1133d28e97c0a4b253'),
        data: {
            type: TransactionType.Receipt
        }
    };

    const MockTransaction = {
        input
    };

    const db = await mongoDb.connectToMongo();
    const result = await transactionController.updateTransaction(null, MockTransaction, { db });
    expect(result).toBeTruthy();
})

test('Consultando transações no banco de dados', async ()=>{
    const filters: IFilterTransactions = {
        type: TransactionType.Expense
    }

    const Mock = {
        input: filters
    }
    const db = await mongoDb.connectToMongo();
    const result = await transactionController.listTransactions(null, Mock, { db });
    expect(Array.isArray(result)).toBe(true);
    result.map(transaction=>{
        expect(transaction).toHaveProperty('_id');
        expect(typeof transaction._id).toBe('object');
        expect(transaction).toHaveProperty('description');
        expect(typeof transaction.description).toBe('string');
        expect(transaction).toHaveProperty('value');
        expect(typeof transaction.value).toBe('number');
        expect(transaction).toHaveProperty('type');
        expect(typeof transaction.type).toBe('number');
        expect(transaction).toHaveProperty('date');
        expect(typeof transaction.date).toBe('object');
        expect(transaction).toHaveProperty('category');
        expect(typeof transaction.category).toBe('string');
    })
})

test('Consultando transações por ID no banco de dados', async ()=>{
    const filters: IFilterTransactions = {
        _id: new ObjectId('66f72bca45ccdfdb8ee616c2')
    }

    const Mock = {
        input: filters
    }
    const db = await mongoDb.connectToMongo();
    const result = await transactionController.getTransactionById(null, Mock, { db });
    expect(result).toHaveProperty('_id');
    expect(typeof result._id).toBe('object');
    expect(result).toHaveProperty('description');
    expect(typeof result.description).toBe('string');
    expect(result).toHaveProperty('value');
    expect(typeof result.value).toBe('number');
    expect(result).toHaveProperty('type');
    expect(typeof result.type).toBe('number');
    expect(result).toHaveProperty('date');
    expect(typeof result.date).toBe('object');
    expect(result).toHaveProperty('category');
    expect(typeof result.category).toBe('string');
})

test('Deletar transação', async () => {
    const db = await mongoDb.connectToMongo();
    const result = await transactionController.deleteTransaction(null, { input: { _id } }, { db })
    expect(result).toBeTruthy();
})