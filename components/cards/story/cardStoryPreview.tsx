"use client";
import { useEffect, useState, useCallback } from "react";
import { StoryCard, type StoryCardData } from "@/components/cards/story/StoryCard";
import FilterStory from "@/components/filters/story/filterStory";
import { useApi } from "@/lib/api/ApiProvider";
import type { Story, Category } from "@/repositories";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStoryStore } from "@/stores/useStoryStore";
import { useCategoryStore } from "@/stores/useCategoryStore";

export default function CardStoryPreview() {
    const { stories: globalStories, isLoading: isGlobalLoading } = useStoryStore()
    const { categories } = useCategoryStore()
    const api = useApi();

    const [displayStories, setDisplayStories] = useState<StoryCardData[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState<any>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const handleCategoryChange = (val: string | null) => {
        setSelectedCategoryId(val);
        setCurrentPage(1);
    };

    const transformStories = useCallback((data: Story[]) => {
        return data.map((story: Story) => {
            let contentPreview = "";
            if (story.content_preview) {
                contentPreview = story.content_preview;
            } else if (story.content && typeof story.content === 'string') {
                contentPreview = story.content.substring(0, 150) + (story.content.length > 150 ? "..." : "");
            }

            return {
                id: story.id,
                slug: story.slug,
                title: story.title,
                coverImage: story.cover_image || null,
                contentPreview,
                createdAt: story.created_at,
                author: {
                    id: story.author.id,
                    name: story.author.name,
                    avatar: story.author.profile_image || null,
                },
                category: story.category ? {
                    id: story.category.id,
                    name: story.category.name,
                    slug: story.category.slug,
                } : undefined,
            } as StoryCardData;
        });
    }, []);

    useEffect(() => {
        const hasFilter = debouncedSearch || selectedCategoryId;

        if (!hasFilter) {
            if (globalStories.length > 0) {
                const ITEMS_PER_PAGE = 12;
                const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
                const endIndex = startIndex + ITEMS_PER_PAGE;
                const paginatedStories = globalStories.slice(startIndex, endIndex);

                setDisplayStories(transformStories(paginatedStories));
                setMeta({
                    pagination: {
                        current_page: currentPage,
                        last_page: Math.ceil(globalStories.length / ITEMS_PER_PAGE),
                        total: globalStories.length,
                        per_page: ITEMS_PER_PAGE
                    }
                });
                setIsLoading(false);
            } else if (isGlobalLoading) {
                setIsLoading(true);
            }
            return;
        }

        async function fetchFilteredStories() {
            try {
                setIsLoading(true);
                const params: any = {
                    limit: 12,
                    page: currentPage
                };
                if (debouncedSearch) params.search = debouncedSearch;
                if (selectedCategoryId) params.category_id = parseInt(selectedCategoryId);

                const response = await api.stories.getList(params);

                if (response.meta) {
                    setMeta(response.meta);
                }

                setDisplayStories(transformStories(response.data));
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch stories");
            } finally {
                setIsLoading(false);
            }
        }

        fetchFilteredStories();
    }, [api, debouncedSearch, selectedCategoryId, currentPage, globalStories, isGlobalLoading, transformStories]);

    if (error) {
        return (
            <div className="space-y-6">
                <FilterStory
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategoryId}
                    setSelectedCategory={handleCategoryChange}
                    categories={categories}
                />
                <div className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <FilterStory
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategoryId}
                setSelectedCategory={handleCategoryChange}
                categories={categories}
            />

            {isLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-neutral-700" />
                    ))}
                </div>
            ) : displayStories.length === 0 ? (
                <div className="rounded-lg bg-gray-50 p-8 text-center text-gray-500 dark:bg-neutral-800 dark:text-neutral-400">
                    No stories found
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {displayStories.map((story) => (
                            <StoryCard key={story.id} story={story} />
                        ))}
                    </div>

                    {meta && meta.pagination.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-neutral-200 pt-4 dark:border-neutral-700 mb-4">
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                Page {meta.pagination.current_page} of {meta.pagination.last_page}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1 || isLoading}
                                >
                                    <ChevronLeft className="mr-1 h-4 w-4" />
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    disabled={currentPage >= meta.pagination.last_page || isLoading}
                                >
                                    Next
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}