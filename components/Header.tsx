import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

const Header = async () => {
  const { userId } = await auth();
  let user = null;
  let isAdmin = false;
  
  try {
    user = await currentUser();
    isAdmin = user?.publicMetadata?.role === "admin";
  } catch (error) {
    console.error("Error fetching current user:", error);
  }


  return (
    <header className="bg-linear-to-r from-violet-200 to-blue-200 py-2 sticky top-0 z-50">
      <Container className="flex items-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start">
          <MobileMenu />
          <Logo />
        </div>

        <HeaderMenu />

        <div className="flex items-center gap-5 w-auto md:w-1/3 justify-end">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />

          <SignedIn>
            {/* --- CLERK USER BUTTON --- */}
            <UserButton />

            {/* --- ADMIN ICON (Placed to the RIGHT of Login/UserButton) --- */}
            {isAdmin && (
              <Link
                href="/studio"
                title="Admin Dashboard"
                className="group relative hover:text-violet-500 hoverEffect"
              >
                <LayoutDashboard className="text-violet-600 w-6 h-6" />
              </Link>
            )}
          </SignedIn>

          <SignedOut>
            <SignIn />
          </SignedOut>
        </div>
      </Container>
    </header>
  );
};

export default Header;