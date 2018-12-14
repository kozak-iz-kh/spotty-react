import * as actionCreators from "../auth";
import * as actionTypes from "../../actionTypes";
import { AuthService } from "../../../services/AuthService";

describe("auth action creators", () => {
  describe("signOut action creator", () => {
    let dispatch;
    let signOut;

    beforeEach(() => {
      dispatch = jest.fn();
      signOut = jest.spyOn(AuthService, "signOut");
    });

    it("should return correct start action", () => {
      actionCreators.signOut()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.SIGN_OUT_START
      });
    });

    it("should call signOut service", async () => {
      signOut.mockImplementation(() => Promise.resolve());

      actionCreators.signOut()(dispatch);

      expect(signOut).toHaveBeenCalled();
    });

    it("should return correct success action", async () => {
      signOut.mockImplementation(() => Promise.resolve());

      await actionCreators.signOut()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.SIGN_OUT_SUCCESS
      });
    });

    it("should return correct fail action", async () => {
      signOut.mockImplementation(() => Promise.reject());

      await actionCreators.signOut()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.SIGN_OUT_FAIL
      });
    });
  });

  describe("signUp action creator", () => {
    let dispatch;
    let signUp;
    let check;
    let signUpParams;

    beforeEach(() => {
      dispatch = jest.fn();
      signUp = jest.spyOn(AuthService, "signUp");
      check = jest.spyOn(AuthService, "check");
      signUpParams = {
        email: "example@mail.com",
        password: "123456",
        name: "John",
        avatarURL: "http://example.com/john.jpg"
      };
    });

    it("should return correct start action", () => {
      actionCreators.signUp(signUpParams)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.SIGN_UP_START
      });
    });

    it("should call signUp service", async () => {
      const { email, password, name, avatarURL } = signUpParams;
      signUp.mockImplementation(() => Promise.resolve());
      check.mockImplementation(() => Promise.resolve({ id: 1 }));

      await actionCreators.signUp(signUpParams)(dispatch);

      expect(signUp).toHaveBeenCalledWith(email, password, name, avatarURL);
      expect(check).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.SIGN_UP_SUCCESS,
        user: { id: 1 }
      });
    });

    it("should return correct AUTH_ERROR action if signUp service fails", async () => {
      signUp.mockImplementation(() =>
        Promise.reject({ message: "Sign up error" })
      );
      await actionCreators.signUp(signUpParams)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.AUTH_ERROR,
        error: "Sign up error"
      });
    });

    it("should return correct AUTH_ERROR action if check service fails", async () => {
      signUp.mockImplementation(() => Promise.resolve());
      check.mockImplementation(() =>
        Promise.reject({ message: "Check user error" })
      );
      await actionCreators.signUp(signUpParams)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.AUTH_ERROR,
        error: "Check user error"
      });
    });
  });
});