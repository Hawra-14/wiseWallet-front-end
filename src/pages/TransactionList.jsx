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
                                <p><strong>Name: {transaction.name}</strong></p>
                                <p><strong>Amount: {transaction.amount} BD</strong></p>
                                <p><strong>{new Date(transaction.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></p>
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
