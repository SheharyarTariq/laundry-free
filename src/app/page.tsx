"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { routes } from "@/lib/utils/routes";
function Page() {
    const router = useRouter();
    useEffect(() => {
        router.push(routes.ui.areas);
    }, []);
  
}

export default Page