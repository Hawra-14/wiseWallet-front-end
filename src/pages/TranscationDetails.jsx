import { useParams } from "react-router"

const TransactionDetails = (props) => {
    const { transactionId } = useParams()

    const transaction = props.transactions.find((transaction) => {
        return transaction._id === transactionId
    })

    return (
        <main>
            <h1>Transaction: {transaction.name}</h1>
            <p>Amount: {transaction.amount} BD</p>
            {transaction.isIncome ? (
                <p>Income Category: {transaction.incomeCategory}</p>
            ) : (
                <p>Expense Category: {transaction.expenseCategory}</p>
            )}
            <p>Month: {transaction.month}</p>
        </main>
    )
}

export default TransactionDetails