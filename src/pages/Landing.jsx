import landing from "../assets/landing.png"

const Landing = () => {
    return (
        <section className="landing-card">
            <img src={landing} alt="landing-image" />
            <h1>Welcome!</h1>
            <h3>Choose wisely and use wiseWallet</h3>
            <p>Keep track of your expenses 💹</p>
        </section>
    )
}

export default Landing