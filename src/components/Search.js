import React, { Component } from "react";
import { connect } from "react-redux";
import { changeSelectedSubRedit, fetchPosts } from "../actions";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const subreddit = this.state.value;
    const { dispatch, paginate } = this.props;
    if (subreddit.length > 2) {
      dispatch(changeSelectedSubRedit(subreddit));
      dispatch(fetchPosts(subreddit, paginate));
    }
  }

  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search: Sweden"
          aria-label="search"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div className="input-group-prepend">
          <button
            className="btn btn-outline-primary"
            onClick={e => this.handleSubmit(e)}
            type="button"
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { paginate } = state;

  return {
    paginate
  };
};

export default connect(mapStateToProps)(Search);
