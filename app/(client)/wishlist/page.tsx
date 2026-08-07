import NoAccess from "@/components/NoAccess";
import WishListProducts from "@/components/WishListProducts";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishListPage = async () => {
  const user = await currentUser();
  return (
    <div className="-mt-12">
      <>
        {user ? (
          <WishListProducts />
        ) : (
          <NoAccess details="Sign in to view your wishlist items and continue your order through WhatsApp with our team." />
        )}
      </>
    </div>
  );
};

export default WishListPage;
