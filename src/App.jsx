import Nav from "./components/Nav";
import "./App.css";

import { Routes, Route, useNavigate } from "react-router";
import { useState, useEffect, use } from "react";
import * as transactionService from "./services/transactions";
import * as budgetService from "./services/budget";

import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import TransactionList from "./pages/TransactionList";
import TransactionDetails from "./pages/TranscationDetails";

import Form from "./pages/Form";
import BudgetForm from "./pages/BudgetForm";
import Budgets from "./pages/Budgets";
import UpdateForm from "./pages/UpdateForm";
import BudgetDetails from "./pages/BudgetDetails";
import UpdateBudget from "./pages/UpdateBudget";

const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  return JSON.parse(atob(token.split(".")[1])).payload;
};

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUserFromToken());
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      const transactionsData = await transactionService.index();

      let total = 0;
      transactionsData.map((transaction) => {
        if (transaction.userId._id === user._id) {
          if (transaction.isIncome === true) {
            total += transaction.amount;
          } else {
            total -= transaction.amount;
          }
        } else {
          <p>No Transaction</p>;
        }
      });
      setBalance(total);
      console.log(balance, "balance");

      setTransactions(transactionsData);
    };
    if (user) fetchAllTransactions();
  }, [user]);

  useEffect(() => {
    const fetchAllBudget = async () => {
      const budgetData = await budgetService.index();

      setBudgets(budgetData);
    };
    if (user) fetchAllBudget();
  }, [user]);

  const handleAddTransaction = async (formData) => {
    const newTransaction = await transactionService.create(formData);
    setTransactions([newTransaction, ...transactions]);
    let total = Number(balance);
    if (formData.isIncome === true) {
      total += Number(formData.amount);
    } else {
      total -= Number(formData.amount);
    }
    setBalance(total);
    navigate("/transactions");
  };
  const handleUpdateTransaction = async (transactionId, formData) => {
    const updateTransaction = await transactionService.update(
      transactionId,
      formData,
    );
    const updatedTransactionArr = transactions.map((transaction) => {
      return transaction._id === transactionId
        ? updateTransaction
        : transaction;
    });
    setTransactions(updatedTransactionArr);
    navigate(`/transactions/${transactionId}`);
  };

  const handleDeleteTransaction = async (transactionId) => {
    const deletedTransaction =
      await transactionService.deleteTransaction(transactionId);
    setTransactions(
      transactions.filter((transaction) => transaction._id !== transactionId),
    );
    navigate("/transactions");
  };

  const handleAddBudget = async (formData) => {
    const newBudget = await budgetService.create(formData);
    setBudgets([newBudget, ...budgets]);
    navigate("/budgets");
  };

  const handleUpdateBudget = async (budgetId, formData) => {
    const updateBudget = await budgetService.update(budgetId, formData);
    const updatedBudgetArr = budgets.map((budget) => {
      return budget._id === budgetId ? updateBudget : budget;
    });

    setBudgets(updatedBudgetArr);
    navigate(`/budgets/${budgetId}`);
  };

  const handleDeleteBudget = async (budgetId) => {
    const deletedBudget = await budgetService.deleteBudget(budgetId);
    setBudgets(budgets.filter((budget) => budget._id !== budgetId));
    navigate("/budgets");
  };

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              user ? <Dashboard user={user} balance={balance} /> : <Landing />
            }
          />
          {user ? (
            <>
              <Route
                path="/transactions"
                element={
                  <TransactionList transactions={transactions} user={user} />
                }
              />
              <Route
                path="/transactions/:transactionId"
                element={
                  <TransactionDetails
                    transactions={transactions}
                    user={user}
                    handleDeleteTransaction={handleDeleteTransaction}
                  />
                }
              />
              <Route
                path="/add-transaction"
                element={
                  <Form
                    transactions={transactions}
                    handleAddTransaction={handleAddTransaction}
                  />
                }
              />
              <Route
                path="/transactions/:transactionId/edit"
                element={
                  <UpdateForm
                    transactions={transactions}
                    handleUpdateTransaction={handleUpdateTransaction}
                  />
                }
              />
              <Route
                path="/budgets/:budgetId/edit"
                element={
                  <UpdateBudget
                    user={user}
                    budgets={budgets}
                    handleUpdateBudget={handleUpdateBudget}
                  />
                }
              />
              <Route
                path="/budgets/new"
                element={
                  <BudgetForm
                    budgets={budgets}
                    user={user}
                    handleAddBudget={handleAddBudget}
                  />
                }
              />
              <Route
                path="/budgets"
                element={<Budgets user={user} budgets={budgets} />}
              />
             
              <Route path="/budgets/:budgetId" element={<BudgetDetails budgets={budgets} user={user} handleDeleteBudget={handleDeleteBudget} />} />
            </>
          ) : (
            <>
              <Route
                path="/sign-up"
                element={<SignUpForm setUser={setUser} />}
              />
              <Route
                path="/sign-in"
                element={<SignInForm setUser={setUser} />}
              />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
};

export default App;
