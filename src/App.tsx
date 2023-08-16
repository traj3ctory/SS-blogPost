import "@/styles/globals.css";
import "@/styles/globals.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import NotFound from "@/components/not-found";
import Post from "@/pages/post";
import PostInfiniteScroll from "@/pages/post/InfiniteScroll";
import PostDetail from "@/pages/post/Detail";
import PostPagination from "@/pages/post/Pagination";

const routes = [
  {
    path: "/",
    element: <Post />,
  },
  {
    path: "/posts",
    element: <Post />,
  },
  {
    path: "/posts-infinite-scroll",
    element: <PostInfiniteScroll />,
  },
  {
    path: "/posts-pagination",
    element: <PostPagination />,
  },
  {
    path: "post/:id",
    element: <PostDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((el) => (
          <Route key={el.path} path={el.path} element={el.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
