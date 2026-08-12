import { useState } from "react"
import { Link } from "react-router"
import wallet from "../assets/wallet.png"
import expense from "../assets/expense.png"

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
        <main style={{maxWidth:'800px'}}>
            <h1>All Transactions</h1>
            <div className="balance-filter">
                <div class="searchbox">
                    <input
                        type="text"
                        placeholder="Search transactions by name..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>
                <div className="filters">
                    <button className={filter === 'all' ? 'active' : 'inactive'} onClick={() => setFilter('all')}>All</button>
                    <button className={filter === 'thisMonth' ? 'active' : 'inactive'} onClick={() => setFilter('thisMonth')}>This Month</button>
                </div>
            </div>
            <div className="transactions">
                {filteredTransactions.map((transaction) => (
                    transaction.userId._id === props.user._id ? (
                        <Link to={`/transactions/${transaction._id}`} key={transaction._id}>
                            {transaction.isIncome ? (
                                <div className="income-card">
                                    <img src={wallet} alt="income image" />
                                    <p><strong>Name: {transaction.name}</strong></p>
                                    <p><strong>Amount: {transaction.amount} BD</strong></p>
                                    <p><strong>{new Date(transaction.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></p>
                                </div>
                            ) : (
                                <div className="expense-card">
                                    <img src={expense} alt="expense image" />
                                    <p><strong>Name: {transaction.name}</strong></p>
                                    <p><strong>Amount: {transaction.amount} BD</strong></p>
                                    <p><strong>{new Date(transaction.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></p>
                                </div>
                            )}
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
