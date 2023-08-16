interface IProps {}

/**
 * @author traj3ctory
 * @function @Footer
 **/

export default ({}: IProps) => {
  return (
    <footer className="fixed bottom-0 left-0 w-full">
      <div className="flex justify-center items-center h-8 bg-primary text-white">
        <p className="text-sm">© {new Date().getFullYear()} Traj3ctory 💖</p>
      </div>
    </footer>
  );
};
