"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeItem } from "../../actions";

export function RemoveButton({ productId }: { productId: string }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return (
        <button
            disabled={isPending}
            onClick={() =>
                startTransition(async () => {
                    await removeItem(productId);
                    router.refresh();
                })
            }
            className="p-2 text-sm font-medium text-black hover:bg-black hover:text-white disabled:cursor-wait disabled:text-slate-400 transition duration-200"
        >
            Remove
        </button>
    );
}
