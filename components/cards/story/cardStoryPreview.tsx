"use client";
import { useState } from "react";
import HoloCard from "@/components/ui/holo-card";
import FilterStory from "@/components/filters/story/filterStory";

type Item = {
    id: string;
    title: string;
    category: string;
    location: string;
    flag: string;
    status: "Active" | "Inactive" | "Pending";
    balance: number;
};

export default function CardStoryPreview() {
    return (
        <div className="space-y-4">
            <FilterStory />
            <div className="flex flex-wrap gap-4">
                <HoloCard
                    data={{
                        name: "Invincible",
                        subtitle: "Im Invincible",
                        description: "A really great story",
                        primaryId: "1",
                        secondaryInfo: "Rizal",
                        backgroundImage: "https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
                        badge: "Fantasy",
                        overlayOpacity: 100,
                    }}
                />
                {/* 
                <HoloCard
                data={{
                    name: "Invincible",
                    subtitle: "Im Invincible",
                    description: "A really great story",
                    primaryId: "1",
                    secondaryInfo: "glistening",
                    backgroundImage: "https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
                    badge: "Fantasy",
                    overlayOpacity: 100,
                }}
            />
            <HoloCard
                data={{
                    name: "Invincible",
                    subtitle: "Im Invincible",
                    description: "A really great story",
                    primaryId: "1",
                    secondaryInfo: "glistening",
                    backgroundImage: "https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
                    badge: "Fantasy",
                    overlayOpacity: 100,
                }}
            />
            <HoloCard
                data={{
                    name: "Invincible",
                    subtitle: "Im Invincible",
                    description: "A really great story",
                    primaryId: "1",
                    secondaryInfo: "glistening",
                    backgroundImage: "https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
                    badge: "Fantasy",
                    overlayOpacity: 100,
                }}
            />
            <HoloCard
                data={{
                    name: "Invincible",
                    subtitle: "Im Invincible",
                    description: "A really great story",
                    primaryId: "1",
                    secondaryInfo: "glistening",
                    backgroundImage: "https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
                    badge: "Fantasy",
                    overlayOpacity: 100,
                }}
            />
            <HoloCard
                data={{
                    name: "Invincible",
                    subtitle: "Im Invincible",
                    description: "A really great story",
                    primaryId: "1",
                    secondaryInfo: "glistening",
                    backgroundImage: "https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
                    badge: "Fantasy",
                    overlayOpacity: 100,
                }}
            /> */}
            </div>
        </div>
    );
}