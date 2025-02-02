import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthProvider";

import { Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline"

import { Button } from "../components";

function Header() {
  const { auth } = useContext(AuthContext);

  return (
    // outside container
    <div className="flex items-center justify-center pt-12 md:pt-0 pb-2 md:pb-0 border-b border-off-white-500 md:h-20 w-full bg-off-white-100">
      {/* inside container */}
      <div className="flex items-center justify-between w-11/12">
        {/* logo/left side */}
        <Link to="/" className="flex items-center gap-3 md:gap-7">
          <Bars3Icon className="w-9 md:hidden" />
          <img src="logo.png" alt="logo" className="w-6 md:w-12" />
          <div className="text-2xl font-semibold font-components hidden md:block">E-ducate</div>
        </Link>
        {/* nav/right side */}
        <div className="flex items-center gap-3">
          <Link to="/flashcard/create">
            <Button fill={ true } className="flex items-center gap-1">
              <PlusCircleIcon className="w-5 md:w-6" />
              <h4 className="text-xs md:text-sm">Create</h4>
            </Button>
          </Link>
          { auth?.firstName ? "" : 
            <Link to="/signin">
              <Button fill={ false }>
                <h4 className="text-xs md:text-sm">Sign In</h4>
              </Button>
            </Link>
          }
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="flex items-center justify-center h-36 w-full bg-educate-blue-700 text-white ">-Footer-</div>
  );
}

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex grow w-full">
        { children }
      </div>
      <Footer />
    </div>
    
  );
}