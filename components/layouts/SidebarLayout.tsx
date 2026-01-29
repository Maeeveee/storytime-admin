"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconBookFilled,
    IconCategoryFilled,
    IconHomeFilled,
    IconUserFilled,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SidebarLayoutProps {
    children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
    const links = [
        {
            label: "Dashboard",
            href: "/",
            icon: (
                <IconHomeFilled className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Story",
            href: "/stories/",
            icon: (
                <IconBookFilled className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Category",
            href: "/categories/",
            icon: (
                <IconCategoryFilled className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "User",
            href: "/users/",
            icon: (
                <IconUserFilled className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);

    return (
        <div
            className={cn(
                "flex w-full flex-1 flex-col overflow-auto border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
                "h-screen w-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-auto overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                icon: (
                                    <img
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <main className="flex flex-1 overflow-auto">
                <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-6 dark:border-neutral-700 dark:bg-neutral-900">
                    {children}
                </div>
            </main>
        </div>
    );
}

export const Logo = () => {
    return (
        <a
            href="/"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <img src="/storytime-logo.webp" className="h-7 w-36" alt="Storytime" />
        </a>
    );
};

export const LogoIcon = () => {
    return (
        <a
            href="/"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <img src="/storytime-crop.webp" className="h-7 w-7" alt="storytime" />
        </a>
    );
};
