"use client"
import SidebarLayout from "@/components/layouts/SidebarLayout";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useApi } from "@/lib/api/ApiProvider";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useUserStore } from "@/stores/useUserStore";
import { useStoryStore } from "@/stores/useStoryStore";
import { useDashboardStore } from "@/stores/useDashboardStore";

export default function DashboardLayout({ children, }: { children: React.ReactNode; }) {
    const pathname = usePathname();
    const api = useApi();
    const noLayoutPath = ["/login"];

    const {
        categories,
        setCategories,
        setLoading: setCategoriesLoading,
        setTotalCategories
    } = useCategoryStore();

    const {
        users,
        setUsers,
        setLoading: setUsersLoading,
        setTotalUser
    } = useUserStore();

    const {
        stories,
        setStories,
        setLoading: setStoriesLoading,
        setTotalStories
    } = useStoryStore();

    const {
        summary,
        storiesPerMonth,
        setSummary,
        setStoriesPerMonth,
        setLoading: setDashboardLoading,
        setError: setDashboardError
    } = useDashboardStore();

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
            api.stories.getList({ limit: 100 }).then(res => {
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
            api.users.getList({ limit: 100 }).then(res => {
                setUsers(res.data)
                setTotalUser(res.meta.pagination.total)
            }).catch(err => {
                console.error("Failed to fetch users", err);
            }).finally(() => {
                setUsersLoading(false)
            })
        }
    }, []);

    useEffect(() => {
        if (!summary) {
            setDashboardLoading(true)
            api.dashboard.getSummary().then(res => {
                setSummary(res.data)
            }).catch(err => {
                console.error("Failed to fetch dashboard summary", err);
                setDashboardError(err instanceof Error ? err.message : "Failed to fetch summary")
            }).finally(() => {
                setDashboardLoading(false)
            })
        }
    }, []);

    useEffect(() => {
        if (storiesPerMonth.length === 0) {
            api.dashboard.getOverview().then(res => {
                setStoriesPerMonth(res.data.overview || [])
            }).catch(err => {
                console.error("Failed to fetch dashboard overview", err);
            })
        }
    }, []);

    const shouldHideLayout = noLayoutPath.includes(pathname);

    if (shouldHideLayout) {
        return children;
    }
    return <SidebarLayout>{children}</SidebarLayout>;
}
