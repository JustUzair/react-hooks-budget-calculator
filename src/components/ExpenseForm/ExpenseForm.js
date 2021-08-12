import React from "react";
import { MdSend } from "react-icons/md";
const ExpenseForm = ({
  charge,
  amount,
  handleAmount,
  handleCharge,
  handleSubmit,
}) => {
  return (
    <form>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">Charge</label>
          <input
            type="text"
            name="charge"
            id="charge"
            className="form-control"
            placeholder="e.g. rent"
            value={charge}
            onChange={handleCharge}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="form-control"
            placeholder="e.g. 100"
            value={amount}
            onChange={handleAmount}
            min={1}
            required
          />
        </div>
      </div>
      <button className="btn" type="submit" onClick={handleSubmit}>
        <MdSend />
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
