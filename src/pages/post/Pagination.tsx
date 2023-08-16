import Layout from "@/components/layout";
import PostListCard from "@/components/post-list";
import { usePostDataContext } from "@/contexts/PostContext";
import { useState } from "react";

interface IProps {}

/**
 * @author traj3ctory
 * @function @PostListPagination
 **/

const PostListPagination = ({}: IProps) => {
  const { searchTerm, filteredPosts, posts, loading } = usePostDataContext();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 7; // Change this to the desired number of posts per page

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageRange = 1; // Number of page numbers to show before and after the current page
    const pageNumbers = [];

    for (
      let i = Math.max(1, currentPage - pageRange);
      i <= Math.min(totalPages, currentPage + pageRange);
      i++
    ) {
      pageNumbers.push(
        <button
          className={`rounded-md mt-4 px-3 py-1 hover:scale-110 transition ease-in-out delay-150 text-white ${
            currentPage === i ? "bg-primary" : "bg-slate-400"
          }`}
          key={i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis before and after page numbers
    if (currentPage - pageRange > 1) {
      pageNumbers.unshift(<span key="ellipsis-start">...</span>);
    }

    if (currentPage + pageRange < totalPages) {
      pageNumbers.push(<span key="ellipsis-end">...</span>);
    }

    return pageNumbers;
  };

  const dataStore = filteredPosts?.length > 0 ? filteredPosts : currentPosts;

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
              {dataStore.map((post, i) => (
                <li key={i}>
                  <PostListCard post={post} />
                </li>
              ))}
            </ul>

            <div className="flex justify-center">
              <p className="text-lg">
                {dataStore.length === posts.length && "No more posts"}
              </p>
            </div>

            {filteredPosts?.length === 0 && (
              <div className="text-center flex gap-3 justify-center items-center">
                <button
                  className={`rounded-md mt-4 px-3 py-1 hover:scale-110 transition ease-in-out delay-150 text-white ${
                    currentPage === 1 ? "bg-primary" : "bg-slate-400"
                  }`}
                  onClick={() => handlePageChange(1)}
                >
                  &#10094;&#10094;
                </button>
                {renderPageNumbers()}
                <button
                  className={`rounded-md mt-4 px-3 py-1 hover:scale-110 transition ease-in-out delay-150 text-white ${
                    currentPage === totalPages ? "bg-primary" : "bg-slate-400"
                  }`}
                  onClick={() => handlePageChange(totalPages)}
                >
                  &#10095;&#10095;
                </button>
              </div>
            )}
          </>
        )}
      </>
    </Layout>
  );
};

export default PostListPagination;
