"use client"
import TableUserList from "@/components/tables/user/tableUserList";
import { useUserStore } from "@/stores/useUserStore";

export default function CreateUserPage() {
    const {users, isLoading} = useUserStore()


    return (
        isLoading ? (
            <div className="flex items-center justify-center h-screen">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
            </div>
        ) : (
            <div>
                <h1 className="text-2xl font-bold mb-6">User</h1>
                <TableUserList data={users as any} />
            </div>
        )
    );
}
