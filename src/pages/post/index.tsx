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
    <Layout search={true}>
      <div className="flex min-h-[70vh] gap-4 justify-center items-center">
        <div
          onClick={() => navigate(postListInfiniteScroll as string)}
          className="flex-1 shadow bg-gray-100 rounded-lg p-4 flex justify-center items-center max-w-[10rem] h-[10rem] hover:bg-gray-200 cursor-pointer hover:shadow-lg text-lg font-semibold"
        >
          Infinite Scroll
        </div>

        <div
          onClick={() => navigate(postListPagination as string)}
          className="flex-1 shadow bg-gray-100 rounded-lg p-4 flex justify-center items-center text-center max-w-[10rem] h-[10rem] hover:bg-gray-200 cursor-pointer hover:shadow-lg text-lg font-semibold"
        >
          Pagination
        </div>
      </div>
    </Layout>
  );
};

export default PostList;
