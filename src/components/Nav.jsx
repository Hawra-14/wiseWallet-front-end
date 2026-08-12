import { Link } from "react-router"
import wallet from "../assets/wallet.png"

const Nav = (props) => {

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }

    return (
        <nav>
            <Link className="logo" to="/">
                <img src={wallet} alt="wiseWallet logo" />
                <h3>wiseWallet</h3>
            </Link>
            {props.user ? (
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/transactions">Transactions</Link>
                    </li>
                    <li>
                        <Link to="/add-transaction">Add Transaction</Link>
                    </li>
                    <li>
                        <Link to="/budgets/new">Create a budget</Link>
                    </li>
                    <li>
                        <Link to="/budgets">Budgets</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={handleSignOut} className="sign-out-btn">Sign Out</Link>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/sign-up'>Sign Up</Link>
                    </li>
                    <li>
                        <Link to='/sign-in'>Sign In</Link>
                    </li>
                </ul>
            )}

        </nav>
    )
}

export default Nav