import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as budgetService from "../services/budget";

const initialState = {
  name: "",
  amount: "",
  month: "",
  description: "",
  category: "",
};
const Budget = (props) => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const { budgetId } = useParams();

  useEffect(() => {
    const fetchBudget = async () => {
      const budgetData = await budgetService.show(budgetId);
      setFormData(budgetData);
    };
    if (budgetId) fetchBudget();

    return () => setFormData(initialState);
  }, [budgetId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.handleAddBudget(formData);
    setFormData(initialState);
  };

  return (
    <main className="container">
      <h1>Create a budget</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="amount">Amount: </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <label htmlFor="month">Month: </label>
        <select name="month" id="month" required  value={formData.month} onChange={handleChange}>
          <option value="">Select a month </option>
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
        <label htmlFor="description">Description: </label>
        <input
          id="description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="category">Category: </label>
        <select name="category" id="category" value={formData.category} onChange={handleChange}>
          <option value="">Select a Category</option>
          <option value="travel">Travel</option>
          <option value="house renovation">House renovation</option>
          <option value="study">Study</option>
          <option value="others">Others</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </main>
  );
};
export default Budget;
