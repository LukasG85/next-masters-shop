import { ShoppingCart } from "lucide-react"
import Link from "next/link"
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
            <Navigation />
            <div>
                <Link href='/cart' className='group -m-2 flex items-center p2'>
                    <ShoppingCart className="h-6 w-6 flex-shrink-0" aria-hidden='true' />
                    <span className="ml-2 text-sm font-medium">{count}</span>
                    <span className="sr-only">items in cart, view bag</span>
                </Link>
            </div>
        </header>
    )
}