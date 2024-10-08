import useFecth from "../hooks/useFecth";
import { useEffect, useState } from "react";

import TotalCard from "../components/Card";

const Cards = () => {
    const [Balance, setBalance] = useState(0);
    const [Expenses, setExpenses] = useState(0);
    const [Receipts,setReceipts] = useState(0);
    
    const query = `
        query {
            Balance: getCurrentBalance,
            Expenses: getTotalExpenses,
            Receipts: getTotalReceipts
        }
    `;

    const { data, loading, error } = useFecth(query);

    useEffect(()=> {
        if(data) {
            setBalance(data.Balance);
            setExpenses(data.Expenses);
            setReceipts(data.Receipts);
        }
    },[data]);

    return (
        <ul className="CardsArea">
            { loading && <div> Carregando... </div>}
            { error && <div>Error: {error}</div>}    
            <TotalCard key='Balance'  title="Saldo Atual" data={Balance} iconName="wallet"/>
            <TotalCard key='Expenses' title="Despesas" data={Expenses} iconName="minus"/>
            <TotalCard key='Receipts' title="Receitas" data={Receipts} iconName="plus"/>
        </ul>
    )
}

export default Cards