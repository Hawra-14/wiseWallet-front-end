import { useState } from "react"
import { Link } from "react-router"

const TransactionList = (props) => {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')

    const filteredTransactions = props.transactions.filter((transaction) =>
        transaction.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <main>
            <h1>All Transactions</h1>
            <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <div>
                <h3>{props.balance ? `Your Balance is ${props.balance} BD` : `Loading..`}</h3>
            </div>
            <div className="transactions">
                {filteredTransactions.map((transaction) => (
                    transaction.userId._id === props.user._id ? (
                        <Link to={`/transactions/${transaction._id}`} key={transaction._id}>
                            <div className={transaction.isIncome ? ("income-card") : ("expense-card")}>
                                <p>Name: {transaction.name}</p>
                                <p>Amount: {transaction.amount} BD</p>
                                <p>{new Date(transaction.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                        </Link>
                    ) : (
                        false
                    )
                ))}
            </div>
        </main>
    )
}

export default TransactionList
