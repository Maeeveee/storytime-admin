"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconUser } from "@tabler/icons-react";
import { useAuthStore } from "@/stores/useAuthStore";


export default function ProfilePage() {
    const { admin } = useAuthStore();

    return (
        <div className="flex h-full w-full flex-col gap-6 p-4 md:p-8">
            <h1 className="text-2xl font-bold">Profile</h1>

            <div className="flex w-full justify-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>View your admin profile details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 py-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                <IconUser className="h-10 w-10 text-neutral-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium">{admin?.name}</h3>
                                <p className="text-sm text-muted-foreground">Admin</p>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={admin?.name || ''} disabled className="bg-muted" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={admin?.email || ''} disabled className="bg-muted" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="joined">Joined</Label>
                            <Input
                                id="joined"
                                value={admin?.created_at ? new Date(admin.created_at).toLocaleDateString() : ''}
                                disabled
                                className="bg-muted text-gray-900"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}