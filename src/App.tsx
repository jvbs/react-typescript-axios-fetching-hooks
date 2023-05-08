import { Jokes } from "./components/Jokes";
import { Posts } from "./components/Posts";

function App() {
  return (
    <>
      <h1>Dad Jokes</h1>
      <Jokes />
      <hr />
      <h1>Posts</h1>
      <Posts />
    </>
  );
}

export default App;
