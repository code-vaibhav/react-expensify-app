import {
  addExpense, 
  removeExpense, 
  editExpense, 
  startAddExpense, 
  setExpenses, 
  startSetExpenses, 
  startRemoveExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expenseData = {};
  expenses.forEach(({id, description, amount, createdAt, note}) => {
    expenseData[id] = {description, amount, createdAt, note}
  });

  database.ref('expenses').set(expenseData).then(() => done());
});

test("Should setup remove expense action object", () => {
  const action = removeExpense("123xyz");
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

test("Should setup set expenses action object correctly", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("Should fetch expenses data from firebase", (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const action = store.getActions();
    expect(action[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});

test("Should remove expenses from firebase", (done) => {
  const store = createMockStore({});
  store.dispatch(startRemoveExpense(expenses[1].id)).then(() => {
    const action = store.getActions();
    expect(action[0]).toEqual({
      type: "REMOVE_EXPENSE",
      id: expenses[1].id
    });
    return database.ref(`expenses/${expenses[1].id}`).once('value');
  }).then(snapshot => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});