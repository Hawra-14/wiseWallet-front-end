import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as transactionService from '../services/transactions'

const UpdateForm = (props) => {
    const { transactionId } = useParams()
    const navigate = useNavigate()

    const [transactionToEdit, setTransactionToEdit] = useState({})

    const initialState = {
        name: transactionToEdit.name,
        amount: transactionToEdit.amount,
        expenseCategory: transactionToEdit.expenseCategory,
        incomeCategory: transactionToEdit.incomeCategory,
        date: transactionToEdit.date,
        isIncome: transactionToEdit.isIncome,
    }

    const [formData, setFormData] = useState(initialState)

    useEffect(() => {
        const fetchTransaction = async () => {
            const transactionData = await transactionService.show(transactionId)
            setFormData(transactionData)
        }
        fetchTransaction()
    }, [transactionId])

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await props.handleUpdateTransaction(transactionId, formData)
    }

    if (!formData) return <p>Loading...</p>

    return (
        <div className="container">
            <h1>Edit Transaction</h1>

            {formData.isIncome ? (
                // INCOME EDIT FORM
                <form id="income-form" className="income-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        id="name"
                        onChange={handleChange}
                    />

                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        id="date"
                        onChange={handleChange}
                    />

                    <label htmlFor="incomeCategory">Income Category:</label>
                    <select id="incomeCategory" name="incomeCategory" value={formData.incomeCategory} onChange={handleChange}>
                        <option value="salary">Salary</option>
                        <option value="gift">Gift</option>
                        <option value="voucher">Voucher</option>
                        <option value="sideIncome">Side Income</option>
                        <option value="bonus">Bonus</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="amount">Amount</label>
                    <input required id="amount" name="amount" type="number" value={formData.amount} onChange={handleChange} />

                    <button type="submit">Submit</button>
                </form>
            ) : (
                // EXPENSE EDIT FORM
                <form id="expense-form" className="expense-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>

                    <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        id="name"
                        onChange={handleChange}
                    />

                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        id="date"
                        onChange={handleChange}
                    />

                    <label htmlFor="expenseCategory">Expense Category:</label>
                    <select id="expenseCategory" name="expenseCategory" value={formData.expenseCategory} onChange={handleChange}>
                        <option value="food-and-dining">Food & Dining</option>
                        <option value="housing">Housing</option>
                        <option value="transportation">Transportation</option>
                        <option value="health-and-fitness">Health & Fitness</option>
                        <option value="learning">Learning</option>
                        <option value="entertainment-and-subscriptions">
                            Entertainment & Subscriptions
                        </option>
                        <option value="shopping">Shopping</option>
                        <option value="personal-care">Personal Care</option>
                        <option value="fees-and-charges">Fees & Charges</option>
                        <option value="travel">Travel</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="amount">Amount</label>
                    <input required id="amount" name="amount" type="number" value={formData.amount} onChange={handleChange} />

                    <button type="submit">Submit</button>
                </form>
            )}
        </div >
    )
}

export default UpdateForm