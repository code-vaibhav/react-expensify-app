import React from "react";
import {shallow} from "enzyme";
import moment from "moment";
import {ExpenseListFilters} from "../../components/ExpenseListFilters";
import {filters, altFilters} from "../fixtures/filters";
import {DateRangePicker} from "react-dates";

let setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByAmount = jest.fn();
  sortByDate = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters 
      filters={filters}
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("Should render expenseListFilters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("Should render expenseListFilters with alt data correctly", () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test("Should handle text changes", () => {
  const value = "some text";
  wrapper.find("input").simulate("change", {
    target: {value}
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("Should sort by amount", () => {
  const value = "amount";
  wrapper.find("select").simulate("change", {
    target: {value}
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test("Should sort by date", () => {
  const value = "date";
  wrapper.find("select").simulate("change", {
    target: {value}
  });
  expect(sortByDate).toHaveBeenCalled();
});

test("Should handle date changes", () => {
  const startDate = moment(0);
  const endDate = moment(0).add(3, "days");
  wrapper.find(DateRangePicker).prop("onDatesChange")({startDate, endDate});
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("Should handle date focus changes", () => {
  const calenderFocused = "startDate";
  wrapper.find(DateRangePicker).prop("onFocusChange")(calenderFocused);
  expect(wrapper.state("calenderFocused")).toBe(calenderFocused);
});