import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CartGetByIdDocument } from "@/gql/graphql";
import { executeGraphQl } from "../api/graphqlApi";
import { formmatMoney } from '@/utils/formatMoney';
import { ChangeQuantity } from "./components/ChangeProductQuantity/ChangeProductQuantity";
import { RemoveButton } from "./components/RemoveButton/RemoveButton";
import { handleStripePaymentAction } from "./handlePaymentAction";


export default async function CartPage() {
    const cartId = cookies().get("cartId")?.value;

    if (!cartId) {
        redirect("/");
    }

    const { order: cart } = await executeGraphQl({
        query: CartGetByIdDocument, variables: {
            id: cartId,
        }
    });

    if (!cart) {
        redirect("/");
    }

    return (
        <div className='mt-40 gap-12 border border-b border-gray-200 rounded-lg'>
            <h1 className="mt-10 mb-10 text-center font-medium text-base text-3xl">Order {cart.id} summary</h1>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">Product</th>
                          <th scope="col" className="px-6 py-3">Quantity</th>
                          <th scope="col" className="px-6 py-3">Price</th>
                          <th scope="col" className="px-6 py-3">Remove</th>
                      </tr>
                  </thead>
                  <tbody >
                      {cart.orderItems.map((item) => {
                          if (!item.product) {
                              return null;
                          }
                          return (
                              <tr key={item.product.id} className="bg-white border-b d dark:border-gray-700">
                                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap">{item.product.name}</td>
                                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                      <ChangeQuantity itemId={item.id} quantity={item.quantity} />
                                  </td>
                                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap">{formmatMoney(item.product.price)}</td>
                                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                      <RemoveButton productId={item.id} />
                                  </td>

                              </tr>
                          );
                      })}
                  </tbody>
              </table>
            </div>
            <form action={handleStripePaymentAction} className="mt-10 mb-10 flex justify-center">
                <button
                    type="submit"
                    className="rounded-sm border bg-slate-100 px-8 py-2 shadow-sm transition-colors hover:bg-slate-200"
                >
                    Pay
                </button>
            </form>

        </div>
    );
}
