import { SendsprintLogo } from "@/assets/icons";
import { usePostDataContext } from "@/contexts/PostContext";
import { APP_ROUTES } from "@/utils";
import { useNavigate } from "react-router-dom";

interface IProps {
  search: boolean;
}

/**
 * @author traj3ctory
 * @function @Header
 **/

export default ({ search = false }: IProps) => {
  const navigate = useNavigate();
  const { searchPosts } = usePostDataContext();

  const { home } = APP_ROUTES;

  return (
    <header className="bg-secondary text-gray min-h-16 py-3 md:sticky shadow top-0 left-0 flex items-center md:px-4 px-2">
      <div className="flex md:flex-row flex-col justify-between items-center w-full h-full gap-2">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => navigate(home as string)}
        >
          <div className="w-fit">
            <SendsprintLogo />
          </div>
          <div className="text-2xl font-bold">
            <h1 className="mb-2">'s&nbsp;Blog</h1>
          </div>
        </div>

        {search && (
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
        )}
      </div>
    </header>
  );
};
