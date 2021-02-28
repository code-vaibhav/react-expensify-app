import getExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("Should return 0 for no expenses", () => {
  const total = getExpensesTotal([]);
  expect(total).toBe(0);
});

test("Should return amount for one expense", () => {
  const expense = [{
    description: "some",
    amount: 3500
  }]
  const total = getExpensesTotal(expense);
  expect(total).toBe(3500);
})

test("Should return amount for multiple expenses", () => {
  const total = getExpensesTotal(expenses);
  expect(total).toBe(114195);
});