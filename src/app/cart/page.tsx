import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CartGetByIdDocument } from "@/gql/graphql";
import { executeGraphQl } from "../api/graphqlApi";
import { formmatMoney } from '@/utils/formatMoney';
import { ChangeQuantity } from "./ChangeProductQuantity";
import { RemoveButton } from "./RemoveButton";
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
        <div>
            <h1>Order #{cart.id} summary</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.orderItems.map((item) => {
                        if (!item.product) {
                            return null;
                        }
                        return (
                            <tr key={item.product.id}>
                                <td>{item.product.name}</td>
                                <td>
                                    <ChangeQuantity itemId={item.id} quantity={item.quantity} />
                                </td>
                                <td>{formmatMoney(item.product.price)}</td>
                                <td className="px-4 py-2">
                                    <RemoveButton productId={item.id} />
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <form action={handleStripePaymentAction} className="ml-auto">
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
