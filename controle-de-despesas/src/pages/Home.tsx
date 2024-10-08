import Cards from "../components/Cards";
import TransactionsList from "../components/TransactionsList";

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