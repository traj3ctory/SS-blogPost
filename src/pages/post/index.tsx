import Layout from "@/components/layout";
import PostCard from "@/components/post-card";
import { usePostDataContext } from "@/contexts/PostContext";
import { useEffect, useRef } from "react";

interface IProps {}

/**
 * @author traj3ctory
 * @function @Home
 **/

export default ({}: IProps) => {
  const { posts, loading, setLoading, loadMorePosts } = usePostDataContext();
  // const [currentPage, setCurrentPage] = useState(1);
  // const postsPerPage = 10; // Change this to the desired number of posts per page

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // const totalPages = Math.ceil(posts.length / postsPerPage);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const sentinelRef = useRef(null);

  const handleScroll = () => {
    if (
      !(window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    !loading)
    ) {
      return;
    }
    console.log("load more posts")
    setLoading(true);
    loadMorePosts();
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout>
      <div>
        {loading ? (
          // <div className="animate-pulse space-y-4">
          //   {[1, 2, 3, 4, 5].map((index) => (
          //     <div key={index} className="bg-slate-200 rounded h-10 w-4/5" />
          //   ))}
          // </div>
          <div className="animate-pulse space-y-4" ref={sentinelRef} style={{ height: '20px' }}>
            <div className="bg-gray-300 h-5 w-4/5" />
            <div className="bg-gray-300 h-5 w-1/2" />
          </div>
        ) : (
          <>
            <h1>Post List</h1>
            <ul>
              {posts.map((post, i) => (
                <li key={i}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
            {/* <ul>
                {currentPosts.map((post) => (
                  <li key={post.id}>{post.title}</li>
                ))}
              </ul>
              <div>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button key={index} onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                ))}
              </div> */}
          </>
        )}
      </div>
    </Layout>
  );
};
