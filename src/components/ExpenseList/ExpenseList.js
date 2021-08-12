import React from "react";
import { MdDelete } from "react-icons/md";
import Item from "../ExpenseItem/ExpenseItem";
const ExpenseList = ({ expenses, handleDelete, clearExpenses, handleEdit }) => {
  return (
    <>
      <ul className="list">
        {expenses.map(el => {
          return (
            <Item
              key={el.id}
              expense={el}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            ></Item>
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearExpenses}>
          Clear Expenses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
