import { Link } from "react-router";

const Budgets = (props) => {
  return (
    <main>
      <h1>All Budgets</h1>
      {console.log(props.budgets)}
      <div className="budget-dash">
        {props.budgets.map((budget) =>
          budget.userId._id == props.user._id ? (
            <Link to={`/budgets/${budget._id}`}>
              <div className="budget-container">
                <p className="all-budgets"><strong>{budget.name}</strong></p>
              </div>
            </Link>
          ) : (
            ""
          ),
        )}{" "}
      </div>
    </main>
  );
};

export default Budgets;
