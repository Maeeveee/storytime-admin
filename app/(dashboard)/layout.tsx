"use client"
import SidebarLayout from "@/components/layouts/SidebarLayout";
import { usePathname } from "next/navigation";

export default function DashboardLayout({children,}: {children: React.ReactNode;}) {
    const pathname = usePathname();
    const noLayoutPath = ["/login"];

    const shouldHideLayout = noLayoutPath.includes(pathname);

    if (shouldHideLayout) {
        return children;
    }
    return <SidebarLayout>{children}</SidebarLayout>;
}
