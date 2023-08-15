import { SendsprintLogo } from "@/assets/icons";
import { usePostDataContext } from "@/contexts/PostContext";

interface IProps {}

/**
 * @author traj3ctory
 * @function @Header
 **/

export default ({}: IProps) => {
  const { searchPosts } = usePostDataContext();
  
  return (
    <header className="bg-secondary text-gray h-16 sticky shadow top-0 left-0 flex items-center md:px-4 px-2">
      <div className="flex justify-between items-center w-full h-full">

        <div className="flex justify-between items-center">
          <div className="w-fit">
            <SendsprintLogo />
          </div>
          <div className="text-2xl font-bold">
            <h1>'s&nbsp;Blog</h1>
          </div>
        </div>

        <div>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Blog ..."
            className="bg-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            onChange={(e) => searchPosts(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};
