import {
    USER_SUCCEESS,
    AUTH_CHECKED,
    USER_UPDATE
} from '../constants'
import { userReducer, initialState } from "./login";
import { userTest } from '../constants/tests'

describe('login reducer', () => {

    it("should return the initial state", () => {
        expect(userReducer(undefined, {}))
            .toEqual({
                user: null,
                passwordUser: '',
                isAuthChecked: false,
            });
    });

    it("should handle USER_SUCCEESS", () => {
        expect(userReducer(initialState, {
            type: USER_SUCCEESS,
            payload: userTest,
            password: "qwerty"
        }))
            .toEqual({
                user: userTest,
                passwordUser: "qwerty",
                isAuthChecked: false,
            });
    });

    it("should handle AUTH_CHECKED", () => {
        expect(userReducer(initialState, {
            type: AUTH_CHECKED
        }))
            .toEqual({
                ...initialState,
                isAuthChecked: true,
            });
    });

    it("should handle USER_UPDATE", () => {
        expect(userReducer(initialState, {
            type: USER_UPDATE,
            payload: userTest
        }))
            .toEqual({
                ...initialState,
                user: userTest,
            });
    });

})