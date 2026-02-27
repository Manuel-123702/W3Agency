import { MY_ORDERS_QUERY_RESULT } from "@/sanity.types";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";

interface OrderDetailsDialogProps {
  order: MY_ORDERS_QUERY_RESULT[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  const subtotal =
    (order.totalPrice as number) + (order.amountDiscount as number);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-violet-500">
            Order Details - {order.orderNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-1">
          <p>
            <strong className="text-blue-500">Customer:</strong>{" "}
            {order.customerName}
          </p>
          <p>
            <strong className="text-blue-500">Email:</strong> {order.email}
          </p>
          <p>
            <strong className="text-blue-500">Date:</strong>{" "}
            {order.orderDate && new Date(order.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong className="text-blue-500">Status:</strong>{" "}
            <span className="capitalize text-blue-600 font-medium">
              {order.status}
            </span>
          </p>
          <p>
            <strong>Invoice Number:</strong> {order.invoice?.number}
          </p>

          {order.invoice?.hosted_invoice_url && (
            <Button
              asChild
              className="mt-2 bg-lightOrange text-black hover:text-white hover:bg-shop_dark_green hoverEffect"
            >
              <Link href={order.invoice.hosted_invoice_url} target="_blank">
                Download Invoice
              </Link>
            </Button>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order.products?.map((product, index) => {
              const image = product?.product?.images?.[0];

              return (
                <TableRow key={index}>
                  <TableCell className="flex items-center gap-2">
                    {image && (
                      <Image
                        src={urlFor(image).url()}
                        alt={product?.product?.name || "Product"}
                        width={50}
                        height={50}
                        className="border rounded-sm"
                      />
                    )}

                    {product?.product?.name}
                  </TableCell>

                  <TableCell>{product?.quantity}</TableCell>

                  <TableCell>
                    <PriceFormatter
                      amount={product?.product?.price}
                      className="text-black font-medium"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-end">
          <div className="w-44 flex flex-col gap-1">
            {order.amountDiscount !== 0 && (
              <>
                <div className="flex justify-between">
                  <strong>Discount:</strong>
                  <PriceFormatter
                    amount={order.amountDiscount}
                    className="text-black font-bold"
                  />
                </div>

                <div className="flex justify-between">
                  <strong>Subtotal:</strong>
                  <PriceFormatter
                    amount={subtotal}
                    className="text-black font-bold"
                  />
                </div>
              </>
            )}

            <div className="flex justify-between">
              <strong>Total:</strong>
              <PriceFormatter
                amount={order.totalPrice}
                className="text-black font-bold"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
