import { useState } from "react";
import { useNavigate, useParams } from "react-router";


const Budget = (props)=>{
const initialState = {
  name: "",
  amount: "",
  month: "",
};
const [formData, setFormData] = useState(initialState)
const navigate = useNavigate()
const {budgetId} = useParams()

useEffect(() => {
    const fetchBudget = async () => {
      const budgetData = await budgetService.show(budgetId)
      setFormData(budgetData)
    }
    if (budgetId) fetchBudget()

    return () => setFormData(initialState)
  }, [budgetId])

const handleChange = (event)=>{
    setFormData({
        ...formData,
        [event.target.name]: event.target.value,
    })
}

const handleSubmit = async (event)=>{
    event.preventDefault()
    if (budgetId) {
      await props.handleUpdateBudget(budgetId, formData)
    } else {
      await props.handleAddBudget(formData);
    }
    setFormData(initialState);
}

return (
    <main className="container">
        <h1>Create a budget</h1>
        <form>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            <label htmlFor="amount">Amount: </label>
            <input type="text" name="name" value={formData.amount} onChange={handleChange} />
            
        </form>

    </main>
)

}
export default Budget