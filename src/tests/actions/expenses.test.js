import {addExpense, removeExpense, editExpense} from "../../actions/expenses";

test("Should setup remove expense action object", () => {
  const action = removeExpense({id: "123xyz"});
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123xyz"
  });
});

test("Should setup edit expense action object", () => {
  const action = editExpense("123abc", {amount: 400, description: "Rent"});
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      amount: 400,
      description: "Rent"
    }
  });
});

test("Should setup add expense action object with provided values", () => {
  const expenseData = {
    description: "Rent",
    amount: 10500,
    createdAt: 1000,
    note: "This was last month's rent"
  }
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test("Should setup add expense action object with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      amount: 0,
      createdAt: 0,
      note: "",
      id: expect.any(String)
    }
  });
});

