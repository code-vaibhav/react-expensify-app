import authReducer from "../../reducers/auth";

test("Should change state on login", () => {
  const action = {
    type: "LOGIN",
    uid: "123456"
  }
  const state = authReducer(undefined, action);
  expect(state).toEqual({uid: "123456"});
});

test("Should change state on logout", () => {
  const action = {
    type: "LOGOUT"
  }
  const state = authReducer({uid: "qwerty"}, action);
  expect(state).toEqual({});
});