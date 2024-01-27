import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

const App = () => {
  const [blogPosts, setBlogPosts] = useState([]);

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

  return (
    <div>
      <h1>Blog Display</h1>
      <div className="blog-container">
        {blogPosts.map((post) => (
          <div key={post._id} className="blog-post">
            <h3 className="blog-title">{post.title}</h3>
            <p className="blog-content">{post.content}</p>
            <p className="blog-author">
              <strong>Author:</strong> {post.author}
            </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
