import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/blog");
      setBlogPosts(response.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error.message);
    }
  };

  const createBlogPost = async () => {
    try {
      await axios.post("http://localhost:3001/api/blog", newPost);
      fetchBlogPosts();
      setNewPost({ title: "", content: "", author: "" });
    } catch (error) {
      console.error("Error creating blog post:", error.message);
    }
  };

  const deleteBlogPost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3001/api/blog/${postId}`);
      fetchBlogPosts();
    } catch (error) {
      console.error("Error deleting blog post:", error.message);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div className="admin-container">
        <div className="form-container">
          <h2>Create Blog Post</h2>
          <form>
            <label>Title:</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <label>Content:</label>
            <textarea
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
            ></textarea>
            <label>Author:</label>
            <input
              type="text"
              value={newPost.author}
              onChange={(e) =>
                setNewPost({ ...newPost, author: e.target.value })
              }
            />
            <button type="button" onClick={createBlogPost}>
              Create Blog Post
            </button>
          </form>
        </div>
        <div className="display-container">
          <h2>Existing Blog Posts</h2>
          {blogPosts.map((post) => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>
                <strong>Author:</strong> {post.author}
              </p>
              <button type="button" onClick={() => deleteBlogPost(post._id)}>
                Delete
              </button>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
