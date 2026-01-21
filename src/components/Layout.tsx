import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Be_Part from "./Be_Part";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        {children}
        <Be_Part />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
