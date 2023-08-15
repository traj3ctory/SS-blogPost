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
 * @function @PostCard
 **/

export default ({ post }: IProps) => {
  return (
    <div className="min-h-fit shadow rounded-5 mb-4">
      {post.id}
      <div className="flex flex-col justify-center">
        <h5 className="text-xl text-gray-500">{post.title}</h5>
        <p className="text-gray-600">{post.body}</p>
      </div>
    </div>
  );
};
