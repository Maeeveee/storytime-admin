"use client"
import { CardDashbordStats } from "@/components/cards/dashboard/cardDashbordStats";
import { ChartPieDonutText } from "@/components/charts/dashboard/chartDashboardTotalStories";
import { TableDashboardTopAuthor } from "@/components/tables/dashboard/tableDashboardTopAuthor";
import { ChartDashboardGrowth } from "@/components/charts/dashboard/chartDashboardGrowth";
import { BookOpenText } from "lucide-react";
import { useApi } from "@/lib/api/ApiProvider";
import React, { useState, useEffect } from "react";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useUserStore } from "@/stores/useUserStore"
import { useStoryStore } from "@/stores/useStoryStore"


export default function DashboardPage() {
    const api = useApi();

    const {
        categories,
        setCategories,
        setLoading: setCategoriesLoading,
        totalCategories,
        setTotalCategories
    } = useCategoryStore();

    const {
        users,
        setUsers,
        setLoading: setUsersLoading,
        totalUsers,
        setTotalUser
    } = useUserStore();

    const {
        stories,
        setStories,
        setLoading: setStoriesLoading,
        totalStories,
        setTotalStories
    } = useStoryStore();

    useEffect(() => {
        if (categories.length === 0) {
            setCategoriesLoading(true)
            api.categories.getList({ limit: 100 }).then(res => {
                setCategories(res.data)
                setTotalCategories(res.meta.pagination.total)
            }).finally(() => {
                setCategoriesLoading(false)
            })
        }
    }, [])

    useEffect(() => {
        if (stories.length === 0) {
            setStoriesLoading(true)
            api.stories.getList({ limit: 10000 }).then(res => {
                setStories(res.data)
                setTotalStories(res.meta.pagination.total)
            }).catch(err => {
                console.error("Failed to fetch stories", err);
            }).finally(() => {
                setStoriesLoading(false)
            })
        }
    }, [])

    useEffect(() => {
        if (users.length === 0) {
            setUsersLoading(true)
            api.users.getList({ limit: 10000 }).then(res => {
                setUsers(res.data)
                setTotalUser(res.meta.pagination.total)
            }).catch(err => {
                console.error("Failed to fetch users", err);
            }).finally(() => {
                setUsersLoading(false)
            })
        }
    }, []);

    const growthData = React.useMemo(() => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const currentDate = new Date();
        const last12Months: { month: string; year: number; monthIndex: number; users: number; stories: number }[] = [];
        for (let i = 11; i >= 0; i--) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            last12Months.push({
                month: months[date.getMonth()],
                year: date.getFullYear(),
                monthIndex: date.getMonth(),
                users: 0,
                stories: 0
            });
        }

        stories.forEach(story => {
            const date = new Date(story.created_at);
            const monthData = last12Months.find(m => m.monthIndex === date.getMonth() && m.year === date.getFullYear());
            if (monthData) {
                monthData.stories++;
            }
        });

        users.forEach(user => {
            const date = new Date(user.created_at);
            const monthData = last12Months.find(m => m.monthIndex === date.getMonth() && m.year === date.getFullYear());
            if (monthData) {
                monthData.users++;
            }
        });

        return last12Months;
    }, [stories, users]);

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
                <CardDashbordStats title="Total Stories" content={totalStories.toString()} icon={<BookOpenText />} href="stories" />
                <CardDashbordStats title="Total Categories" content={totalCategories.toString()} icon={<BookOpenText />} href="categories" />
                <CardDashbordStats title="Total Users" content={totalUsers.toString()} icon={<BookOpenText />} href="users" />
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
