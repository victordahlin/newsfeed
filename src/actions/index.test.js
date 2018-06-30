import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import {
    receiveCommentsSuccess,
    requestFailed,
    requestComments,
    toggleSubredditLimit,
    changeSelectedSubRedit,
    receivePostsSuccess,
    requestPosts,
    fetchPosts,
    fetchComments,
    fetchLimitedPost
} from "./index";
import {
    RECEIVE_COMMENTS,
    REQUEST_FAILED,
    REQUEST_COMMENTS,
    TOGGLE_SUBREDDIT,
    SELECT_SUBREDDIT,
    RECEIVE_POSTS,
    REQUEST_POSTS
} from "./actionTypes";

describe("actions", () => {
    it("should create an action to receive comments", () => {
        const json = [{}, {
            data: {
                children: [{
                    data: {
                        body: "Test"
                    }
                }]
            }
        }];
        const comments = json[1].data.children.map(c => c.data);
        const expectedAction = {
            type: RECEIVE_COMMENTS,
            comments
        };
        expect(receiveCommentsSuccess(json)).toEqual(expectedAction);
    });

    it("should create an action to request comments permalink", () => {
        const expectedAction = {
            type: REQUEST_COMMENTS
        };
        expect(requestComments()).toEqual(expectedAction);
    });

    it("should create an action that toggle subreddit and limit", () => {
        const limit = 0;
        const expectedAction = {
            type: TOGGLE_SUBREDDIT,
            limit
        };
        expect(toggleSubredditLimit(limit)).toEqual(expectedAction);
    })

    it("should creata an request that will fail", () => {
        const error = {};
        const expectedAction = {
            type: REQUEST_FAILED,
            error
        };
        expect(requestFailed(error)).toEqual(expectedAction);
    });

    it("should create an action to change selected subreddit", () => {
        const subreddit = "test";
        const expectedAction = {
            type: SELECT_SUBREDDIT,
            subreddit
        };
        expect(changeSelectedSubRedit(subreddit)).toEqual(expectedAction);
    });

    it("should create an action to receive posts", () => {
        const subreddit = "test";
        const json = {
            data: {
                children: [{}]
            }
        };
        const expectedAction = {
            type: RECEIVE_POSTS,
            subreddit,
            posts: json.data.children.map(child => child.data)
        };
        expect(receivePostsSuccess(subreddit, json)).toEqual(expectedAction);
    });


    it("should create an action to request posts", () => {
        const expectedAction = {
            type: REQUEST_POSTS
        };
        expect(requestPosts()).toEqual(expectedAction);
    });
});

describe("async actions", () => {
    const middlewares = [thunk];
    let mockStore = configureMockStore(middlewares);

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it("creates RECEIVE_COMMENTS when request comments has been done", () => {
        const permalink = "permalink";
        const paginate = {
            limit: 10
        };
        const urlMock = `https://www.reddit.com/${permalink}.json`;
        const jsonMock = [{}, {
            data: {
                children: [{
                    data: {
                        body: "Test"
                    }
                }]
            }
        }];
        fetchMock.getOnce(urlMock, jsonMock);

        const expectedActions = [{
                type: REQUEST_COMMENTS
            },
            {
                type: RECEIVE_COMMENTS,
                "comments": [jsonMock[1].data.children[0].data]
            }
        ];

        const store = mockStore({
            comments: []
        });

        return store.dispatch(fetchComments(permalink)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("creates RECEIVE_POSTS when request posts has been done", () => {
        const subreddit = "test";
        const paginate = {
            limit: 10
        };
        const urlMock = `https://www.reddit.com/r/${subreddit}.json?limit=${paginate.limit}`;
        const jsonMock = {
            data: {
                children: [{}]
            }
        };
        fetchMock.getOnce(urlMock, jsonMock);

        const expectedActions = [{
                type: REQUEST_POSTS
            },
            {
                type: RECEIVE_POSTS,
                subreddit,
                "posts": [undefined]
            }
        ];

        const store = mockStore({
            posts: []
        });

        return store.dispatch(fetchPosts(subreddit, paginate)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("creates RECEIVE_POSTS when request limit posts has been done", () => {
        const subreddit = "test";
        const paginate = {
            limit: 10,
            after: "after",
            before: "before"
        };
        const urlMock = `https://www.reddit.com/r/${subreddit}.json?limit=${paginate.limit}&after=${paginate.after}&before=${paginate.before}`;
        const jsonMock = {
            data: {
                children: [{}]
            }
        };
        fetchMock.getOnce(urlMock, jsonMock);

        const expectedActions = [{
                type: REQUEST_POSTS
            },
            {
                type: RECEIVE_POSTS,
                subreddit,
                "posts": [undefined]
            }
        ];

        const store = mockStore({
            posts: []
        });

        return store.dispatch(fetchLimitedPost(subreddit, paginate)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});