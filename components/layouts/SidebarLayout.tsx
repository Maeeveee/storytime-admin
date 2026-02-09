"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "@/components/ui/sidebar";
import {
    IconBookFilled,
    IconCategoryFilled,
    IconHomeFilled,
    IconUserFilled,
    IconLogout,
    IconChevronUp,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "motion/react";



interface SidebarLayoutProps {
    children: React.ReactNode;
}

interface NavLink {
    label: string;
    href: string;
    icon: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
    const { user, logout, isLoading } = useAuth();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const links: NavLink[] = [
        {
            label: "Dashboard",
            href: "/",
            icon: <IconHomeFilled className="h-5 w-5 shrink-0" />,
        },
        {
            label: "Story",
            href: "/stories",
            icon: <IconBookFilled className="h-5 w-5 shrink-0" />,
        },
        {
            label: "Category",
            href: "/categories",
            icon: <IconCategoryFilled className="h-5 w-5 shrink-0" />,
        },
        {
            label: "User",
            href: "/users",
            icon: <IconUserFilled className="h-5 w-5 shrink-0" />,
        },
    ];

    const userName = user?.name || "Loading...";
    const userAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`;

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <div
            className={cn(
                "flex w-full flex-1 flex-col overflow-auto border-neutral-200 bg-white md:flex-row dark:border-neutral-700 dark:bg-neutral-900",
                "h-screen w-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-auto overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink
                                    key={idx}
                                    link={link}
                                    className={cn(
                                        "rounded-md px-2 transition-colors",
                                        isActive(link.href)
                                            ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                                            : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                    )}
                                    iconClassName={isActive(link.href) ? "text-white dark:text-neutral-900" : "text-neutral-700 dark:text-neutral-200"}
                                    labelClassName={isActive(link.href) ? "text-white dark:text-neutral-900" : ""}
                                />
                            ))}
                        </div>
                    </div>
                    <UserMenu
                        userName={isLoading ? "Loading..." : userName}
                        userAvatar={userAvatar}
                        onLogout={logout}
                    />
                </SidebarBody>
            </Sidebar>
            <main className="flex flex-1 overflow-auto">
                <div className="flex min-h-full w-full flex-1 flex-col gap-4 p-2 md:p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

interface UserMenuProps {
    userName: string;
    userAvatar: string;
    onLogout: () => Promise<void>;
}

function UserMenu({ userName, userAvatar, onLogout }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { open: sidebarOpen } = useSidebar();
    const router = useRouter();

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center gap-2 rounded-md py-2 hover:bg-neutral-200 transition-colors dark:hover:bg-neutral-700"
            >
                <img
                    src={userAvatar}
                    className="h-7 w-7 shrink-0 rounded-full object-cover"
                    width={50}
                    height={50}
                    alt="Avatar"
                />
                {sidebarOpen && (
                    <>
                        <span className="flex-1 text-left text-sm text-neutral-700 dark:text-neutral-200 line-clamp-1">
                            {userName}
                        </span>
                        <IconChevronUp
                            className={cn(
                                "h-4 w-4 text-neutral-500 transition-transform",
                                isOpen ? "rotate-0" : "rotate-180"
                            )}
                        />
                    </>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-0 right-0 mb-2 rounded-md bg-white shadow-lg border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 overflow-hidden"
                    >
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                onLogout();
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <IconLogout className="h-4 w-4" />
                            <span>Logout</span>
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                router.push("/profile");
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                        >
                            <IconUserFilled className="h-4 w-4" />
                            <span>Profile</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
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
