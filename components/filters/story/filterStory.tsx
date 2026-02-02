"use client";
import {
    CircleXIcon,
    Columns3Icon,
    ListFilterIcon,
    PlusIcon,
    TagIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";

interface CategoryOption {
    id: number;
    name: string;
}

interface FilterStoryProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    categories: CategoryOption[];
}

export default function FilterStory({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
}: FilterStoryProps) {
    const handleCategoryChange = (value: string) => {
        if (selectedCategory === value) {
            setSelectedCategory(null); // Deselect if already selected
        } else {
            setSelectedCategory(value);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                {/* Filter by title */}
                <div className="relative">
                    <Input
                        className={cn(
                            "peer min-w-60 ps-9",
                        )}
                        placeholder="Search story title..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Filter by title"
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                        <ListFilterIcon size={16} aria-hidden="true" />
                    </div>
                    {searchQuery && (
                        <button
                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Clear filter"
                            onClick={handleClearSearch}>
                            <CircleXIcon size={16} aria-hidden="true" />
                        </button>
                    )}
                </div>

                {/* Filter by category */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            <TagIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                            Category
                            {selectedCategory && (
                                <span className="bg-primary text-primary-foreground -me-1 inline-flex h-5 max-h-full items-center rounded px-1 font-[inherit] text-[0.625rem] font-medium">
                                    1
                                </span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto min-w-44 p-3" align="start">
                        <div className="space-y-3">
                            <div className="text-muted-foreground text-xs font-medium">Filter by Category</div>
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center gap-2">
                                        <Checkbox
                                            id={`category-${category.id}`}
                                            checked={selectedCategory === category.id.toString()}
                                            onCheckedChange={() => handleCategoryChange(category.id.toString())}
                                        />
                                        <Label
                                            htmlFor={`category-${category.id}`}
                                            className="flex grow justify-between gap-2 font-normal cursor-pointer">
                                            {category.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

            </div>
            <div className="flex items-center gap-3">
                {/* Create Story Button */}
                <Link href="/stories/create">
                    <Button className="ml-auto" variant="outline">
                        <PlusIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                        Create Story
                    </Button>
                </Link>
            </div>
        </div>);
}