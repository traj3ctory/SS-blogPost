import "@/styles/globals.css";
import "@/styles/globals.scss";
import { lazy, Suspense } from "react"; // Import lazy and Suspense
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import NotFound from "@/components/not-found";

// Use React.lazy() to lazily load components
const Post = lazy(() => import("@/pages/post"));
const PostInfiniteScroll = lazy(() => import("@/pages/post/InfiniteScroll"));
const PostDetail = lazy(() => import("@/pages/post/Detail"));
const PostPagination = lazy(() => import("@/pages/post/Pagination"));

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
      {/* Wrap individual Route with Suspense */}
      <Routes>
        {routes.map((el) => (
          <Route
            key={el.path}
            path={el.path}
            element={
              <Suspense fallback={<div>Loading...</div>}>{el.element}</Suspense>
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
