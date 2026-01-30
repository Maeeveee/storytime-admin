"use client";
import FilterCategory from "@/components/filters/category/filterCategory";
import { Trash2Icon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { EllipsisIcon } from "lucide-react"
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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const categoryList = [
    {
        id: 1,
        name: "Fantasy",
        stories: 15,
        authors: [
            {
                id: 1,
                name: "John Doe",
                stories: 5,
            },
            {
                id: 2,
                name: "Jane Doe",
                stories: 3,
            },
            {
                id: 3,
                name: "Bob Smith",
                stories: 2,
            },
            {
                id: 4,
                name: "Alice Johnson",
                stories: 4,
            },
            {
                id: 5,
                name: "Mike Brown",
                stories: 1,
            },
        ],
    },
    {
        id: 2,
        name: "Sci-Fi",
        stories: 10,
        authors: [
            {
                id: 1,
                name: "John Doe",
                stories: 5,
            },
            {
                id: 2,
                name: "Jane Doe",
                stories: 3,
            },
            {
                id: 3,
                name: "Bob Smith",
                stories: 2,
            },
            {
                id: 4,
                name: "Jane Doe",
                stories: 3,
            },
            {
                id: 5,
                name: "Bob Smith",
                stories: 2,
            },
        ],
    },
    {
        id: 3,
        name: "Mystery",
        stories: 8,
        authors: [{
            id: 1,
            name: "John Doe",
            stories: 5,
        },
        {
            id: 2,
            name: "Jane Doe",
            stories: 3,
        },
        {
            id: 3,
            name: "Bob Smith",
            stories: 2,
        },
        {
            id: 4,
            name: "Jane Doe",
            stories: 3,
        },
        {
            id: 5,
            name: "Bob Smith",
            stories: 2,
        },
        ],
    },
    {
        id: 4,
        name: "Thriller",
        stories: 12,
        authors: [
            {
                id: 1,
                name: "John Doe",
                stories: 5,
            },
            {
                id: 2,
                name: "Jane Doe",
                stories: 3,
            },
            {
                id: 3,
                name: "Bob Smith",
                stories: 2,
            },
            {
                id: 4,
                name: "Jane Doe",
                stories: 2,
            },
            {
                id: 5,
                name: "Bob Smith",
                stories: 1,
            },
        ],
    },
    {
        id: 5,
        name: "Romance",
        stories: 20,
        authors: [
            {
                id: 1,
                name: "John Doe",
                stories: 5,
            },
            {
                id: 2,
                name: "Jane Doe",
                stories: 3,
            },
            {
                id: 3,
                name: "Bob Smith",
                stories: 2,
            },
            {
                id: 4,
                name: "Jane Doe",
                stories: 3,
            },
            {
                id: 5,
                name: "Bob Smith",
                stories: 5,
            },
        ],
    },
    {
        id: 6,
        name: "Horror",
        stories: 20,
        authors: [
            {
                id: 1,
                name: "John Doe",
                stories: 5,
            },
            {
                id: 2,
                name: "Jane Doe",
                stories: 3,
            },
            {
                id: 3,
                name: "Bob Smith",
                stories: 2,
            },
            {
                id: 4,
                name: "Jane Doe",
                stories: 3,
            },
            {
                id: 5,
                name: "Bob Smith",
                stories: 5,
            },
        ],
    },
];


export default function CardCategoryList() {
    return (
        <div className="space-y-4">
            <FilterCategory />
            <div className='flex flex-wrap justify-start gap-4'>
              {categoryList.map((category, index) => (
                  <Expandable key={category.id} expandDirection="both" expandBehavior="replace">
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
                                        <p className="text-xl font-bold">{category.name}</p>
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
                                                <p className="font-bold">{category.stories} Stories</p>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button>
                                                                <RowActions />
                                                            </button>
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
                                                <span>{category.authors[0].name}</span>
                                            </div>
                                            <span>{category.authors[0].stories} stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>{category.authors[1].name}</span>
                                            </div>
                                            <span>{category.authors[1].stories} stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>{category.authors[2].name}</span>
                                            </div>
                                            <span>{category.authors[2].stories} stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>{category.authors[3].name}</span>
                                            </div>
                                            <span>{category.authors[3].stories} stories</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <span>{category.authors[4].name}</span>
                                            </div>
                                            <span>{category.authors[4].stories} stories</span>
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
              ))}
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
                    <Button size="icon" variant="ghost" className="shadow-none border-1" aria-label="Edit item">
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
                                <DropdownMenuItem>
                                    <Dialog>
                                        <form>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost">Edit Profile</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit profile</DialogTitle>
                                                    <DialogDescription>
                                                        Make changes to your profile here. Click save when you&apos;re
                                                        done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4">
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="name-1">Name</Label>
                                                        <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                                                    </div>
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="username-1">Username</Label>
                                                        <Input id="username-1" name="username" defaultValue="@peduarte" />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </form>
                                    </Dialog>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Dialog>
                                        <form>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost">Reset Password</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Reset Password</DialogTitle>
                                                    <DialogDescription>
                                                        Make changes to your profile here. Click save when you&apos;re
                                                        done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4">
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="name-1">Name</Label>
                                                        <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                                                    </div>
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="username-1">Username</Label>
                                                        <Input id="username-1" name="username" defaultValue="@peduarte" />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </form>
                                    </Dialog>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <span className="text-destructive">Delete category</span>
                        </AlertDialogTrigger>
                        <AlertDialogContent size="sm">
                            <AlertDialogHeader>
                                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                    <Trash2Icon />
                                </AlertDialogMedia>
                                <AlertDialogTitle>Delete category?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete this category
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                                <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
