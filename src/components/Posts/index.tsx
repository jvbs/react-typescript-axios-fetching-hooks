import { useEffect, useState } from "react";

import axios from "../../services/jsonPhApi";
import { useAxiosFunction } from "../../hooks/useAxiosFunction";

interface PostsProps {}

interface Posts {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const Posts: React.FC<PostsProps> = () => {
  const [posts, setPosts] = useState<Posts[] | null>();
  const { data, error, loading, fetchData } = useAxiosFunction<Posts[]>();

  const getData = async () => {
    await fetchData({
      axiosInstance: axios,
      method: "get",
      url: "/posts",
    });

    setPosts(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    await fetchData({
      axiosInstance: axios,
      method: "post",
      url: "/posts",
      requestConfig: {
        data: {
          userId: 10,
          title: "Axios attempt",
          body: "A simple message.",
        },
      },
    });
  };

  const handleRemove = async () => {
    await fetchData({
      axiosInstance: axios,
      method: "delete",
      url: "/posts/12",
    });
  };
  return (
    <article>
      <h2>My Posts</h2>

      <div className="row">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={getData}>Refetch</button>
        <button onClick={handleRemove}>Remove</button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && error && <p className="errorMessage">{error?.message}</p>}

      {!loading && !error && posts?.length && posts && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>{`${post.id}. ${post.title}`} </li>
          ))}
        </ul>
      )}

      {!loading && !error && !posts?.length && posts && (
        <p>{`userId: ${posts[0]?.userId}, title: ${posts[0]?.title}, body: ${posts[0]?.body}`}</p>
      )}

      {!loading && !error && !posts && <p>No posts to display.</p>}
    </article>
  );
};
