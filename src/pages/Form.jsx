import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import * as transactionService from '../services/transactions'

const initialState = {
  isIncome: false,
  name: "",
  date: "",
  expenseCategory: "other",
  incomeCategory: "other",
  amount: "",
};

const Add = (props) => {
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();
  const { transactionId } = useParams()

  useEffect(() => {
    const fetchTransaction = async () => {
      const transactionData = await transactionService.show(transactionId)
      setFormData(transactionData)
    }
    if (transactionId) fetchTransaction()

    return () => setFormData(initialState)
  }, [transactionId])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.handleAddTransaction(formData);
    setFormData(initialState);
  };

  const handleIncome = () => {
    let expenseForm = document.getElementById("expense-form");
    expenseForm.classList.add("disable");
    let expenseBtn = document.getElementById('expense-btn')
    expenseBtn.classList.add('transparent-btn')

    let incomeForm = document.getElementById("income-form");
    incomeForm.classList.remove("disable");
    let incomeBtn = document.getElementById('income-btn')
    incomeBtn.classList.remove('transparent-btn')
    setFormData({
      ...formData,
      isIncome: true,
    })
  }

  const handleExpense = () => {
    let incomeForm = document.getElementById("income-form");
    incomeForm.classList.add("disable");
    let incomeBtn = document.getElementById('income-btn')
    incomeBtn.classList.add('transparent-btn')

    let expenseForm = document.getElementById("expense-form");
    expenseForm.classList.remove("disable");
    let expenseBtn = document.getElementById('expense-btn')
    expenseBtn.classList.remove('transparent-btn')
    setFormData({
      ...formData,
      isIncome: false,
    })
  }

  return (
    <main className="container">
      <h1>Add Transaction</h1>

      <div className="choose-button">
        <button id="expense-btn" onClick={handleExpense}>Expense</button>
        <button id="income-btn" className="transparent-btn" onClick={handleIncome}>Income</button>
      </div>

      {/* INCOME FORM */}
      <form id="income-form" className="income-form disable" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
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

        <label htmlFor="incomeCategory">Income Category</label>
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

      {/* EXPENSE FORM */}
      <form id="expense-form" className="expense-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
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

        <label htmlFor="expenseCategory">Expense Category</label>
        <select id="expenseCategory" name="expenseCategory" value={formData.expenseCategory} onChange={handleChange}>
          <option value="food and dining">Food & Dining</option>
          <option value="housing">Housing</option>
          <option value="transportation">Transportation</option>
          <option value="health and fitness">Health & Fitness</option>
          <option value="learning">Learning</option>
          <option value="entertainment and subscriptions">
            Entertainment & Subscriptions
          </option>
          <option value="shopping">Shopping</option>
          <option value="personal care">Personal Care</option>
          <option value="fees and charges">Fees & Charges</option>
          <option value="travel">Travel</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="amount">Amount</label>
        <input required id="amount" name="amount" type="number" value={formData.amount} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>

    </main>
  );
};
export default Add;
