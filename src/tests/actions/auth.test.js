import { TestScheduler } from "@jest/core";
import {login, logout} from "../../actions/auth";

test("Should set logout action generator object", () => {
  const action = logout();
  expect(action).toEqual({type: "LOGOUT"});
});

test("Should set login action generator object", () => {
  const action = login("qwerty");
  expect(action).toEqual({
    type: "LOGIN",
    uid: "qwerty"
  });
});