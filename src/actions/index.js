import {
    REQUEST_FAILED,
    REQUEST_POSTS,
    REQUEST_COMMENTS,
    RECEIVE_COMMENTS,
    SELECT_SUBREDDIT,
    TOGGLE_SUBREDDIT,
    RECEIVE_POSTS
} from "./actionTypes";

export const requestFailed = error => ({
    type: REQUEST_FAILED, 
    error
})

export const receiveCommentsSuccess = json => ({
    type: RECEIVE_COMMENTS,
    comments: json[1].data.children.map(c => c.data)
});

export const requestComments = () => ({
    type: REQUEST_COMMENTS
});

/**
 * Change amount of post to be visible
 *
 * @param limit - Amount of post
 */
export const toggleSubredditLimit = limit => ({
    type: TOGGLE_SUBREDDIT,
    limit
});

/**
 * Change the name of the feed
 *
 * @param subreddit - name of the feed
 */
export const changeSelectedSubRedit = subreddit => ({
    type: SELECT_SUBREDDIT,
    subreddit
});

/**
 * Passes name, posts, filter and count to reducer
 *
 * @param subreddit - name of the feed
 * @param json - data from reddit api
 */
export const receivePostsSuccess = (subreddit, json) => ({
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data)
});

export const requestPosts = () => ({
    type: REQUEST_POSTS
});

/**
 * Retrieve comments for user
 *
 * @param {link to comment} permalink
 */
export const fetchComments = permalink => dispatch => {
    dispatch(requestComments(permalink))
    const url = `https://www.reddit.com/${permalink}.json`;
    return fetch(url)
        .then(response => response.json())
        .then(json => dispatch(receiveCommentsSuccess(json)))
        .catch(error => dispatch(requestFailed(error)));
};

/**
 * Receive certain amount of posts
 *
 * @param {name of subreddit} subreddit
 * @param {amount of post to see} limit
 * @param {next page} after
 * @param {page before} before
 */
export const fetchLimitedPost = (subreddit, paginate) => dispatch => {
    dispatch(requestPosts(subreddit))
    let url = `https://www.reddit.com/r/${subreddit}.json?limit=${paginate.limit}`;
    if (paginate.after !== "") {
        url += `&after=${paginate.after}`;
    }
    if (paginate.before !== "") {
        url += `&before=${paginate.before}`;
    }
    return fetch(url)
        .then(response => response.json())
        .then(json => dispatch(receivePostsSuccess(subreddit, json)))
        .catch(error => dispatch(requestFailed(error)));
};

/**
 * Get post based on pagintate object and sub reddit
 *
 * @param subreddit - name of the feed
 * @param paginate  - pagination object
 */
export const fetchPosts = (subreddit, paginate) => dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json?limit=${paginate.limit}`)
        .then(response => response.json())
        .then(json => dispatch(receivePostsSuccess(subreddit, json)))
        .catch(error => dispatch(requestFailed(error)));
};