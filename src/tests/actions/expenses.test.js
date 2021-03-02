import {addExpense, removeExpense, editExpense, startAddExpense} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

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
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("Should add expense to database and store", (done) => {
  const store = createMockStore({});

  const expenseData = {
    description: "headphones",
    amount: 30000,
    note: "great headphones",
    createdAt: 1000
  }
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test("Should add expense to database and store for default values", (done) => {
  const store = createMockStore({});

  const defaultExpense = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0
  }
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...defaultExpense
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultExpense);
    done();
  });
});

// test("Should setup add expense action object with default values", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       description: "",
//       amount: 0,
//       createdAt: 0,
//       note: "",
//       id: expect.any(String)
//     }
//   });
// });

