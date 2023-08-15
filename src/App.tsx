import "@/styles/globals.css";
import "@/styles/globals.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import NotFound from "@/components/not-found";
import Post from "@/pages/post";

const routes = [
  {
    path: "/",
    element: <Post />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

function App() {
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
