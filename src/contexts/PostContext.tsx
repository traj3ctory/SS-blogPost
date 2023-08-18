import Toast from "@/components/toast";
import PostService from "@/services";
import { API_LIST } from "@/utils";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
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
  searchTerm: string;
  loading: boolean;
  loadingMore: boolean;
  posts: Post[];
  paginatedPosts: Post[];
  filteredPosts: Post[];
  post: Post | null;
  setShowToast: (showToast: boolean) => void;
  addPost: (post: Post | null) => void;
  setLoading: (loading: boolean) => void;
  loadMorePosts: () => void;
  searchPosts: (searchTerm: string) => void;
  setSearchTerm: (searchTerm: string) => void;
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
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const postsPerPage = 10;

  const countRef = useRef<number>(1);

  /**
   * @function loadMorePosts
   * @description Load more posts
   */

  const loadMorePosts = async () => {
    if (
      loadingMore ||
      loading ||
      countRef.current * postsPerPage >= posts.length
    ) {
      return;
    }

    setLoadingMore(true);

    const postsToLoad = posts.slice(
      countRef.current * postsPerPage,
      (countRef.current + 1) * postsPerPage
    );

    setPaginatedPosts((prevPosts) => [...prevPosts, ...postsToLoad]);
    setLoadingMore(false);
    countRef.current += 1;
  };

  /**
   * @function searchPosts
   * @description Search posts
   */
  const searchPosts = (val: string) => {
    setSearchTerm(val);
    if (loading || val.length === 0) {
      return;
    }

    setLoading(true);
    if (val.length === 0) {
      // If search term is empty, restore original posts
      setFilteredPosts([]);
      setLoading(false);
      return;
    }

    const filteredPosts = posts.filter((el) =>
      el.title.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredPosts(filteredPosts);
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
      setPaginatedPosts(data.slice(0, postsPerPage));
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
        searchTerm,
        loading,
        loadingMore,
        post,
        paginatedPosts,
        posts,
        filteredPosts,
        addPost,
        setLoading,
        setShowToast,
        loadMorePosts,
        searchPosts,
        setSearchTerm,
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
