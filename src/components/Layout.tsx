import { ReactNode } from "react";
import Be_Part from "./Be_Part";
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
        <Be_Part />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
