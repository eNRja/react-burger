import {
    FEED_MESSAGE
} from '../constants'
import { feedReducer, initialState } from "./feed";
import { feedItems } from '../constants/tests'

describe('feed reducer', () => {

    it("should return the initial state", () => {
        expect(feedReducer(undefined, {}))
            .toEqual({
                items: {
                    success: false,
                    orders: [],
                    total: null,
                    totalToday: null
                },
            });
    });

    it("should handle FEED_MESSAGE", () => {
        expect(feedReducer(initialState, {
            type: FEED_MESSAGE,
            payload: feedItems
        }))
            .toEqual({
                items: feedItems
            });
    });

})