import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Item from "./Item";

configure({ adapter: new Adapter() });

describe("Item", () => {
  let props, wrapper;
  beforeEach(() => {
    props = {
      post: {
        score: "0",
        url: "www.test.com",
        title: "Test",
        author: "Test",
        num_comments: "10"
      }
    };
    wrapper = shallow(<Item {...props} />);
  });

  it("should have list item", () => {
    expect(wrapper.find("li").length).toEqual(1);
  });

  it("should match props", () => {
    expect(wrapper.props().score).toEqual(props.score);
    expect(wrapper.props().url).toEqual(props.url);
    expect(wrapper.props().title).toEqual(props.title);
    expect(wrapper.props().author).toEqual(props.author);
    expect(wrapper.props().num_comments).toEqual(props.num_comments);
  });
});
