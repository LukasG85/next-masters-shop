import { TypedDocumentString } from "@/gql/graphql";

export async function executeGraphQl<TResult, TVariables>({
    query,
    variables,
    cache,
    next,
    headers,
}: {
    query: TypedDocumentString<TResult, TVariables>;
    cache?: RequestCache;
    headers?: HeadersInit;
    next?: NextFetchRequestConfig | undefined;
} & (TVariables extends { [key: string]: never }
    ? { variables?: never }
    : { variables: TVariables })): Promise<TResult> {
    if (!process.env.GRAPHQL_URL) {
        throw TypeError("GRAPHQL_URL is not defined");
    }

    const res = await fetch(process.env.GRAPHQL_URL, {
        method: "POST",
        body: JSON.stringify({
            query,
            variables,
        }),
        cache,
        next,
        headers: {
            ...headers,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`
        },
    });

    type GraphQLResponse<T> = | { data?: undefined; errors: { message: string }[] } | { data: T; errors: undefined }

    const graphqlResponse = (await res.json()) as GraphQLResponse<TResult>;

    if (graphqlResponse.errors) {
        throw TypeError(`GraphQL Error`, {
            cause: graphqlResponse.errors,
        });
    }

    return graphqlResponse.data;
}
