import { usePostDataContext } from "@/contexts/PostContext";
import { APP_ROUTES } from "@/utils";
import { useNavigate } from "react-router-dom";

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
 * @function @PostListCard
 **/

const PostListCard = ({ post }: IProps) => {
  const { addPost } = usePostDataContext();
  const navigate = useNavigate();
  const { postDetail } = APP_ROUTES;

  const gotoPost = () => {
    addPost(post);
    navigate(`${postDetail}${post.id}`);
  };

  return (
    <div
      onClick={gotoPost}
      className="min-h-fit shadow-lg rounded-lg mb-4 lg:p-6 p-4 cursor-pointer hover:bg-slate-50 transition ease-in-out delay-150 hover:-translate-y-1 md:hover:scale-[1.02] duration-300"
    >
      <div className="flex flex-col justify-center">
        <h5 className="text-xl text-gray-500 capitalize md:block hidden">
          {post.id}. {post.title}
        </h5>
        <h5 className="text-xl text-gray-500 capitalize md:hidden block">
          {post.id}.{" "}
          {post.title.length > 20
            ? `${post.title.substring(0, 20)}...`
            : post.title}
        </h5>
      </div>
    </div>
  );
};
export default PostListCard;
