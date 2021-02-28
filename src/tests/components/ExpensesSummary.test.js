import React from "react";
import {ExpensesSummary} from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";
import getExpensesTotal from "../../selectors/expenses-total";
import {shallow} from "enzyme";

const props = {
  expensesCount: expenses.length,
  expensesTotal: getExpensesTotal(expenses)
}

test("Should render ExpenseSummary correctly", () => {
  const wrapper = shallow(<ExpensesSummary {...props}/>);
  expect(wrapper).toMatchSnapshot();
});