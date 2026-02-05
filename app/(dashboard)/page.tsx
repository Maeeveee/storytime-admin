"use client"
import { CardDashbordStats } from "@/components/cards/dashboard/cardDashbordStats";
import { ChartPieDonutText } from "@/components/charts/dashboard/chartDashboardTotalStories";
import { TableDashboardTopAuthor } from "@/components/tables/dashboard/tableDashboardTopAuthor";
import { ChartDashboardGrowth } from "@/components/charts/dashboard/chartDashboardGrowth";
import { BookOpenText } from "lucide-react";
import { useApi } from "@/lib/api/ApiProvider";
import { useState, useEffect } from "react";
import { Category, Story } from "@/repositories";


export default function DashboardPage() {
    const api = useApi();
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [stories, setStories] = useState<Story[]>([]);
    const [totalStories, setTotalStories] = useState(0)
    const [totalCategories, setTotalCategories] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCategories() {
            try {
                setIsLoading(true)
                const response = await api.categories.getList()
                setCategories(response.data.map(cat => ({ id: cat.id, name: cat.name })));
                setTotalCategories(response.meta.pagination.total)
            } catch (err) {
                console.error("Failed to fetch categories", err);
            } finally {
                setIsLoading(false)
            }
        }
        fetchCategories();
    }, [api])

    useEffect(() => {
        async function fetchStories() {
            try {
                setIsLoading(true)
                const response = await api.stories.getList()
                setStories(response.data)
                setTotalStories(response.meta.pagination.total)
            } catch (err) {
                console.error("Failed to fetch stories", err);
            } finally {
                setIsLoading(false)
            }
        }
        fetchStories();
    }, [api])

    useEffect(() => {
        async function fetchUser() {
            try {
                setIsLoading(true)
                const response = await api.users.getList()
                setTotalUsers(response.meta.pagination.total)
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setIsLoading(false)
            }
        }
        fetchUser();
    }, [api]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-pulse rounded-full h-32 w-32 border-2 border-primary"></div>
            </div>
        )
    }
    return (
        <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-3">
                <CardDashbordStats title="Total Stories" content={totalStories.toString()} icon={<BookOpenText />} />
                <CardDashbordStats title="Total Categories" content={totalCategories.toString()} icon={<BookOpenText />} />
                <CardDashbordStats title="Total Users" content={totalUsers.toString()} icon={<BookOpenText />} />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 mb-3">
                <ChartPieDonutText />
                <TableDashboardTopAuthor />
            </div>
            <div className="w-full">
                <ChartDashboardGrowth />
            </div>
        </>
    );
}
