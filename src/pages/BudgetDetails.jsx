import { useParams } from "react-router";
import { useState } from "react";
import * as budgetService from "../services/budget";
// import { text } from "express";

const BudgetDetails = (props) => {
  const { budgetId } = useParams();

  const budget = props.budgets.find((budget) => {
    return budget._id === budgetId;
  });
  console.log(budget);

  return (
    <main>
        <h1>Budget Details</h1>
      <div className="budget-details">
        <h3>{budget.name}</h3>
        <p><strong>Amount:</strong> {budget.amount}</p>
        <p><strong>Month:</strong> {budget.month} </p>
        <p><strong>Description:</strong> {budget.description} </p>
        <p><strong>Category:</strong> {budget.category} </p>
      </div>
    </main>
  );
};

export default BudgetDetails;
