import { useEffect, useState } from "react";
import useFecth from "../hooks/useFecth";
import { ObjectId } from "mongoose";

enum TransactionType {
    Expense = 'Expense',
    Receipt = 'Receipt'
}

interface INewTransaction {
    _id?: ObjectId;
    description: string;
    value: Number;
    type: TransactionType;
    date: Date;
    category?: ObjectId;
}

const NewTransaction: React.FC<INewTransaction> = ({ input }) => {
    const mutation = ``

    const handlePostNewTransaction = () => {

    }

    const query = `
        
    `
    const { data, error, loading } = useFecth()
    return (
        <form>
            <label htmlFor="#">
                <small>Tipo da transação</small>
                <select name="transaction-type" id="transaction-type">
                    {}
                </select>
            </label>
        </form>
    )
}

export default NewTransaction