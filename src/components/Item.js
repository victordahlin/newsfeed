import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";

class Item extends Component {
  render() {
    const { post } = this.props;
    const url = post.selftext === null ? post.permalink : `post/${post.id}`;
    const createdBy = `Created: ${moment
      .unix(post.created_utc)
      .fromNow()}  by ${post.author}`;

    return (
      <li className="row">
        <div className="col col-lg-2">
          <div className="flex-column">
            <div className="p-2">
              <span className="oi oi-chevron-top" />
            </div>
            <div className="p-2">{post.score}</div>
            <div className="p-2">
              <span className="oi oi-chevron-bottom" />
            </div>
          </div>
        </div>
        <div className="col col-lg-8">
          <Link to={{ pathname: url, state: { data: post } }}>
            <h5>{post.title}</h5>
          </Link>
          {createdBy}
          <br />
          {post.num_comments} comments
          <br />
          <img
            src={post.thumbnail}
            alt={post.title}
            width={post.thumbnail_width}
            height={post.thumbnail_height}
          />
        </div>
      </li>
    );
  }
}

Item.propTypes = {
  post: PropTypes.object
};

export default Item;
