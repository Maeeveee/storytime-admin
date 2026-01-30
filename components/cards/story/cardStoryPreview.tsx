"use client";
import { useState } from "react";
import HoloCard from "@/components/ui/holo-card";
import {
    CircleAlertIcon,
    CircleXIcon,
    Columns3Icon,
    FilterIcon,
    ListFilterIcon,
    PlusIcon,
    TagIcon,
    TrashIcon
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
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
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Item = {
    id: string;
    title: string;
    category: string;
    location: string;
    flag: string;
    status: "Active" | "Inactive" | "Pending";
    balance: number;
};

const statusOptions = [
    { value: "Active", label: "Active", count: 12 },
    { value: "Inactive", label: "Inactive", count: 5 },
    { value: "Pending", label: "Pending", count: 8 },
];

const categoryOptions = [
    { value: "fantasy", label: "Fantasy", count: 15 },
    { value: "romance", label: "Romance", count: 10 },
    { value: "horror", label: "Horror", count: 7 },
    { value: "scifi", label: "Sci-Fi", count: 9 },
    { value: "mystery", label: "Mystery", count: 6 },
    { value: "adventure", label: "Adventure", count: 11 },
    { value: "thriller", label: "Thriller", count: 4 },
    { value: "comedy", label: "Comedy", count: 8 },
];

const initialColumnOptions = [
    { id: "title", label: "Title", visible: true },
    { id: "category", label: "Category", visible: true },
    { id: "author", label: "Author", visible: true },
    { id: "status", label: "Status", visible: true },
    { id: "createdAt", label: "Created At", visible: false },
    { id: "views", label: "Views", visible: false },
];

const dummyStories: Item[] = [
    { id: "1", title: "The Dragon's Quest", category: "Fantasy", location: "Indonesia", flag: "🇮🇩", status: "Active", balance: 1500 },
    { id: "2", title: "Love in Paris", category: "Romance", location: "France", flag: "🇫🇷", status: "Active", balance: 2300 },
    { id: "3", title: "Dark Secrets", category: "Horror", location: "Japan", flag: "🇯🇵", status: "Pending", balance: 890 },
    { id: "4", title: "Galaxy Wars", category: "Sci-Fi", location: "USA", flag: "🇺🇸", status: "Active", balance: 4500 },
    { id: "5", title: "The Lost Artifact", category: "Mystery", location: "UK", flag: "🇬🇧", status: "Inactive", balance: 1200 },
    { id: "6", title: "Mountain Adventure", category: "Adventure", location: "Nepal", flag: "🇳🇵", status: "Active", balance: 3100 },
    { id: "7", title: "Silent Night", category: "Thriller", location: "Germany", flag: "🇩🇪", status: "Pending", balance: 760 },
    { id: "8", title: "Funny Days", category: "Comedy", location: "Australia", flag: "🇦🇺", status: "Active", balance: 2800 },
    { id: "9", title: "The Enchanted Forest", category: "Fantasy", location: "Canada", flag: "🇨🇦", status: "Inactive", balance: 1900 },
    { id: "10", title: "Summer Love", category: "Romance", location: "Brazil", flag: "🇧🇷", status: "Active", balance: 3400 },
];

export default function CardStoryPreview() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
        initialColumnOptions.reduce((acc, col) => ({ ...acc, [col.id]: col.visible }), {})
    );
    const handleStatusChange = (checked: boolean, value: string) => {
        if (checked) {
            setSelectedStatuses([...selectedStatuses, value]);
        } else {
            setSelectedStatuses(selectedStatuses.filter((status) => status !== value));
        }
    };

    const handleCategoryChange = (checked: boolean, value: string) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, value]);
        } else {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
        }
    };

    const handleColumnToggle = (columnId: string, visible: boolean) => {
        setVisibleColumns({ ...visibleColumns, [columnId]: visible });
    };
    const handleClearSearch = () => {
        setSearchQuery("");
    };
    return (
        <div className="space-y-4">
            {/* Filters */}
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

                    {/* Filter by status */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                                Status
                                {selectedStatuses.length > 0 && (
                                    <span className="bg-primary text-primary-foreground -me-1 inline-flex h-5 max-h-full items-center rounded px-1 font-[inherit] text-[0.625rem] font-medium">
                                        {selectedStatuses.length}
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto min-w-44 p-3" align="start">
                            <div className="space-y-3">
                                <div className="text-muted-foreground text-xs font-medium">Filter by Status</div>
                                <div className="space-y-3">
                                    {statusOptions.map((option, i) => (
                                        <div key={option.value} className="flex items-center gap-2">
                                            <Checkbox
                                                id={`status-${i}`}
                                                checked={selectedStatuses.includes(option.value)}
                                                onCheckedChange={(checked: boolean) => handleStatusChange(checked, option.value)}
                                            />
                                            <Label
                                                htmlFor={`status-${i}`}
                                                className="flex grow justify-between gap-2 font-normal cursor-pointer">
                                                {option.label}
                                                <span className="text-muted-foreground ms-2 text-xs">
                                                    {option.count}
                                                </span>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Filter by category */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <TagIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                                Category
                                {selectedCategories.length > 0 && (
                                    <span className="bg-primary text-primary-foreground -me-1 inline-flex h-5 max-h-full items-center rounded px-1 font-[inherit] text-[0.625rem] font-medium">
                                        {selectedCategories.length}
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto min-w-44 p-3" align="start">
                            <div className="space-y-3">
                                <div className="text-muted-foreground text-xs font-medium">Filter by Category</div>
                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                    {categoryOptions.map((option, i) => (
                                        <div key={option.value} className="flex items-center gap-2">
                                            <Checkbox
                                                id={`category-${i}`}
                                                checked={selectedCategories.includes(option.value)}
                                                onCheckedChange={(checked: boolean) => handleCategoryChange(checked, option.value)}
                                            />
                                            <Label
                                                htmlFor={`category-${i}`}
                                                className="flex grow justify-between gap-2 font-normal cursor-pointer">
                                                {option.label}
                                                <span className="text-muted-foreground ms-2 text-xs">
                                                    {option.count}
                                                </span>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Toggle columns visibility */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Columns3Icon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                                View
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {initialColumnOptions.map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={visibleColumns[column.id]}
                                    onCheckedChange={(value) => handleColumnToggle(column.id, value)}
                                    onSelect={(event) => event.preventDefault()}>
                                    {column.label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center gap-3">
                    {/* Add user button */}
                    <Button className="ml-auto" variant="outline">
                        <PlusIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                        Add user
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                {/* <HoloCard
                    data={{
                        name: "Invincible",
                        subtitle: "Im Invincible",
                        description: "A really great story",
                        primaryId: "1",
                        secondaryInfo: "Rizal",
                        backgroundImage: "https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
                        badge: "Fantasy",
                        overlayOpacity: 100,
                    }}
                />
                <HoloCard
                data={{
                    name: "Invincible",
                    subtitle: "Im Invincible",
                    description: "A really great story",
                    primaryId: "1",
                    secondaryInfo: "glistening",
                    backgroundImage: "https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
                    badge: "Fantasy",
                    overlayOpacity: 100,
                }}
            />
            <HoloCard
                data={{
                    name: "Invincible",
                    subtitle: "Im Invincible",
                    description: "A really great story",
                    primaryId: "1",
                    secondaryInfo: "glistening",
                    backgroundImage: "https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
                    badge: "Fantasy",
                    overlayOpacity: 100,
                }}
            />
            <HoloCard
                data={{
                    name: "Invincible",
                    subtitle: "Im Invincible",
                    description: "A really great story",
                    primaryId: "1",
                    secondaryInfo: "glistening",
                    backgroundImage: "https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
                    badge: "Fantasy",
                    overlayOpacity: 100,
                }}
            />
            <HoloCard
                data={{
                    name: "Invincible",
                    subtitle: "Im Invincible",
                    description: "A really great story",
                    primaryId: "1",
                    secondaryInfo: "glistening",
                    backgroundImage: "https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
                    badge: "Fantasy",
                    overlayOpacity: 100,
                }}
            />
            <HoloCard
                data={{
                    name: "Invincible",
                    subtitle: "Im Invincible",
                    description: "A really great story",
                    primaryId: "1",
                    secondaryInfo: "glistening",
                    backgroundImage: "https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
                    badge: "Fantasy",
                    overlayOpacity: 100,
                }}
            /> */}
            </div>
        </div>
    );
}