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
          <NoAccess details="Log in to view your wishlist items. Don’t miss out on your cart products to make the payment!" />
        )}
      </>
    </div>
  );
};

export default WishListPage;
