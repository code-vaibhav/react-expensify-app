import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("Should set default state", () => {
  const state = expensesReducer(undefined, {type: "@@INIT"});
  expect(state).toEqual([]);
});

test("Should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "1"
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1], expenses[2]]);
});

test("Should not remove expense without id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("Should add expense", () => {
  const action = {
    type: "ADD_EXPENSE",
    expense: {
      id: "4",
      description: "Water bill",
      note: "",
      createdAt: 100000,
      amount: 1950
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense]);
});

test("Should edit expense if id matches", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[2].id,
    updates: {
      description: "August Rent",
      amount: "11500"
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state[2]).toEqual({...expenses[2], ...action.updates});
});

test("Should not edit expense if id not matches", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: "6",
    updates: {
      description: "August Rent",
      amount: "11500"
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("Should set expenses", () => {
  const action = {
    type: "SET_EXPENSES",
    expenses
  }

  const state = expensesReducer(undefined, action);
  expect(state).toEqual(expenses);
});