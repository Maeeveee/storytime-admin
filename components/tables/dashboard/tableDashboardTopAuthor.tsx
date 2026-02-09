import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useState, useEffect } from "react"
import { useApi } from "@/lib/api/ApiProvider";
import { Loader2 } from "lucide-react";

export function TableDashboardTopAuthor() {
    const api = useApi()
    const [users, setUsers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true)
                const response = await api.users.getList({limit: 5})
                setUsers(response.data)
            }catch (err){
                console.error("Failed to fetch users", err)
            }finally{
                setIsLoading(false)
            }
        }
        fetchUsers()
    }, [api])


    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Author</CardTitle>
            </CardHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Author</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Total Stories</TableHead>
                        <TableHead>Total Categories</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                   {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                <Loader2 className="animate-spin" />
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.stories_count}</TableCell>
                                <TableCell>{user.categories_count}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}
