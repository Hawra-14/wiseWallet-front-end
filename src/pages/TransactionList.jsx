import { Link } from "react-router"

const TransactionList = (props) => {
    //search the subscriber in the list
    function SearchBar() {
        const { subscriber, setsubscriber } = useContext(Context)

        const handleSearch = (e) => {
            e.preventDefault()
            const text = e.target.value;

            const filteredUser = subscriber.filter((user) => {
                if (user.name.includes(text)) {
                    return user.name
                }
            })
            setsubscriber(filteredUser)
        }
        return (
            <div className='searchBar'><TextField
                id="input1"
                label="Search User Name"
                onChange={(e) => handleSearch(e)}
            />
            </div>
        )
    }

    return (
        <main>
            <h1>All Transactions</h1>
            {props.transactions.map((transaction) => (
                transaction.userId._id === props.user._id ? (
                    <Link to={`/transactions/${transaction._id}`}>
                        <div className={transaction.isIncome ? ("income-card") : ("expense-card")}>
                            <p>Transaction name: {transaction.name}</p>
                            <p>Transaction amount: {transaction.amount} BD</p>
                        </div>
                    </Link>
                ) : (
                    false
                )
            ))}
        </main>
    )
}

export default TransactionList
