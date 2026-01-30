"use client";
import { useState } from "react";
import FilterCategory from "@/components/filters/category/filterCategory";
import {EllipsisIcon} from "lucide-react"
import { Button } from "@/components/ui/button"

import {
    Expandable,
    ExpandableCard,
    ExpandableCardContent,
    ExpandableCardFooter,
    ExpandableContent,
    ExpandableTrigger,
} from "@/components/ui/expandable"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    DropdownMenuItem,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

export default function CardCategoryList() {
    return (
        <div className="space-y-1">
            <FilterCategory />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
                <Expandable expandDirection="both" expandBehavior="replace">
                    <ExpandableTrigger>
                        <ExpandableCard
                            collapsedSize={{ width: 300, height: 220 }}
                            expandedSize={{ width: 500, height: 420 }}
                            hoverToExpand={false}
                            expandDelay={100}
                            collapseDelay={400}>
                            <ExpandableCardContent>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-full">
                                        <p className="text-xl font-bold">Fantasy</p>
                                    </div>
                                    <div className="w-full flex justify-end">
                                        <ExpandableContent
                                            preset="blur-sm"
                                            stagger
                                            staggerChildren={0.1}
                                            keepMounted={true}
                                            animateIn={{
                                                initial: { opacity: 0, y: 20, rotate: -5 },
                                                animate: { opacity: 1, y: 0, rotate: 0 },
                                                transition: { type: "spring", stiffness: 300, damping: 20 },
                                            }}>
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold">15 Stories</p>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button size="icon" variant="outline" className="h-8 w-8">
                                                                <RowActions />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>More option</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </ExpandableContent>
                                    </div>
                                </div>
                                <ExpandableContent
                                    preset="blur-sm"
                                    stagger
                                    staggerChildren={0.1}
                                    keepMounted={true}
                                    animateIn={{
                                        initial: { opacity: 0, y: 20, rotate: -5 },
                                        animate: { opacity: 1, y: 0, rotate: 0 },
                                        transition: { type: "spring", stiffness: 300, damping: 20 },
                                    }}>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between items-center mb-8">
                                            <div className="flex items-center">
                                                <span>Top 5 Authors</span>
                                            </div>
                                            <span>Stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>Rizal</span>
                                            </div>
                                            <span>8 stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>Bonifacio</span>
                                            </div>
                                            <span>3 stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>Luna</span>
                                            </div>
                                            <span>4 stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>Del Pilar</span>
                                            </div>
                                            <span>6 stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>Lopez Jaena</span>
                                            </div>
                                            <span>2 stories</span>
                                        </div>
                                    </div>
                                </ExpandableContent>
                            </ExpandableCardContent>
                            <ExpandableCardFooter>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Last story created: 5 minutes ago
                                </p>
                            </ExpandableCardFooter>
                        </ExpandableCard>
                    </ExpandableTrigger>
                </Expandable>
                {/* 
                <Expandable expandDirection="both" expandBehavior="replace">
                    <ExpandableTrigger>
                        <ExpandableCard
                            collapsedSize={{ width: 300, height: 220 }}
                            expandedSize={{ width: 500, height: 420 }}
                            hoverToExpand={false}
                            expandDelay={100}
                            collapseDelay={400}>
                            <ExpandableCardContent>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-full">
                                        <p className="text-xl font-bold">Adventure</p>
                                    </div>
                                    <div className="text-right">
                                        <ExpandableContent
                                            preset="blur-sm"
                                            stagger
                                            staggerChildren={0.1}
                                            keepMounted={true}
                                            animateIn={{
                                                initial: { opacity: 0, y: 20, rotate: -5 },
                                                animate: { opacity: 1, y: 0, rotate: 0 },
                                                transition: { type: "spring", stiffness: 300, damping: 20 },
                                            }}>
                                            <p className="font-bold">15 stories</p>
                                        </ExpandableContent>
                                    </div>
                                </div>
                                <ExpandableContent
                                    preset="blur-sm"
                                    stagger
                                    staggerChildren={0.1}
                                    keepMounted={true}
                                    animateIn={{
                                        initial: { opacity: 0, y: 20, rotate: -5 },
                                        animate: { opacity: 1, y: 0, rotate: 0 },
                                        transition: { type: "spring", stiffness: 300, damping: 20 },
                                    }}>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between items-center mb-8">
                                            <div className="flex items-center">
                                                <span>Top 5 Authors</span>
                                            </div>
                                            <span>Stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>Rizal</span>
                                            </div>
                                            <span>8 stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>Bonifacio</span>
                                            </div>
                                            <span>3 stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>Luna</span>
                                            </div>
                                            <span>4 stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>Del Pilar</span>
                                            </div>
                                            <span>6 stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>Lopez Jaena</span>
                                            </div>
                                            <span>2 stories</span>
                                        </div>
                                    </div>
                                </ExpandableContent>
                            </ExpandableCardContent>
                            <ExpandableCardFooter>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Last story created: 5 minutes ago
                                </p>
                            </ExpandableCardFooter>
                        </ExpandableCard>
                    </ExpandableTrigger>
                </Expandable> */}
            </div>
        </div>
    );
}

function RowActions() {
    const [open, setOpen] = useState(false);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex justify-end">
                    <Button size="icon" variant="ghost" className="shadow-none" aria-label="Edit item">
                        <EllipsisIcon size={16} aria-hidden="true" />
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Edit</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
