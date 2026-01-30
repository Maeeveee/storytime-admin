"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import {
    CircleXIcon,
    ListFilterIcon,
    PlusIcon,
} from "lucide-react";

export default function FilterCategory() {
    const [searchQuery, setSearchQuery] = useState("");
    const handleClearSearch = () => {
        setSearchQuery("");
    };
    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Input
                        className={cn(
                            "peer min-w-60 ps-9",
                        )}
                        placeholder="Search category..."
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
            </div>
            <div className="flex items-center gap-3">
                <Button className="ml-auto" variant="outline">
                    <PlusIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                    Add user
                </Button>
            </div>
        </div>
    );
}