"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "@/lib/api/ApiProvider";
import type { Story } from "@/repositories";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { IconArrowLeft, IconCalendar, IconUser, IconCategory, IconCheck, IconUpload, IconLoader2 } from "@tabler/icons-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function EditStoryPage() {
    const params = useParams();
    const router = useRouter();
    const api = useApi();
    const id = Number(params.id);
    const { categories } = useCategoryStore();

    const [story, setStory] = useState<Story | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Editable fields
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        async function fetchStory() {
            if (!id) return;

            try {
                setIsLoading(true);
                const detailResponse = await api.stories.getDetail(id);
                const storyData = detailResponse.data;
                setStory(storyData);

                // Initialize editable fields
                setTitle(storyData.title);
                setContent(storyData.content || "");
                setCategoryId(storyData.category?.id?.toString() || "");
                setCoverPreview(storyData.cover_image || null);
            } catch (err) {
                console.error("Error fetching story:", err);
                setError("Failed to fetch story details");
            } finally {
                setIsLoading(false);
            }
        }

        fetchStory();
    }, [api, id]);

    const handleSave = async () => {
        if (!story) return;
        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }

        try {
            setIsSaving(true);

            // Update story data
            await api.stories.update(story.id, {
                title: title.trim(),
                content: content,
                category_id: categoryId ? parseInt(categoryId) : undefined,
            });

            // Upload cover image if changed
            if (coverFile) {
                const formData = new FormData();
                formData.append("cover_image", coverFile);
                await api.stories.updateCover(story.id, formData);
            }

            toast.success("Story updated successfully!");
            router.push(`/stories/${story.slug}`);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update story");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        const file = e.target.files[0];
        setCoverFile(file);
        setCoverPreview(URL.createObjectURL(file));
    };

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
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <Skeleton className="h-150 w-full rounded-2xl" />
                    </div>
                    <div className="lg:col-span-7 space-y-4">
                        {[...Array(8)].map((_, i) => (
                            <Skeleton key={i} className="h-4 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !story) {
        return (
            <div className="flex h-96 flex-col items-center justify-center gap-4">
                <p className="text-lg text-red-500">{error || "Story not found"}</p>
                <button onClick={() => router.back()}>
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
                <Link href={`/stories/${story.slug}`}>
                    <InteractiveHoverButton direction="left">
                        Cancel
                    </InteractiveHoverButton>
                </Link>

                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2"
                >
                    {isSaving ? (
                        <IconLoader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <IconCheck className="h-4 w-4" />
                    )}
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </div>

            {/* Title - editable */}
            <div className="mb-10 text-center">
                <div className="mx-auto max-w-3xl mb-4">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-center text-3xl md:text-5xl font-bold border-none shadow-none bg-transparent focus-visible:ring-1 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-600 h-auto py-2"
                        placeholder="Story title..."
                    />
                </div>

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

                    {/* Category - editable */}
                    <Select value={categoryId} onValueChange={setCategoryId}>
                        <SelectTrigger className="w-auto gap-2 rounded-full bg-gray-100 border-none px-3 py-1 h-auto dark:bg-neutral-800">
                            <IconCategory className="h-4 w-4" />
                            <SelectValue placeholder="Select category" />
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
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Cover image - editable */}
                <div className="lg:col-span-5">
                    <div
                        className="group sticky top-6 relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {coverPreview ? (
                            <img
                                src={coverPreview}
                                alt={title}
                                className="h-auto w-full object-cover transition-opacity group-hover:opacity-75"
                            />
                        ) : (
                            <div className="aspect-[3/4] flex w-full items-center justify-center text-neutral-400">
                                No Cover Image
                            </div>
                        )}

                        {/* Upload overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2 text-white">
                                <IconUpload className="h-8 w-8" />
                                <span className="text-sm font-medium">Change Cover</span>
                            </div>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCoverSelect}
                        />
                    </div>
                </div>

                {/* Content - editable */}
                <div className="lg:col-span-7">
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[500px] w-full resize-none border-none shadow-none bg-transparent text-base leading-relaxed text-neutral-700 dark:text-neutral-300 focus-visible:ring-1 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-600"
                        placeholder="Write your story content here..."
                    />
                </div>
            </div>
        </div>
    );
}
