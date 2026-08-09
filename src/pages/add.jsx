import { useState } from "react";
import { useNavigate } from "react-router";

const initialState = {
  isIncome: "",
  name: "",
  month: "",
  category: "",
  amount: "",
};

const Add = (props) => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {};

  return (
    <main>
      <h1>Add Transaction</h1>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Month: </label>
        <select>
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
        <select>
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
        <select>
          <option value="">Select a category</option>
          <option value="salary">Salary</option>
          <option value="gift">Gift</option>
          <option value="voucher">Voucher</option>
          <option value="sideIncome">Side Income</option>
          <option value="bonus">Bonus</option>
          <option value="other">Other</option>
        </select>
        
      </form>
    </main>
  );
};
export default Add;
