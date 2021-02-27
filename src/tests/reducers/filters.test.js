import moment from "moment";
import filtersReducer from "../../reducers/filters";

test("Should setup default filter values", () => {
  const state = filtersReducer(undefined, {type: "@@INIT"});
  expect(state).toEqual({
    text: "",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
    sortBy: "date"
  });
});

test("Should set sort by to amount", () => {
  const state = filtersReducer(undefined, {type: "SORT_BY_AMOUNT"});
  expect(state.sortBy).toBe("amount");
});

test("Should set sort by to date", () => {
  const state = filtersReducer(undefined, {type: "SORT_BY_DATE"});
  expect(state.sortBy).toBe("date");
});


test("Should set text filter", () => {
  const action = {
    type: "SET_TEXT_FILTER",
    text: "Rent"
  }
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe("Rent");
});

test("Should set start date", () => {
  const action = {
    type: "SET_START_DATE",
    startDate: moment(1000)
  }
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(moment(1000))
});

test("Should set end date", () => {
  const action = {
    type: "SET_END_DATE",
    endDate: moment(1000)
  }
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(moment(1000))
});