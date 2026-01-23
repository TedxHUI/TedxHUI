import { ReactNode } from "react";
import BePart from "./BePart";
import Footer from "./Footer";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        {children}
        <BePart />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
