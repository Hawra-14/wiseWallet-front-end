import { useParams, useNavigate } from "react-router"

const TransactionDetails = (props) => {
    const { transactionId } = useParams()
    const navigate = useNavigate()

    const transaction = props.transactions.find((transaction) => {
        return transaction._id === transactionId
    })

    return (
        <main>
            <div className="transaction-details">
            <h1>{transaction.name}</h1>
            <p><strong>Amount: </strong>{transaction.amount} BD</p>
            {transaction.isIncome ? (
                <p><strong>Income Category:</strong> {transaction.incomeCategory}</p>
            ) : (
                <p><strong>Expense Category: </strong>{transaction.expenseCategory}</p>
            )}
            <p><strong>Date: </strong>{new Date(transaction.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

            {transaction.userId._id === props.user._id && (
                <div className="actions">
                    <button onClick={() => navigate(`/transactions/${transactionId}/edit`)}>Edit</button>
                    <button onClick={() => props.handleDeleteTransaction(transactionId)}>Delete</button>
                </div>
            )}
            </div>
        </main>
    )
}

export default TransactionDetails