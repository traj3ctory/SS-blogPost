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
  paginatedPosts: Post[];
  post: Post | null;
  setShowToast: (showToast: boolean) => void;
  addPost: (post: Post | null) => void;
  setLoading: (loading: boolean) => void;
  loadMorePosts: (count: number) => void;
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
  const [paginatedPosts, setPaginatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);

  const loadMorePosts = (count: number) => {
    if (loading) {
      return;
    }

    setLoading(true);
    const postsToLoad = posts.slice(count * 10, (count + 1) * 10);
    setPaginatedPosts((prevPosts) => [...prevPosts, ...postsToLoad]);
    setLoading(false);
  };

  const addPost = (post: Post | null) => {
    setPost(post);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const getPostData = async () => {
    try {
      setLoading(true);
      const data = await PostService.getPosts(API_LIST.Posts);
      setPosts(data as Post[]);
      setPaginatedPosts(data.slice(0, 10));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <PostDataContext.Provider
      value={{
        loading,
        post,
        paginatedPosts,
        posts,
        addPost,
        setLoading,
        setShowToast,
        loadMorePosts,
      }}
    >
      {children}
      {showToast && (
        <Toast message="This is a generic toast!" onClose={handleCloseToast} />
      )}
    </PostDataContext.Provider>
  );
};

export default PostDataProvider;
