import { useState } from "react"
import { Link } from "react-router"

const TransactionList = (props) => {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')

    const isThisMonth = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    }

    const filteredTransactions = props.transactions.filter((transaction) => {
        const matchesSearch = transaction.name.toLowerCase().includes(search.toLowerCase())
        const matchesMonth = filter === 'all' ? true : isThisMonth(transaction.date)
        return matchesSearch && matchesMonth
    })

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
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('thisMonth')}>This Month</button>
            </div>
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
                                <p><strong>{new Date(transaction.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></p>
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
