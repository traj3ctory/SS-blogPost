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
  loading: boolean;
  loadingMore: boolean;
  posts: Post[];
  paginatedPosts: Post[];
  filteredPosts: Post[];
  post: Post | null;
  setShowToast: (showToast: boolean) => void;
  addPost: (post: Post | null) => void;
  setLoading: (loading: boolean) => void;
  loadMorePosts: (count: number) => void;
  searchPosts: (searchTerm: string) => void;
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
    console.log("Loading more posts...", countRef);
  };

  /**
   * @function searchPosts
   * @description Search posts
   */
  const searchPosts = (searchTerm: string) => {
    if (loading) {
      return;
    }

    setLoading(true);
    if (searchTerm.length === 0) {
      // If search term is empty, restore original posts
      setFilteredPosts([]);
      setLoading(false);
      return;
    }

    const filteredPosts = posts.filter((el) =>
      el.title.toLowerCase().includes(searchTerm.toLowerCase())
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
