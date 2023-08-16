import Layout from "@/components/layout";
import { APP_ROUTES } from "@/utils";
import { useNavigate } from "react-router-dom";

interface IProps {}

/**
 * @author traj3ctory
 * @function @PostList
 **/

const PostList = ({}: IProps) => {
  const navigate = useNavigate();
  const { postListInfiniteScroll, postListPagination } = APP_ROUTES;

  return (
    <Layout>
      <div className="flex min-h-[70vh] gap-6 justify-center items-center">
        <div
          onClick={() => navigate(postListInfiniteScroll as string)}
          className="flex-1 shadow-md bg-slate-50 rounded-lg p-4 flex justify-center items-center max-w-[15rem] h-[10rem] hover:bg-slate-700 hover:text-white cursor-pointer hover:shadow-lg text-2xl font-semibold"
        >
          Infinite&nbsp;Scroll
        </div>

        <div
          onClick={() => navigate(postListPagination as string)}
          className="flex-1 shadow-md bg-slate-50 rounded-lg p-4 flex justify-center items-center max-w-[15rem] h-[10rem] hover:bg-slate-700 hover:text-white cursor-pointer hover:shadow-lg text-2xl font-semibold"
        >
          Pagination
        </div>
      </div>
    </Layout>
  );
};

export default PostList;
