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
      </form>
    </main>
  );
};
export default Add
