"use client"
import TableUserList from "@/components/tables/user/tableUserList";
import { useUserStore } from "@/stores/useUserStore";
import { useApi } from "@/lib/api/ApiProvider";
import { useEffect, useCallback } from "react";

export default function CreateUserPage() {
    const { users, isLoading, setUsers, setLoading } = useUserStore();
    const api = useApi();

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.users.getList({ limit: 100 });
            setUsers(res.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    }, [api, setUsers, setLoading]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        isLoading ? (
            <div className="flex items-center justify-center h-screen">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
            </div>
        ) : (
            <div>
                <h1 className="text-2xl font-bold mb-6">User</h1>
                <TableUserList data={users} onRefresh={fetchUsers} />
            </div>
        )
    );
}
