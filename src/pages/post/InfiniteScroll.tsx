import Layout from "@/components/layout";
import PostListCard from "@/components/post-list";
import { usePostDataContext } from "@/contexts/PostContext";
import { useEffect, useRef } from "react";

interface IProps {}

/**
 * @author traj3ctory
 * @function @PostListInfiniteScroll
 **/

const PostListInfiniteScroll = ({}: IProps) => {
  const {
    searchTerm,
    filteredPosts,
    posts,
    paginatedPosts,
    loading,
    loadingMore,
    loadMorePosts,
    setSearchTerm,
  } = usePostDataContext();

  const sentinelRef = useRef<any>(null);

  const handleScroll = async () => {
    if (
      !(
        sentinelRef.current &&
        sentinelRef.current.getBoundingClientRect().bottom <=
          window.innerHeight + 100 &&
        !loading &&
        !loadingMore
      )
    ) {
      return;
    }
  
    if (
      !(paginatedPosts.length < posts.length  && !loadingMore)
    ) {
      return;
    }

    await loadMorePosts();
  };
  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  useEffect(() => {
    setSearchTerm("");
  }, []);

  const dataStore = filteredPosts?.length > 0 ? filteredPosts : paginatedPosts;

  return (
    <Layout search={true}>
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

        {searchTerm !== "" && filteredPosts?.length === 0 && (
          <p className="text-xl my-3">
            No result found for:{" "}
            <span className="font-semibold underline">{searchTerm}</span>
          </p>
        )}

        {loading && [1, 2, 3, 4, 5].map((i) => <Loader key={i} />)}
        {!loading && (
          <ul>
            {dataStore.map((post, i) => (
              <li key={i}>
                <PostListCard post={post} />
              </li>
            ))}
            <div ref={sentinelRef} style={{ height: "1px" }} />
          </ul>
        )}
        {loadingMore && [1, 2, 3].map((i) => <Loader key={i} />)}
        {!loadingMore && !loading && (
          <div className="flex justify-between">
            <p className="text-lg">
              {dataStore.length > 0
                ? `Showing ${dataStore.length} of ${posts.length} posts`
                : "No Posts"}
            </p>
            <p className="text-lg">
              {dataStore.length === posts.length && "No more posts"}
            </p>
          </div>
        )}
      </>
    </Layout>
  );
};

const Loader = () => {
  return (
    <div className="animate-pulse space-y-4 shadow-md rounded-md p-2 mb-5">
      <div className="bg-slate-200 h-[1rem] w-5/5 py-3" />
    </div>
  );
};

export default PostListInfiniteScroll;
