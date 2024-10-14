import { useState, useEffect } from "react";
import axios from 'axios';

const useFecth = (query: string, variables = {}) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fecthData = async () => { 
        const endpoint = 'http://localhost:4000/graphql';
        setLoading(true);
        try {
            const response = await axios.post(endpoint, {
                query,
                variables
            });
            setData(response.data.data);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(()=>{
        fecthData();
    }, [query, JSON.stringify(variables)]);

    return { data, loading, error, refetch: fecthData };
};

export default useFecth;