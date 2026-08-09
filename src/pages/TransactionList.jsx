const TransactionList = (props) => {
    
    return (
        <main>
            <h1>All Transactions</h1>
            {props.transactions.map((transaction) => (
                <p>{transaction.name}</p>
            ))}
        </main>
    )
}

export default TransactionList;
