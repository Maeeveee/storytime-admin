"use client"
import { CardDashbordStats } from "@/components/cards/dashboard/cardDashbordStats";
import { ChartPieDonutText } from "@/components/charts/dashboard/chartDashboardTotalStories";
import { TableDashboardTopAuthor } from "@/components/tables/dashboard/tableDashboardTopAuthor";
import { ChartDashboardGrowth } from "@/components/charts/dashboard/chartDashboardGrowth";
import { BookOpenText } from "lucide-react";
import React from "react";
import { useUserStore } from "@/stores/useUserStore"
import { useStoryStore } from "@/stores/useStoryStore"
import { useDashboardStore } from "@/stores/useDashboardStore"


export default function DashboardPage() {
    const { summary, storiesPerMonth } = useDashboardStore();
    const { users } = useUserStore();
    const { stories } = useStoryStore();

    const growthData = React.useMemo(() => {
        return (storiesPerMonth || []).map(item => ({
            month: item.month,
            stories: item.count,
        }));
    }, [storiesPerMonth]);

    const topAuthor = React.useMemo(() => {
        const authorMap = new Map<number, {
            id: number;
            name: string;
            email: string;
            profile_image: string | undefined;
            stories_count: number;
            categories_count: Set<number>;
        }>();

        stories.forEach(story => {
            const author = story.author;
            if (!authorMap.has(author.id)) {
                const userWithEmail = users.find(u => u.id === author.id);
                authorMap.set(author.id, {
                    id: author.id,
                    name: author.name,
                    profile_image: author.profile_image,
                    email: userWithEmail?.email || '',
                    stories_count: 0,
                    categories_count: new Set()
                });
            }
            const authorData = authorMap.get(author.id)!;
            authorData.stories_count++;
            if (story.category?.id) {
                authorData.categories_count.add(story.category.id);
            }
        });

        return Array.from(authorMap.values())
            .map(a => ({
                ...a,
                categories_count: a.categories_count.size
            }))
            .sort((a, b) => b.stories_count - a.stories_count)
            .slice(0, 5);
    }, [stories, users])

    return (
        <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-3">
                <CardDashbordStats title="Total Stories" content={summary?.total_stories?.toString() ?? "0"} icon={<BookOpenText />} href="stories" />
                <CardDashbordStats title="Total Categories" content={summary?.total_categories?.toString() ?? "0"} icon={<BookOpenText />} href="categories" />
                <CardDashbordStats title="Total Users" content={summary?.total_users?.toString() ?? "0"} icon={<BookOpenText />} href="users" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 mb-3">
                <ChartPieDonutText data={stories.reduce((acc, story) => {
                    const categoryName = story.category?.name || "Uncategorized";
                    const existingCategory = acc.find(item => item.name === categoryName);
                    if (existingCategory) {
                        existingCategory.value += 1;
                    } else {
                        acc.push({ name: categoryName, value: 1 });
                    }
                    return acc;
                }, [] as { name: string; value: number }[])} />
                <TableDashboardTopAuthor data={topAuthor} />
            </div>
            <div className="w-full">
                <ChartDashboardGrowth data={growthData} />
            </div>
        </>
    );
}
