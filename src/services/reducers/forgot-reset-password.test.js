import {
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    PROTECT_RESET_PAGE
} from '../constants'
import { forgotPasswordReducer, initialState } from "./forgot-reset-password";

describe('forgot password reducer', () => {

    it("should return the initial state", () => {
        expect(forgotPasswordReducer(undefined, {}))
            .toEqual({
                itemRequest: null,
                passwordRequest: null,
                protectedResetPage: false
            });
    });

    it("should handle FORGOT_PASSWORD", () => {
        expect(forgotPasswordReducer(initialState, {
            type: FORGOT_PASSWORD,
            payload: { success: true, message: "Reset email sent" }
        }))
            .toEqual({
                ...initialState,
                itemRequest: { success: true, message: "Reset email sent" },
            });
    });

    it("should handle RESET_PASSWORD", () => {
        expect(forgotPasswordReducer(initialState, {
            type: RESET_PASSWORD,
            payload: { success: true, message: "Password successfully reset" }
        }))
            .toEqual({
                ...initialState,
                passwordRequest: { success: true, message: "Password successfully reset" },
            });
    });

    it("should handle PROTECT_RESET_PAGE", () => {
        expect(forgotPasswordReducer(initialState, {
            type: PROTECT_RESET_PAGE,
            payload: true
        }))
            .toEqual({
                ...initialState,
                protectedResetPage: true
            });
    });

})