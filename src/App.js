import React, { useState, useEffect } from "react";
import "./App.css";
import uuid from "uuid/dist/v4";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import Alert from "./components/Alert/Alert";
// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 100 },
//   { id: uuid(), charge: "groceries", amount: 200 },
//   { id: uuid(), charge: "gas bill", amount: 200 },
// ];
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
// console.log(initialExpenses);
function App() {
  // ***********state values***************
  //  expenses, allexpenses
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");
  // Alert
  const [alert, setAlert] = useState({ show: false });
  // **********useEffect*****************
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses, charge, amount]);
  // ***********functionality***************
  const handleCharge = e => {
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (charge && amount > 0) {
      let temp = {
        id: uuid(),
        charge,
        amount,
      };
      setCharge("");
      handleAlert({ type: "success", text: "Item added successfully" });
      setAmount("");
      setExpenses([temp, ...expenses]);
    } else {
      handleAlert({ type: "danger", text: "Values cannot be empty" });
    }
  };

  const handleEdit = id => {
    let tempExpense = expenses.find(el => el.id === id);
    let tempCharge = tempExpense.charge;
    let tempAmount = tempExpense.amount;
    setCharge(tempCharge);
    setAmount(tempAmount);
    handleDelete(id, true);
  };
  const handleDelete = (id, edit = false) => {
    setExpenses([...expenses.filter(expense => expense.id !== id)]);
    !edit &&
      handleAlert({ type: "success", text: "Item deleted successfully" });
  };
  const clearExpenses = () => {
    console.log("clear expenses invoked");
    handleAlert({ type: "success", text: "Expenses cleared successfully" });
    setExpenses([]);
  };
  // handleAlert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text}></Alert>}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        ></ExpenseForm>
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          clearExpenses={clearExpenses}
          handleEdit={handleEdit}
        ></ExpenseList>
      </main>
      <h1>
        Total Amount :{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return acc + +curr.amount;
          }, 0)}
        </span>
      </h1>
    </>
  );
}
export default App;
