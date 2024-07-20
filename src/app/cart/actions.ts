'use server'

import { CartRemoveProductDocument, CartSetProductQuantityIDocument } from "@/gql/graphql"
import { executeGraphQl } from "../api/graphqlApi"

export const removeItem = (itemId: string) => {
    return executeGraphQl({ query: CartRemoveProductDocument, variables: { itemId } })
}

export const changeItemQuantity = (itemId: string, quantity: number) => {
    return executeGraphQl({ query: CartSetProductQuantityIDocument, variables: { itemId, quantity } })
}