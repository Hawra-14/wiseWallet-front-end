import { useParams } from "react-router";
import { useState } from "react";
import * as budgetService from "../services/budget";
import { useNavigate } from "react-router";
// import { text } from "express";

const BudgetDetails = (props) => {
  const { budgetId } = useParams();
  const navigate = useNavigate();

  const budget = props.budgets.find((budget) => {
    return budget._id === budgetId;
  });
  console.log(budget);
  
  if (!budget) return <p>Loading...</p>
  return (
    <main>
      <div className="budget-details">
      <h1>Budget Details</h1>
        <p><strong>Name:</strong> {budget.name}</p>
        <p>
          <strong>Amount:</strong> {budget.amount}
        </p>
        <p>
          <strong>Month:</strong> {budget.month}
        </p>
        <p>
          <strong>Description:</strong> {budget.description}
        </p>
        <p>
          <strong>Category:</strong> {budget.category}
        </p>
      {budget.userId._id === props.user._id && (
        <div className="actions">
          <button onClick={() => navigate(`/budgets/${budgetId}/edit`)}>
            Edit
          </button>
          <button onClick={() => props.handleDeleteBudget(budgetId)}>
            Delete
          </button>
        </div>
      )}
      </div>
    </main>
  );
};

export default BudgetDetails;
