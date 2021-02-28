import React from "react";
import { connect } from "react-redux";
import getExpensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";
import numeral from "numeral";

export const ExpensesSummary = ({expensesCount, expensesTotal}) => {
  const expenseWord = expensesCount === 1 ? "expense" : "expenses";
  const amount = numeral(expensesTotal/100).format("$0,0.00");
  return (
    <div>
      <h1>
        Viewing {expensesCount} {expenseWord} totalling {amount}
      </h1>
    </div> 
  );
}

const mapStateToProps = (state) => {
  const expenses = selectExpenses(state.expenses, {...state.filters});
  return {
    expensesCount: expenses.length,
    expensesTotal: getExpensesTotal(expenses)
  }
}

export default connect(mapStateToProps)(ExpensesSummary);