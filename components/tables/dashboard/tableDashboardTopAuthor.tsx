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

export function TableDashboardTopAuthor() {
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
                    <TableRow>
                        <TableCell className="font-medium">Website Redesign</TableCell>
                        <TableCell>
                            <Badge variant="outline">
                                <span
                                    aria-hidden="true"
                                    className="size-1.5 rounded-full bg-emerald-500"
                                />
                                Paid
                            </Badge>
                        </TableCell>
                        <TableCell>Frontend Team</TableCell>
                        <TableCell>$12,500</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Mobile App</TableCell>
                        <TableCell>
                            <Badge variant="outline">
                                <span
                                    aria-hidden="true"
                                    className="size-1.5 rounded-full bg-muted-foreground/64"
                                />
                                Unpaid
                            </Badge>
                        </TableCell>
                        <TableCell>Mobile Team</TableCell>
                        <TableCell>$8,750</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">API Integration</TableCell>
                        <TableCell>
                            <Badge variant="outline">
                                <span
                                    aria-hidden="true"
                                    className="size-1.5 rounded-full bg-amber-500"
                                />
                                Pending
                            </Badge>
                        </TableCell>
                        <TableCell>Backend Team</TableCell>
                        <TableCell>$5,200</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Database Migration</TableCell>
                        <TableCell>
                            <Badge variant="outline">
                                <span
                                    aria-hidden="true"
                                    className="size-1.5 rounded-full bg-emerald-500"
                                />
                                Paid
                            </Badge>
                        </TableCell>
                        <TableCell>DevOps Team</TableCell>
                        <TableCell>$3,800</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">User Dashboard</TableCell>
                        <TableCell>
                            <Badge variant="outline">
                                <span
                                    aria-hidden="true"
                                    className="size-1.5 rounded-full bg-emerald-500"
                                />
                                Paid
                            </Badge>
                        </TableCell>
                        <TableCell>UX Team</TableCell>
                        <TableCell>$7,200</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
}
