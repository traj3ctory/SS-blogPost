import Layout from "@/components/layout";
import PostListCard from "@/components/post-list";
import { usePostDataContext } from "@/contexts/PostContext";
import { useEffect, useRef } from "react";

interface IProps {}

/**
 * @author traj3ctory
 * @function @PostList
 **/

const PostList = ({}: IProps) => {
  const { posts, paginatedPosts, loading, loadMorePosts } =
    usePostDataContext();
  let count = 0;

  // const [currentPage, setCurrentPage] = useState(1);
  // const postsPerPage = 10; // Change this to the desired number of posts per page

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // const totalPages = Math.ceil(posts.length / postsPerPage);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const sentinelRef = useRef<any>(null);

  const handleScroll = () => {
    if (
      !(
        sentinelRef.current &&
        sentinelRef.current.getBoundingClientRect().bottom <=
          window.innerHeight + 100 &&
        !loading
      )
    ) {
      return;
    }
    count++;
    loadMorePosts(count);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <Layout>
      <>
        <div className="text-center mb-6">
          <h3 className="text-2xl">Blog Post</h3>
          {loading ? (
            <small>Loading ...</small>
          ) : (
            <small>
              {posts.length > 0 ? `Total Posts: ${posts.length}` : "No Posts"}
            </small>
          )}
        </div>
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse space-y-4 shadow-lg rounded-lg p-2 mb-10"
            >
              <div className="bg-slate-200 h-[1.5rem] w-1/2" />
              <div className="bg-slate-200 h-[1rem] w-5/5" />
              <div className="bg-slate-200 h-[1rem] w-5/5" />
              <div className="bg-slate-200 h-[1rem] w-4/5" />
              <div className="bg-slate-200 h-[1rem] w-3/5" />
            </div>
          ))
        ) : (
          <>
            <ul>
              {paginatedPosts.map((post, i) => (
                <li key={i}>
                  <PostListCard post={post} />
                </li>
              ))}
              <div ref={sentinelRef} style={{ height: "1px" }} />
            </ul>

            <div className="flex justify-between">
              <p className="text-lg">
                {paginatedPosts.length > 0
                  ? `Showing ${paginatedPosts.length} of ${posts.length} posts`
                  : "No Posts"}
              </p>
              <p className="text-lg">
                {paginatedPosts.length === posts.length
                  ? "No more posts"
                  : "Loading..."}
              </p>
            </div>
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
      </>
    </Layout>
  );
};

export default PostList;
