import React from "react";
import {shallow} from "enzyme";
import NotFoundPage from "../../components/NotFoundPage";

test("Should render Expense dashboard page correctly", () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});