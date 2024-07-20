/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartRemoveProductDocument,
    "mutation CartAddItem($cartId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, order: {connect: {id: $cartId}}, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}": types.CartAddItemDocument,
    "mutation CartCreate($email: String!) {\n  createOrder(data: {total: 0, email: $email, stripeCheckoutId: \"1\"}) {\n    ...Cart\n  }\n}": types.CartCreateDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    id\n    orderItems {\n      quantity\n      id\n      product {\n        ...ProductListItem\n      }\n    }\n  }\n}": types.CartGetByIdDocument,
    "fragment Cart on Order {\n  id\n}": types.CartFragmentDoc,
    "mutation CartSetProductQuantityI($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}": types.CartSetProductQuantityIDocument,
    "query OrdersGetByEmail($email: String!) {\n  orders(where: {email: $email}) {\n    id\n    total\n    orderItems {\n      id\n      quantity\n      total\n      product {\n        name\n        price\n        images {\n          url\n        }\n      }\n    }\n    createdAt\n  }\n}": types.OrdersGetByEmailDocument,
    "query ProductGetItem($id: ID!) {\n  product(where: {id: $id}) {\n    name\n    id\n    slug\n    price\n    description\n    images {\n      url\n    }\n    categories {\n      name\n    }\n  }\n}": types.ProductGetItemDocument,
    "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n}": types.ProductListItemFragmentDoc,
    "query ProductsGetByCategorySlug($slug: String!, $pageSize: Int, $skip: Int) {\n  products(first: $pageSize, skip: $skip, where: {categories_some: {slug: $slug}}) {\n    ...ProductListItem\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    pageInfo {\n      pageSize\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetList($pageSize: Int, $skip: Int) {\n  products(first: $pageSize, skip: $skip) {\n    ...ProductListItem\n  }\n  productsConnection {\n    pageInfo {\n      pageSize\n    }\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddItem($cartId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, order: {connect: {id: $cartId}}, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartAddItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate($email: String!) {\n  createOrder(data: {total: 0, email: $email, stripeCheckoutId: \"1\"}) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    id\n    orderItems {\n      quantity\n      id\n      product {\n        ...ProductListItem\n      }\n    }\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Cart on Order {\n  id\n}"): typeof import('./graphql').CartFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetProductQuantityI($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}"): typeof import('./graphql').CartSetProductQuantityIDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query OrdersGetByEmail($email: String!) {\n  orders(where: {email: $email}) {\n    id\n    total\n    orderItems {\n      id\n      quantity\n      total\n      product {\n        name\n        price\n        images {\n          url\n        }\n      }\n    }\n    createdAt\n  }\n}"): typeof import('./graphql').OrdersGetByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetItem($id: ID!) {\n  product(where: {id: $id}) {\n    name\n    id\n    slug\n    price\n    description\n    images {\n      url\n    }\n    categories {\n      name\n    }\n  }\n}"): typeof import('./graphql').ProductGetItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!, $pageSize: Int, $skip: Int) {\n  products(first: $pageSize, skip: $skip, where: {categories_some: {slug: $slug}}) {\n    ...ProductListItem\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    pageInfo {\n      pageSize\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($pageSize: Int, $skip: Int) {\n  products(first: $pageSize, skip: $skip) {\n    ...ProductListItem\n  }\n  productsConnection {\n    pageInfo {\n      pageSize\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
