"use client";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { link } from "fs";
import Link from "next/link";

export interface StoryCardData {
    id: number | string;
    slug: string;
    title: string;
    coverImage: string | null;
    contentPreview: string;
    createdAt: string;
    author: {
        id: number | string;
        name: string;
        avatar?: string | null;
    };
    category?: {
        id: number | string;
        name: string;
        slug: string;
    };
}

interface StoryCardProps {
    story: StoryCardData;
}

export function StoryCard({ story }: StoryCardProps) {
    const formattedDate = new Date(story.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const defaultCover = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop";

    return (
        <Link href={`/stories/${story.slug}`}>
            <FollowerPointerCard
                title={
                    <TitleComponent
                        title={story.author.name}
                        avatar={story.author.avatar}
                    />
                }
                className="h-full w-full"
            >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition duration-200 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
                    <div className="relative h-48 w-full shrink-0 overflow-hidden bg-gray-100">
                        <img
                            src={story.coverImage || defaultCover}
                            alt={story.title}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                        {story.category && (
                            <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                {story.category.name}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                        <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                            {story.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm text-neutral-600 dark:text-neutral-300">
                            {story.contentPreview}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-4">
                            <div className="flex items-center gap-2">
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {formattedDate}
                                </p>
                            </div>

                            <InteractiveHoverButton>
                                Read more
                            </InteractiveHoverButton>
                        </div>
                    </div>
                </div>
            </FollowerPointerCard>
        </Link>
    );
}

function TitleComponent({
    title,
    avatar,
}: {
    title: string;
    avatar?: string | null;
}) {
    return (
        <div className="flex items-center gap-2">
            <img
                src={avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=random&size=24`}
                alt={title}
                className="h-5 w-5 rounded-full border-2 border-white object-cover"
            />
            <span className="text-sm font-medium">{title}</span>
        </div>
    );
}

export default StoryCard;
