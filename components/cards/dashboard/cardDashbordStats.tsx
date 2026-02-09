import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const CardDashbordStats = ({ title, content, icon, href }: { title: React.ReactNode; content: React.ReactNode; icon: React.ReactNode; href: string }) => {
	return (
		<Link href={`/${href}`}>
			<Card className="hover:scale-103 transition-all duration-300">
				<CardHeader>
					<div className="flex flex-row justify-between items-center">
						<CardTitle>{title}</CardTitle>
						<ArrowUpRight />
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-2xl font-bold">{content}</p>
						</div>
						<div>
							{icon}
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
