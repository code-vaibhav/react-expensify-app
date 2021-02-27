import selectExpenses from "../../selectors/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";

test("Should filter expenses by text value", () => {
  const filters = {
    text: "e",
    startDate: undefined,
    endDate: undefined,
    sortBy: "date"
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[1]]);
});

test("Should filter expenses by start date", () => {
  const filters = {
    text: "",
    startDate: moment(0),
    endDate: undefined,
    sortBy: "date"
  }
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]]);
});

test("Should filter expenses by end date", () => {
  const filters = {
    text: "",
    startDate: undefined,
    endDate: moment(0),
    sortBy: "date"
  }
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[1]]);
});

test("Should sort expenses by amount", () => {
  const filters = {
    text: "",
    startDate: undefined,
    endDate: undefined,
    sortBy: "amount"
  }
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});

test("Should sort expenses by date", () => {
  const filters = {
    text: "",
    startDate: undefined,
    endDate: undefined,
    sortBy: "date"
  }
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});