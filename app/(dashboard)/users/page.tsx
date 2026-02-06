"use client"
import TableUserList from "@/components/tables/user/tableUserList";
import { useApi } from "@/lib/api/ApiProvider";
import { useState, useEffect } from "react";

export default function CreateUserPage() {
    const api = useApi();
    const [users, setUsers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchUser(){
            try {
                const response = await api.users.getList()
                setUsers(response.data)
            }catch(err){
                console.error("Failed to fetch users", err)
            }finally{
                setIsLoading(false)
            }
        }
        fetchUser()
    }, [api])
    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">User</h1>
            <TableUserList data={users} />
        </div>
    );
}
