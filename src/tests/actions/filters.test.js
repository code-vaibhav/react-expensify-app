import moment from "moment";
import {setStartDate, setEndDate, sortByDate, sortByAmount, setTextFilter} from "../../actions/filters";

test("Should generate set start date action object", () => {
  const action = setStartDate(moment(1000));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: moment(1000)
  });
});

test("Should generate set end date action object", () => {
  const action = setEndDate(moment(1000));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: moment(1000)
  });
});

test("Should generate sort by date action object", () => {
  expect(sortByDate()).toEqual({type: "SORT_BY_DATE"});
});

test("Should generate sort by amount action object", () => {
  expect(sortByAmount()).toEqual({type: "SORT_BY_AMOUNT"});
});

test("Should generate set text filter action object with text value", () => {
  const action = setTextFilter("Anything");
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "Anything"
  });
});

test("Should generate set text filter action object with default value", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: ""
  });
});