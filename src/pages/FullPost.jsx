import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";


import { Post } from "../components/Post";
// import { Index as AddComment } from "../components/AddComment"; // Rename Index to AddComment
import { CommentsBlock } from "../components/CommentsBlock";


export const  FullPost = () => {
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  
  useEffect(() => {
    // fetch the post data from the API
    const fetchPost = async () => {
      try {
        const { data } = await axios
        .get(`/posts/${id}`);
        // update the state with the fetched post data
        setPost(data);
       
      } catch (err) {
        console.warn(err);
        alert("Ошибка при получении статьи");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);
  

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : post ? ( // Check if post exists before rendering
        <Post
          id={post._id}
          title={post.title}
          imageUrl={post.imageUrl}
          user={post.user}
          createdAt={post.createdAt}
          viewsCount={post.viewsCount}
          commentsCount={3}
          tags={post.tags}
          isEditable
        >
          <p>{post.text}</p>
        </Post>
      ) : (
        <div>Статья не найдена</div> // Render a message if post doesn't exist
      )}
     <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Harut Azatyan',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Harut Azatyan',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
    </>
  );
};
