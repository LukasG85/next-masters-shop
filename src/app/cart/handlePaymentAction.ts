import Stripe from "stripe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCart } from "../api/cart";



export async function handleStripePaymentAction() {
    "use server";

    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Missing STRIPE_SECRET_KEY env variable");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-04-10",
        typescript: true,
    });

    const cart = await getCart();
    if (!cart) {
        return;
    }

    const lineItems = cart.orderItems
        .filter(item => item.product !== null && item.product !== undefined)
        .map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.product!.name,
                    description: item.product!.description,
                    images: item.product!.images.map((i) => i.url),
                },
                unit_amount: item.product!.price,
            },
            quantity: item.quantity,
        }));

    const session = await stripe.checkout.sessions.create({
        metadata: {
            cartId: cart.id,
        },
        line_items: lineItems,
        mode: "payment",
        success_url: `http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/cart/canceled`,
    });
    if (session.url) {
        cookies().set("cartId", "");
        redirect(session.url);
    }
}
