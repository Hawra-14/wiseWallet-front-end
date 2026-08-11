import Nav from "./components/Nav";
import "./App.css";

import { Routes, Route, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import * as transactionService from './services/transactions'


import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import TransactionList from "./pages/TransactionList";
import TransactionDetails from "./pages/TranscationDetails"

import Form from "./pages/Form";
import Budget from "./pages/Budget";
import UpdateForm from "./pages/UpdateForm";

const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  return JSON.parse(atob(token.split(".")[1])).payload;
};

const App = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState(getUserFromToken());
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      const transactionsData = await transactionService.index();

      setTransactions(transactionsData);
    };
    if (user) fetchAllTransactions();
  }, [user]);

  const handleAddTransaction = async (formData) => {
    const newTransaction = await transactionService.create(formData)
    setTransactions([newTransaction, ...transactions])
    navigate('/transactions')
  }

  const handleUpdateTransaction = async (transactionId, formData) => {
    const updateTransaction = await transactionService.update(transactionId, formData)
    const updatedTransactionArr = transactions.map((transaction) => {
      return transaction._id === transactionId ? updateTransaction : transaction
    })
    setTransactions(updatedTransactionArr)
    navigate(`/transactions/${transactionId}`)
  }


  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard user={user} /> : <Landing />}
          />
          {user ? (
            <>
              <Route path='/transactions' element={<TransactionList transactions={transactions} user={user} />} />
              <Route path='/transactions/:transactionId' element={<TransactionDetails transactions={transactions} />} />
              <Route path='/add-transaction' element={<Form transactions={transactions} handleAddTransaction={handleAddTransaction} />} />
              <Route path='/transactions/:transactionId/edit' element={<UpdateForm transactions={transactions} handleUpdateTransaction={handleUpdateTransaction} />} />
              <Route path="/budget" element={<Budget user={user} />} />

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
