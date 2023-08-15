import { APP_ROUTES } from "@/utils";
import { useNavigate } from "react-router-dom";
import { usePostDataContext } from "@/contexts/PostContext";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface IProps {
  post: Post;
}

/**
 * @author traj3ctory
 * @function @PostDetailCard
 **/

const PostDetailCard = ({ post }: IProps) => {
  const navigate = useNavigate();
  const { addPost } = usePostDataContext();
  const { postList } = APP_ROUTES;

  const gotoPostList = () => {
    addPost(null);
    navigate(postList as string);
  };

  return (
    <div className="h-fit shadow rounded-lg mt-10 lg:px-6 px-4 hover:bg-slate-50 p-6">
      <div className="flex flex-col justify-center">
        <h5 className="text-2xl text-gray-500 mb-3 text-center">
          {post.title.toUpperCase()}
        </h5>
        <p className="text-gray-600 mt-6">{post.body}</p>
      </div>

      <div
        className="mt-10 text-lg text-gray-500 font-bold text-right cursor-pointer"
        onClick={gotoPostList}
      >
        &larr;&nbsp;Back Blog Post
      </div>
    </div>
  );
};
export default PostDetailCard;
