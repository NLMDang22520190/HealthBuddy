import React from "react";

import Post from "../Post/Post";

const PostList = ({ posts }) => {
  return (
    <div className="divide-gray-500 divide-y">
      {posts.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
    </div>
  );
};

export default PostList;
