import { REGISTRATION_SUCCEESS } from '../constants'
import { registrationReducer, initialState } from "./registration";
import { userTest } from '../constants/tests'

describe('registration reducer', () => {

    it("should return the initial state", () => {
        expect(registrationReducer(undefined, {}))
            .toEqual({ userRegistration: null });
    });

    it("should handle REGISTRATION_SUCCEESS", () => {
        expect(registrationReducer(initialState, {
            type: REGISTRATION_SUCCEESS,
            payload: userTest
        }))
            .toEqual({ userRegistration: userTest });
    });

})