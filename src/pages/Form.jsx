import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import * as transactionService from '../services/transactions'

const initialState = {
  isIncome: false,
  name: "",
  month: "",
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
    console.log(event.target.value);

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();    
    await props.handleAddTransaction(formData);
    // await props.handleBalance()

    setFormData(initialState);
  };

  const handleIncome = () => {
    let expenseForm = document.getElementById("expense-form");
    expenseForm.classList.add("disable");

    let incomeForm = document.getElementById("income-form");
    incomeForm.classList.remove("disable");
    setFormData({
      ...formData,
      isIncome: true,
    })
  }

  const handleExpense = () => {
    let incomeForm = document.getElementById("income-form");
    incomeForm.classList.add("disable");

    let expenseForm = document.getElementById("expense-form");
    expenseForm.classList.remove("disable");

    setFormData({
      ...formData,
      isIncome: false,
    })
  }

  return (
    <main className="container">
      <h1>Add Transaction</h1>

      <div className="choose-button">
        <button onClick={handleIncome}>Income</button>
        <button onClick={handleExpense}>Expense</button>
      </div>

      {/* INCOME FORM */}
      <form id="income-form" className="income-form disable" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          id="name"
          onChange={handleChange}
        />

        <label htmlFor="month">Month: </label>
        <select required id="month" name="month" value={formData.month} onChange={handleChange}>
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>

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

      {/* EXPENSE FORM */}
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

        <label htmlFor="month">Month: </label>
        <select required id="month" name="month" value={formData.month} onChange={handleChange}>
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>

        <label htmlFor="expenseCategory">Expense Category:</label>
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
