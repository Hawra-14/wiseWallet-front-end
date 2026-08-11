import { Link } from "react-router"

const Budgets = (props) => {

    return (
        <main>
            <h1>All Budgets</h1>
            {props.budgets.map((budget) => (
                budget.userId._id === props.user._id ? (
                <Link to={`/budgets/${budget._id}`}>
                    <div>
                        <p>Budget Name: {budget.name}</p>
                        <p>Budget Amount: {budget.amount} BD</p>
                    </div>
                </Link>
                ) : (
                    false
                )
            ))}
        </main>
    )
}

export default Budgets
