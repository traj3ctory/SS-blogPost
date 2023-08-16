import Layout from "@/components/layout";
import PostDetailCard from "@/components/post-detail";
import { usePostDataContext } from "@/contexts/PostContext";
import { APP_ROUTES } from "@/utils";
import { useNavigate } from "react-router-dom";

interface IProps {}

/**
 * @author traj3ctory
 * @function @PostDetail
 **/

const PostDetail = ({}: IProps) => {
  const { post, loading, addPost } = usePostDataContext();
  const navigate = useNavigate();

  const { home } = APP_ROUTES;

  const gotoPostList = () => {
    addPost(null);
    navigate(home as string);
  };

  if (post === null) {
    gotoPostList();
  }
  return (
    <Layout>
      <>
        {!post && !loading && (
          <div className="text-center mb-6 h-[70vh] flex flex-col items-center justify-center gap-2">
            <h3 className="text-3xl">Blog Post</h3>
            <p className="text-gray-500">
              Please select a post to view details
            </p>
            <button
              onClick={gotoPostList}
              className="rounded-md mt-4 bg-primary px-6 py-1 text-white hover:scale-110 transition ease-in-out delay-150"
            >
              Go Back
            </button>
          </div>
        )}
        {loading
          ? [1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse space-y-4 shadow-lg rounded-lg p-2 mb-10"
              >
                <div className="bg-slate-200 h-[1.5rem] w-1/2" />
                <div className="bg-slate-200 h-[1rem] w-5/5" />
                <div className="bg-slate-200 h-[1rem] w-3/5" />
              </div>
            ))
          : post && <PostDetailCard post={post} />}
      </>
    </Layout>
  );
};

export default PostDetail;
