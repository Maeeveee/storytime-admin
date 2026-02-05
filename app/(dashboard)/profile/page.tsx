"use client"
import { useEffect, useState } from "react";
import { Admin } from "@/repositories";
import { useApi } from "@/lib/api/ApiProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconUser } from "@tabler/icons-react";

export default function ProfilePage() {
    const api = useApi();
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAdmin() {
            try {
                setIsLoading(true);
                const response = await api.auth.getProfile();
                setAdmin(response.data);
            } catch (err) {
                console.error("Failed to fetch profile", err);
                setError("Failed to load profile data.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchAdmin();
    }, [api]);

    if (isLoading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900 dark:border-neutral-700 dark:border-t-white"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-full w-full items-center justify-center text-red-500">
                {error}
            </div>
        );
    }

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