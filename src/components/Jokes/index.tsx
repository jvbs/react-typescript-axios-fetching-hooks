import axios from "../../services/api";
import { useAxios } from "../../hooks/useAxios";

interface JokesProps {}

interface IJoke {
  id: string;
  joke: string;
  status: number;
}

export const Jokes: React.FC<JokesProps> = () => {
  const { data, error, loading, refetch } = useAxios<IJoke>({
    axiosInstance: axios,
    method: "get",
    url: "/",
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
      },
    },
  });

  return (
    <article>
      <h2>Random Dad Joke</h2>
      {loading && <p>Loading...</p>}

      {!loading && error && <p className="errorMessage">{error?.name}</p>}

      {!loading && !error && data && <p>{data?.joke.toString()}</p>}

      {!loading && !error && !data && <p>No jokes to display.</p>}

      <button onClick={() => refetch()}>Get new joke</button>
    </article>
  );
};
