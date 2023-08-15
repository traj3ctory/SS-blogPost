import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface IProps {
  children: ReactNode;
}

/**
 * @author traj3ctory
 * @function @Layout
 **/

export default ({ children }: IProps) => {
  return (
    <div className="relative h-full">
      <Header />
      <main className="max-w-7xl mx-auto pt-6 mb-12 px-lg-8 px-4">{children}</main>
      <Footer />
    </div>
  );
};
