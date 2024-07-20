import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { executeGraphQl } from "../api/graphqlApi"
import {  OrdersGetByEmailDocument } from "@/gql/graphql"



export default async function OrderPage() {
    const user = await currentUser();
    if (!user) {
      redirect("/sign-in");
    }
  
    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) {
      return <div>User does not have email</div>;
    }
  
    const { orders} = await executeGraphQl({query: OrdersGetByEmailDocument, variables: { email}})

    console.log(orders, email)

    return (
        <div>
            <h1>{user.firstName}&rsquo;s Orders</h1>

            {/* {
                orders.length === 0 ? (
                    <div>No orders found</div>
                ) : (
                    <ul>
                        {orders.map((order) => 
                        order.id  && (
                            <li key={order.id}>
                              <div>{order.attributes.orderId}</div>
                              <div>
                                <time dateTime={order.attributes.createdAt}>
                                  {order.attributes.createdAt}
                                </time>
                              </div>
                            </li>
                          )
                        )}
                    </ul>
                )
            } */}

               
        </div>
    )
  

  }
  