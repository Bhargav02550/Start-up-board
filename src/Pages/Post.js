import React, { useEffect, useState } from "react";
import "./Post.scss";

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="Postpage">
      {post.map((posts) => (
        <div className="Postcard">
          <h1>{posts.title}</h1>
          <h1>{posts.author}</h1>
          {/* <h2>{posts.comments.map((comment) => <p>{comment}</p>)}</h2> */}
          {posts.comments && (
            <div>
              <h3>Comments</h3>
              <ul>
                {/*  */}
                {Object.keys(posts.comments).map((commentId) => (
                  <li key={commentId}>{posts.comments[commentId]}</li>
                ))}
              </ul>
            </div>
          )}
          {posts.hash_tags && (
            <div>
              <h3>Hash Tags</h3>
              <ul>
                {/*  */}
                {Object.keys(posts.hash_tags).map((hashTagId) => (
                  <li key={hashTagId}>{posts.hash_tags[hashTagId]}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </div>
  );
};

export default Post;
