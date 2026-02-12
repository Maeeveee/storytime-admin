"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "@/lib/api/ApiProvider";
import type { Story } from "@/repositories";
import { IconArrowLeft, IconCalendar, IconUser, IconCategory, IconEdit, IconTrash } from "@tabler/icons-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function StoryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const api = useApi();
    const slug = params.slug as string;

    const [story, setStory] = useState<Story | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteStory = async () => {
        try {
            await api.stories.delete(story.id);
            router.push("/stories");
        } catch (err) {
            console.error("Error deleting story:", err);
            setError("Failed to delete story");
        }
    };

    useEffect(() => {
        async function fetchStory() {
            if (!slug) return;

            try {
                setIsLoading(true);

                const searchTerm = slug.replace(/-/g, ' ');
                const listResponse = await api.stories.getList({ search: searchTerm });
                const foundStory = listResponse.data.find(s => s.slug === slug);

                if (!foundStory) {
                    setError("Story not found");
                    return;
                }

                const detailResponse = await api.stories.getDetail(foundStory.id);
                setStory(detailResponse.data);

            } catch (err) {
                console.error("Error fetching story:", err);
                setError("Failed to fetch story details");
            } finally {
                setIsLoading(false);
            }
        }

        fetchStory();
    }, [api, slug]);

    if (isLoading) {
        return (
            <div className="mx-auto w-full pb-10">
                <div className="mb-6 flex items-center justify-between">
                    <Link href="/stories">
                        <InteractiveHoverButton direction="left">
                            Back
                        </InteractiveHoverButton>
                    </Link>

                    <Skeleton className="h-9 w-28 rounded-md" />
                </div>

                <div className="mb-10 text-center">
                    <div className="mx-auto max-w-3xl space-y-2 mb-6">
                        <Skeleton className="h-10 w-3/4 mx-auto" />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>

                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>

                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <Skeleton className="h-150 w-full rounded-2xl" />
                    </div>

                    <div className="lg:col-span-7 space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <div className="pt-4 space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-11/12" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !story) {
        return (
            <div className="flex h-96 flex-col items-center justify-center gap-4">
                <p className="text-lg text-red-500">{error || "Story not found"}</p>
                <button
                    onClick={() => router.back()}
                >
                    <InteractiveHoverButton direction="left">
                        Go Back
                    </InteractiveHoverButton>
                </button>
            </div>
        );
    }

    const formattedDate = new Date(story.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="mx-auto w-full pb-10">
            <div className="mb-6 flex items-center justify-between">
                <Link
                    href="/stories">
                    <InteractiveHoverButton direction="left">
                        Back
                    </InteractiveHoverButton>
                </Link>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={handleDeleteStory}
                        className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 dark:bg-white dark:text-neutral-900 dark:hover:bg-gray-200 cursor-pointer"
                    >
                        <IconTrash className="h-4 w-4" />
                        Delete Story
                    </Button>
                    <Link
                        href={`/stories/edit/${story.id}`}
                        className="flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-gray-200"
                    >
                        <IconEdit className="h-4 w-4" />
                        <span>Edit Story</span>
                    </Link>
                </div>
            </div>

            <div className="mb-10 text-center">
                <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-5xl dark:text-white">
                    {story.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                        <IconCalendar className="h-4 w-4" />
                        <span>{formattedDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <img
                            src={story.author.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(story.author.name)}&background=random`}
                            alt={story.author.name}
                            className="h-6 w-6 rounded-full object-cover"
                        />
                        <span>{story.author.name}</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 dark:bg-neutral-800">
                        <IconCategory className="h-4 w-4" />
                        <span>{story.category.name}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <div className="sticky top-6 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                        {story.cover_image ? (
                            <img
                                src={story.cover_image}
                                alt={story.title}
                                className="h-auto w-full object-cover"
                            />
                        ) : (
                            <div className="aspect-[3/4] flex w-full items-center justify-center text-neutral-400">
                                No Cover Image
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-7">
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300"
                        dangerouslySetInnerHTML={{ __html: story.content || '<p class="italic text-neutral-400">No content available</p>' }}
                    />
                </div>
            </div>
        </div>
    );
}
