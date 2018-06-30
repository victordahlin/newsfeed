import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { fetchComments } from "../actions";

class Post extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { data } = this.props.location.state;
    dispatch(fetchComments(data.permalink));
  }
  render() {
    const { data } = this.props.location.state;
    const { comments } = this.props;
    const list = comments.map(c => <li key={c.id}>{c.body}</li>);
    const createdBy = `Created: ${moment
      .unix(data.created_utc)
      .fromNow()}  by ${data.author}`;
    return (
      <div>
        <div className="row justify-content-md-center">
          <div className="col col-lg-1">
            <div className="flex-column">
              <div className="p-2">
                <span className="oi oi-chevron-top" />
              </div>
              <div className="p-2">{data.score}</div>
              <div className="p-2">
                <span className="oi oi-chevron-bottom" />
              </div>
            </div>
          </div>
          <div className="col-md-auto">
            <img
              src={data.thumbnail}
              alt={data.title}
              width={data.thumbnail_width}
            />
          </div>
          <div className="col col-lg-7">
            <h5 className="mt-0">{data.title}</h5>
            {createdBy}
            <br />
            {data.num_comments} comments<br />
            <span>{data.selftext}</span>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <ul>{list}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { comments } = state;

  return {
    comments
  };
};

Post.defaultProps = {
  data: null,
  comments: []
};

Post.propTypes = {
  data: PropTypes.object,
  comments: PropTypes.array
};

export default connect(mapStateToProps)(Post);
