import Toast from "@/components/toast";
import PostService from "@/services";
import { API_LIST } from "@/utils";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IProps {
  children: ReactNode;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostDataContextProps {
  loading: boolean;
  posts: Post[];
  post: Post | null;
  setShowToast: (showToast: boolean) => void;
  addPost: (post: Post) => void;
  setLoading: (loading: boolean) => void;
  loadMorePosts: () => void;
}

const PostDataContext = createContext<PostDataContextProps | undefined>(
  undefined
);

export const usePostDataContext = () => {
  const context = useContext(PostDataContext);
  if (!context) {
    throw new Error(
      "usePostDataContext must be used within a PostDataProvider"
    );
  }
  return context;
};

const PostDataProvider = ({ children }: IProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [chunkIndex, setChunkIndex] = useState<number>(1);

  const loadMorePosts = () => {
    setLoading(true);
    // You can slice the data based on the chunk index and load more posts
    // Update the chunk index and loading state when done
    const nextChunkIndex = chunkIndex + 1;
    setChunkIndex(nextChunkIndex);
    setLoading(false);
  };

  const addPost = (post: Post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const getPost = (id: number) => {
    setLoading(true);
    // PostService.getPost(API_LIST.Posts, id).then((data) => {
    //   setPost(data);
    //   setLoading(false);
    // }
    // );
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    // You can fetch initial post data from an API here
    setLoading(true);
    PostService.getPosts(API_LIST.Posts)
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PostDataContext.Provider
      value={{ loading, post, posts: posts.slice(0, chunkIndex * 10), addPost, setLoading, setShowToast, loadMorePosts }}
    >
      {children}
      {showToast && (
        <Toast message="This is a generic toast!" onClose={handleCloseToast} />
      )}
    </PostDataContext.Provider>
  );
};

export default PostDataProvider;
