import {
    FEED_MESSAGE,
    FEED_ERROR,
    FEED_CLOSE
} from '../constants'
import { feedReducer, initialState } from "./feed";
import { feedItems } from '../constants/tests'

describe('feed reducer', () => {

    it("should return the initial state", () => {
        expect(feedReducer(undefined, {}))
            .toEqual({
                wsConnected: false,
                items: {
                    success: false,
                    orders: [],
                    total: null,
                    totalToday: null
                },
                error: null
            });
    });

    it("should handle FEED_ERROR", () => {
        expect(feedReducer(initialState, {
            type: FEED_ERROR,
            payload: "error"
        }))
            .toEqual({
                ...initialState,
                wsConnected: false,
                error: "error"
            });
    });

    it("should handle FEED_CLOSE", () => {
        expect(feedReducer(initialState, {
            type: FEED_CLOSE
        }))
            .toEqual({
                ...initialState,
                wsConnected: false,
            });
    });

    it("should handle FEED_MESSAGE", () => {
        expect(feedReducer(initialState, {
            type: FEED_MESSAGE,
            payload: feedItems
        }))
            .toEqual({
                ...initialState,
                wsConnected: true,
                items: feedItems
            });
    });

})