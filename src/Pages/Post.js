import React, { useEffect, useState } from "react";
import "./Post.scss";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { BiArrowToRight } from "react-icons/bi";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const uploadTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const monthName = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const present = new Date();
    if (
      present.getDate() === day &&
      present.getMonth() === date.getMonth() &&
      present.getFullYear() === year
    ) {
      return `Uploaded today`;
    } else if (
      Math.abs(day - present.getDate()) <= 7 &&
      present.getMonth() === date.getMonth() &&
      present.getFullYear() === year
    ) {
      return `Uploaded ${Math.abs(day - present.getDate())} days ago`;
    } else {
      return `${monthName} ${day}, ${year}`;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
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
      <div className="Verticalscroll">
        {posts.map((post) => (
          <div className="Postcard" key={post.id}>
            <div className="Postheader">
              <img src="./profile.jpg" alt="profile" />
              <div className="Postinfo">
                <div className="Posttitle">{post.title}</div>
                <div className="Postauthor">
                  {post.author} · {uploadTimestamp(post.created_date)}
                </div>
              </div>
            </div>
            <p>{post.content.slice(0, 150)}...</p>
            <div className="Postactions">
              <div className="PostLikes">
                <FcLike></FcLike>
                {post.likes}
              </div>
              <button>Read More...</button>
            </div>
            {/* <h2>{post.comments.map((comment) => <p>{comment}</p>)}</h2> */}
            {/* {post.comments && (
              <div>
                <h3>Comments</h3>
                <ul>
                  {Object.keys(post.comments).map((commentId) => (
                    <li key={commentId}>{post.comments[commentId]}</li>
                  ))}
                </ul>
              </div>
            )} */}
            {/* {post.hash_tags && (
              <div>
                <h3>Hash Tags</h3>
                <ul>
                  {Object.keys(post.hash_tags).map((hashTagId) => (
                    <li key={hashTagId}>{post.hash_tags[hashTagId]}</li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        ))}
        {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default Post;
// import React, { useEffect, useState } from "react";
// import "./Post.scss";
// import { FcLike, FcLikePlaceholder } from "react-icons/fc";

// const Post = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [likes, setLikes] = useState([]);

//   const uploadTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     const year = date.getFullYear();
//     const monthName = date.toLocaleString("default", { month: "short" });
//     const day = date.getDate();
//     const present = new Date();
//     if (
//       present.getDate() === day &&
//       present.getMonth() === date.getMonth() &&
//       present.getFullYear() === year
//     ) {
//       return `Uploaded today`;
//     } else if (
//       Math.abs(day - present.getDate()) <= 7 &&
//       present.getMonth() === date.getMonth() &&
//       present.getFullYear() === year
//     ) {
//       return `Uploaded ${Math.abs(day - present.getDate())} days ago`;
//     } else {
//       return `${monthName} ${day}, ${year}`;
//     }
//   };

//   const toggleLike = (index) => {
//     const newLikes = [...likes];
//     newLikes[index] = !newLikes[index];
//     setLikes(newLikes);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/get_posts");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setPosts(data);

//         // Initialize likes array
//         const initialLikes = new Array(data.length).fill(false);
//         setLikes(initialLikes);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div className="Postpage">
//       <div className="Verticalscroll">
//         {posts.map((post, index) => (
//           <div className="Postcard" key={post.id}>
//             <div className="Postheader">
//               <img src="./profile.jpg" alt="profile" />
//               <div className="Postinfo">
//                 <div className="Posttitle">{post.title}</div>
//                 <div className="Postauthor">
//                   {post.author} · {uploadTimestamp(post.created_date)}
//                 </div>
//               </div>
//             </div>
//             <p>{post.content.slice(0, 150)}...</p>
//             <div className="Postactions">
//               <button onClick={() => toggleLike(index)}>
//                 {likes[index] ? <FcLike /> : <FcLikePlaceholder />}
//                 {post.likes}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Post;
