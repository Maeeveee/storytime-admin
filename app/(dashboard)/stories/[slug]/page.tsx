"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "@/lib/api/ApiProvider";
import type { Story } from "@/repositories";
import { IconArrowLeft, IconCalendar, IconUser, IconCategory, IconEdit } from "@tabler/icons-react";
import Link from "next/link";

export default function StoryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const api = useApi();
    const slug = params.slug as string;

    const [story, setStory] = useState<Story | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStory() {
            if (!slug) return;

            try {
                setIsLoading(true);

                const listResponse = await api.stories.getList({ search: slug });
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
            <div className="flex h-96 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-800 dark:border-neutral-700 dark:border-t-white"></div>
            </div>
        );
    }

    if (error || !story) {
        return (
            <div className="flex h-96 flex-col items-center justify-center gap-4">
                <p className="text-lg text-red-500">{error || "Story not found"}</p>
                <button
                    onClick={() => router.back()}
                    className="rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
                >
                    Go Back
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
        <div className="mx-auto pb-10">
            <div className="mb-6 flex items-center justify-between">
                <Link
                    href="/stories"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                    <IconArrowLeft className="h-5 w-5" />
                </Link>

                <Link
                    href={`/stories/edit/${story.id}`}
                    className="flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-gray-200"
                >
                    <IconEdit className="h-4 w-4" />
                    <span>Edit Story</span>
                </Link>
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
