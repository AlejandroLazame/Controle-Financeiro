import Cards from "../components/Cards/Cards";
import TransactionsList from "../components/Transactions/TransactionsList";

const Home = () => {
    return (
       <>
        <Cards/>
        <section className="GraphqArea"></section>
        <TransactionsList/>
       </> 
    )
}

export default Home;