import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts, fetchLimitedPost, toggleSubredditLimit } from "../actions";
import Search from "./Search";

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.handlePreviousButtonClick = this.handlePreviousButtonClick.bind(this);
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
    this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this);
  }

  handlePreviousButtonClick(e) {
    e.preventDefault();

    const { selectedSubreddit, paginate, dispatch } = this.props;
    dispatch(fetchLimitedPost(selectedSubreddit, paginate));
  }

  handleNextButtonClick(e) {
    e.preventDefault();

    const { selectedSubreddit, paginate, dispatch } = this.props;
    dispatch(fetchLimitedPost(selectedSubreddit, paginate));
  }

  handleToggleButtonClick(e, value) {
    e.preventDefault();

    const { selectedSubreddit, paginate, dispatch } = this.props;
    dispatch(toggleSubredditLimit(value));
    dispatch(fetchPosts(selectedSubreddit, paginate));
  }

  render() {
    const { paginate } = this.props;
    const buttons = paginate.ranges.map(range => {
      return (
        <li key={range.toString()} className="page-link">
          <a onClick={e => this.handleToggleButtonClick(e, range)}>{range}</a>
        </li>
      );
    });

    return (
      <div>
        <Search />
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" onClick={e => this.handlePreviousButtonClick(e)}>Previous</a>
            </li>
            {buttons}
            <li className="page-item">
              <a className="page-link" onClick={e => this.handleNextButtonClick(e)}>Next</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedSubreddit, paginate } = state;

  return {
    selectedSubreddit,
    paginate
  };
};

Pagination.propTypes = {
  paginate: PropTypes.object
};

export default connect(mapStateToProps)(Pagination);
