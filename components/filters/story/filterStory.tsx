"use client";
import { useState } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Textarea } from "@/components/ui/textarea";
import {
    CircleXIcon,
    ListFilterIcon,
    Loader2Icon,
    PlusIcon,
    TagIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useApi } from "@/lib/api/ApiProvider";
import { toast } from "sonner";

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
    onStoryCreated?: () => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
}

export default function FilterStory({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    onStoryCreated,
    sortBy,
    setSortBy,
}: FilterStoryProps) {
    const api = useApi();

    // Sheet open state
    const [sheetOpen, setSheetOpen] = useState(false);

    // Form state
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCategoryChange = (value: string) => {
        if (selectedCategory === value) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(value);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    const resetForm = () => {
        setTitle("");
        setContent("");
        setCategoryId("");
    };

    const handleSubmit = async () => {
        // Validate
        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }
        if (!content.trim()) {
            toast.error("Content is required");
            return;
        }
        if (!categoryId) {
            toast.error("Please select a category");
            return;
        }

        try {
            setIsSubmitting(true);
            await api.stories.create({
                title: title.trim(),
                content: content.trim(),
                category_id: parseInt(categoryId),
                user_id: 1,
            });

            toast.success("Story created successfully!");
            resetForm();
            setSheetOpen(false);
            onStoryCreated?.();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to create story");
        } finally {
            setIsSubmitting(false);
        }
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
                <Sheet open={sheetOpen} onOpenChange={(open) => {
                    setSheetOpen(open);
                    if (!open) resetForm();
                }}>
                    <SheetTrigger asChild>
                        <Button className="ml-auto" variant="outline">
                            <PlusIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                            Add Story
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Add Story</SheetTitle>
                            <SheetDescription>
                                Add a new story to the list.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <div className="grid gap-3">
                                <Label htmlFor="sheet-story-title">Story Title</Label>
                                <Input
                                    id="sheet-story-title"
                                    placeholder="Enter story title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="sheet-story-content">Story Content</Label>
                                <Textarea
                                    id="sheet-story-content"
                                    placeholder="Enter story content..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    disabled={isSubmitting}
                                    rows={6}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="sheet-story-category">Category</Label>
                                <Select
                                    value={categoryId}
                                    onValueChange={setCategoryId}
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger className="w-full" id="sheet-story-category">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <SheetFooter>
                                <Button onClick={handleSubmit} disabled={isSubmitting}>
                                    {isSubmitting && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                                    {isSubmitting ? "Adding..." : "Add"}
                                </Button>
                                <SheetClose asChild>
                                    <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
                                </SheetClose>
                            </SheetFooter>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}