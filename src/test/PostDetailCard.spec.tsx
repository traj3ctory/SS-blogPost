import { it, describe, expect } from "vitest";
import PostDetailCard from "@/components/post-detail";
import { shallowMount } from "vue-test-utils";

describe("PostDetailCard", () => {
  it("should render the post title", () => {
    const post = {
      id: 1,
      title: "My First Post",
      body: "This is my first post!",
    };
    const wrapper = shallowMount(<PostDetailCard post={post} />);
    expect(wrapper.find("h5").text()).toBe("MY FIRST POST");
  });

  it("should render the post body", () => {
    const post = {
      id: 1,
      title: "My First Post",
      body: "This is my first post!",
    };
    const wrapper = shallowMount(<PostDetailCard post={post} />);
    expect(wrapper.find("p").text()).toBe("This is my first post!");
  });

  it("should render the 'Back Blog Post' button", () => {
    const post = {
      id: 1,
      title: "My First Post",
      body: "This is my first post!",
    };
    const wrapper = shallowMount(<PostDetailCard post={post} />);
    expect(wrapper.find("div").last().text()).toBe(
      "&larr;&nbsp;Back Blog Post"
    );
  });
});
