import { combineReducers } from "redux";
import {
  SELECT_SUBREDDIT,
  RECEIVE_POSTS,
  TOGGLE_SUBREDDIT,
  RECEIVE_COMMENTS
} from "../actions/actionTypes";

const selectedSubreddit = (state = "sweden", action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
};

const comments = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments;
    default:
      return state;
  }
};

const paginate = (
  state = {
    ranges: [5, 10, 15, 20, 25],
    currentPage: 1,
    totalPages: 1,
    limit: 10,
    before: "",
    after: ""
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        after: action.after,
        before: action.before,
        totalPages: action.count
      };
    case TOGGLE_SUBREDDIT:
      return {
        ...state,
        limit: action.limit
      };
    default:
      return state;
  }
};

const posts = (state = { items: [] }, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        items: action.posts
      };
    default:
      return state;
  }
};

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
  paginate,
  comments
});

export default rootReducer;
