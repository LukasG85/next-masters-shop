import { cookies } from "next/headers";

import { Navigation } from '@/ui/organisms/Navigation';
import { executeGraphQl } from "@/app/api/graphqlApi";
import { CartGetByIdDocument } from "@/gql/graphql";

export const Navbar = async () => {
    const cartId = cookies().get("cartId")?.value;
    const cart = cartId
        ? await executeGraphQl({
            query: CartGetByIdDocument, variables: {
                id: cartId,
            }
        })
        : null;

    const count = cart?.order?.orderItems.length || 0;

    return (
        <header>
            <Navigation cartCount={count}/>
        </header>
    )
}