import { Badge } from "@/components/ui/badge";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
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

import { Loader2 } from "lucide-react";

export function TableDashboardTopAuthor({ data }: { data?:{ id: number; name: string; email: string; profile_image: string | undefined; stories_count: number; categories_count: number }[] }) {
    const displayedData = data?.slice(0, 5) || [];
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
                   {displayedData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                <Loader2 className="animate-spin" />
                            </TableCell>
                        </TableRow>
                    ) : (
                        displayedData.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarImage src={user.profile_image} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {user.name}
                                    </div>
                                </TableCell>
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
