const Dashboard = (props) => {

    return (
        <section>
            <header>
                <h1>Welcome {props.user.username}!</h1>
            </header>
            <h1>User Balance = {props.balance}</h1>
        </section>
    )
}

export default Dashboard