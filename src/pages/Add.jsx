import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import * as transactionService from '../services/transactions'

const initialState = {
  isIncome: "",
  name: "",
  month: "",
  expenseCat: "",
  incomeCat: "",
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
    if (transactionId) {
      await props.handleUpdateTransaction(transactionId, formData)
    } else {
      await props.handleAddTransaction(formData);
    }
    setFormData(initialState);
  };

  return (
    <main>
      <h1>{transactionId ? 'Edit Transaction' : 'Add Transaction'}</h1>

      <div className="buttons">
        <button>Income</button>
        <button>Expense</button>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          id="name"
          onChange={handleChange}
        />

        <label htmlFor="month">Month: </label>
        <select id="month" value={formData.month} onChange={handleChange}>
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

        <label htmlFor="expenseCat">Category:</label>
        <select id="expenseCat" value={formData.expenseCat} onChange={handleChange}>
          <option value="">Select a category</option>
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

        <label htmlFor="incomeCat">Category:</label>
        <select id="incomeCat" value={formData.incomeCat} onChange={handleChange}>
          <option value="">Select a category</option>
          <option value="salary">Salary</option>
          <option value="gift">Gift</option>
          <option value="voucher">Voucher</option>
          <option value="sideIncome">Side Income</option>
          <option value="bonus">Bonus</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="amount">Amount</label>
        <input id="amount" type="number" value={formData.amount} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
};
export default Add;
