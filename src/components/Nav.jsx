import { Link } from "react-router"
import add from "../pages/Add"

const Nav = (props) => {

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }

    return (
        <nav>
            <Link className="nav-brand" to="/">wiseWallet</Link>
            { props.user ? (
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/Transactions">Transactions</Link>
                    </li>
                    <li>
                        <Link to="/Add-new">Add Transaction</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={handleSignOut}>Sign Out</Link>
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
            ) }

        </nav>
    )
}

export default Nav