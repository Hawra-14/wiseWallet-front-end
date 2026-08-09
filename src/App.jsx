import Nav from "./components/Nav"
import './App.css'
import { Routes, Route } from "react-router"
import { useState } from "react"
import SignUpForm from "./pages/SignUpForm"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import TransactionList from "./pages/TransactionList"
import Add from "./pages/Add"

const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [user, setUser] = useState(getUserFromToken())
  
  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
        <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
        <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
        <Route path='/add-transaction' element={<Add />} />
      </Routes>
      </main>
    </div>
  )
}

export default App