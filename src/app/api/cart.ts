
import { cookies } from "next/headers";
import { executeGraphQl } from "./graphqlApi";
import { CartAddItemDocument, CartCreateDocument, CartGetByIdDocument, ProductGetItemDocument } from "@/gql/graphql";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getCart = async () => {
    const cartId = cookies().get("cartId")?.value;

    if (!cartId) {
        return;
    }

    const cart = await executeGraphQl({
        query: CartGetByIdDocument,
        variables: {
            id: cartId,
        },
        cache: "no-store",
        next: {
            tags: ["cart"],
        },
    });

    if (!cart.order) {
        return;
    }
    return cart.order;
};



export async function getOrCreateCart() {
    const cartId = cookies().get("cartId")?.value;
    if (cartId) {
        const { order: cart } = await executeGraphQl({
            query: CartGetByIdDocument, variables: {
                id: cartId,
            },
            next: {
                tags: ['cart'],
            },
            cache: 'no-store'
        });
        if (cart) {
            return cart;
        }
    }

    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
      }
    
      const email = user.emailAddresses[0]?.emailAddress;

      if (!email) {
        return;
      }

    const { createOrder: newCart } = await executeGraphQl({ query: CartCreateDocument, variables: {
        email
    } });
    if (!newCart) {
        throw new Error("Failed to create cart");
    }

    cookies().set("cartId", newCart.id, {
        httpOnly: true,
        sameSite: 'lax'
    });

    return newCart;
}

export async function addToCart(cartId: string, productId: string) {
    const { product } = await executeGraphQl({
        query: ProductGetItemDocument, variables: {
            id: productId,
        },
        cache: "no-store"
    });
    if (!product) {
        throw new Error(`Product with id ${productId} not found`);
    }

    await executeGraphQl({
        query: CartAddItemDocument, variables: {
            cartId,
            productId,
            total: product.price,
        }, cache: 'no-store'
    });
}