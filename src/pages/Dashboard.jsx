const Dashboard = (props) => {

    return (
        <section>
            <header>
                <h1>Welcome {props.user.username}!</h1>
            </header>
            <div className="balance-container">
                <h2>Your Balance is {props.balance} BD</h2>
            </div>
        </section>
    )
}

export default Dashboard