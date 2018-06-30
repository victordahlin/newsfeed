import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPosts } from "../actions";
import Item from "./Item";

class List extends Component {
  componentDidMount() {
    const { selectedSubreddit, paginate, dispatch } = this.props;
    dispatch(fetchPosts(selectedSubreddit, paginate));
  }
  render() {
    const { posts } = this.props;
    const listItems = posts.map((post, i) => (
      <Item post={post} key={i.toString()} />
    ));
    return (
      <ul className="list-unstyled">
        <hr />
        {listItems}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  const { selectedSubreddit, paginate, postsBySubreddit } = state;
  const { items: posts } = postsBySubreddit[selectedSubreddit] || { items: [] };

  return {
    selectedSubreddit,
    posts,
    paginate
  };
};

List.propTypes = {
  selectedSubreddit: PropTypes.string,
  paginate: PropTypes.object
};

export default connect(mapStateToProps)(List);
