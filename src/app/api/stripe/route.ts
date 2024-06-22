/// <reference types="stripe-event-types" />

import { type NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest): Promise<Response> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        return new Response("No webhook secret", { status: 500 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
        return new Response("No Stripe secret key", { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-04-10",
        typescript: true,
    });

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
        return new Response("No signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
        await req.text(),
        signature,
        webhookSecret,
    ) as Stripe.DiscriminatedEvent;

    return new Response(null, { status: 204 });
}
