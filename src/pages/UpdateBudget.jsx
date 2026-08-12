import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as budgetService from "../services/budget";

const UpdateBudget = (props) => {
  const { budgetId } = useParams();
  const navigate = useNavigate();

  const [budgetToEdit, setbudgetToEdit] = useState({});

  const initialState = {
    name: budgetToEdit.name,
    amount: budgetToEdit.amount,
    month: budgetToEdit.month,
    description: budgetToEdit.description,
    category: budgetToEdit.category,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    const fetchBudget = async () => {
      const budgetData = await budgetService.show(budgetId);
      setFormData(budgetData);
    };
    fetchBudget();
  }, [budgetId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.handleUpdateBudget(budgetId, formData);
    setFormData(initialState);
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Edit {formData.name} Budget</h1>
      <form id="budget-form" className="budget-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          id="name"
          onChange={handleChange}
        />
        <label htmlFor="amount">Amount :</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <label htmlFor="month">Month: </label>
        <select
          required
          id="month"
          name="month"
          value={formData.month}
          onChange={handleChange}
        >
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

        <label htmlFor="description">Description: </label>
        <input
          id="description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="category">Category: </label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a Category</option>
          <option value="travel">Travel</option>
          <option value="house renovation">House renovation</option>
          <option value="study">Study</option>
          <option value="others">Others</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateBudget;
