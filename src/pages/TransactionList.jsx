import { Link } from "react-router"

const TransactionList = (props) => {

    return (
        <main>
            <h1>All Transactions</h1>
            {props.transactions.map((transaction) => (
                <Link to={`/transactions/${transaction._id}`}>
                    <div className={transaction.isIncome ? ("income-card") : ("expense-card")}>
                        <p>Transation name: {transaction.name}</p>
                        <p>Transation amount: {transaction.amount}</p>
                    </div>
                </Link>
            ))}
        </main>
    )
}

export default TransactionList
