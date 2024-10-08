import { ObjectId } from "mongodb";

export enum TransactionType {
    Expense = 'Expense',
    Receipt = 'Receipt'
}

export interface IFilterTransactions {
    _id?: ObjectId;
    type?: TransactionType;
    category?: string;
    date?: Date;
}

export interface INewTransaction {
    _id?: ObjectId;
    description: string;
    value: Number;
    type: TransactionType;
    date: Date;
    category?: ObjectId;
}

export interface IUpdateTransaction {
    _id: ObjectId;
    data: {
        description?: string;
        value?: Number;
        type?: TransactionType;
        date?: Date;
        category?: ObjectId;
    }
}

export interface IDeleteTransaction {
    _id: ObjectId;
}

export default INewTransaction ;