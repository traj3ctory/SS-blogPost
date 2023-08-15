import { SendsprintLogo } from "@/assets/icons";

interface IProps {}

/**
 * @author traj3ctory
 * @function @Header
 **/

export default ({}: IProps) => {
  return (
    <header className="bg-secondary text-gray h-16 sticky shadow top-0 left-0 flex items-center md:px-4 px-2">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <div className="w-fit">
            <SendsprintLogo />
          </div>
          <div className="text-2xl font-bold">
            <h1>'s&nbsp;Blog</h1>
          </div>
        </div>
      </div>
    </header>
  );
};
