import database from "../firebase/firebase";

// ADD-EXPENSE
export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      amount = 0,
      description = "",
      note = "",
      createdAt = 0
    } = expenseData

    const expense = {amount, description, note, createdAt};
    return database.ref("expenses").push(expense)
      .then((ref) => {
        dispatch(addExpense({
          id: ref.key,
          ...expense
        }));
      });
  }
}

// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});