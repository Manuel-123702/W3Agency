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
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Logs } from "lucide-react";
import { getMyOrders } from "@/sanity/queries";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  let orders = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }
  return (
    <header className="bg-linear-to-r from-violet-200 to-blue-200 py-1 sticky top-0 z-50">
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
          <ClerkLoaded>
            <SignedIn>
              <Link
                href={"/orders"}
                className="group relative hover:text-violet-500
                 hoverEffect"
              >
                <Logs className="text-violet-600" />
                <span
                  className="absolute -top-1 -right-1 bg-violet-700
                 text-white  
                h-3.5 w-3.5 rounded-full text-xs
                 font-bold flex items-center justify-center"
                >
                  {orders?.length ? orders?.length : 0}
                </span>
              </Link>

              <UserButton />
            </SignedIn>
            {!user && <SignIn />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
