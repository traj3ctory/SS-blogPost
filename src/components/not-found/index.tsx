import Layout from "@/components/layout";
import { APP_ROUTES } from "@/utils";
import { NavLink } from "react-router-dom";

interface IProps {}

/**
 * @author traj3ctory
 * @function @NotFound
 **/

export default ({}: IProps) => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-6xl font-semibold">404</h1>
        <p className="text-xl font-semibold">Page Not Found</p>

        <NavLink
          to={APP_ROUTES.home as string}
          className="px-4 py-2 mt-6 text-white bg-primary rounded hover:scale-[1.05] hover:shadow transition ease-in-out duration-300"
        >
          &#10094;&#10094;&ensp;Back to Home
        </NavLink>
      </div>
    </Layout>
  );
};
