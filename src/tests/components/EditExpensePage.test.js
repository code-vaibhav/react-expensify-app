import React from "react";
import {shallow} from "enzyme";
import {EditExpensePage} from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let startEditExpense, startRemoveExpense, wrapper, history;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = {push: jest.fn()}
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpense} 
      startRemoveExpense={startRemoveExpense} 
      expense={expenses[0]}
      history={history}
    />);
});

test("Should render editExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("Should handle edit expense", () => {
  const expense = {
    amount: 185
  }
  wrapper.find("ExpenseForm").prop("onSubmit")(expense);
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expense);
  expect(history.push).toHaveBeenLastCalledWith("/");
});

test("Should handle remove expense", () => {
  wrapper.find("button").simulate("click");
  expect(startRemoveExpense).toHaveBeenCalledWith(expenses[0].id);
  expect(history.push).toHaveBeenLastCalledWith("/");
});