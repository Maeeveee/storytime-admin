import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CardDashbordStats = ({ title, content, icon }: { title: React.ReactNode; content: React.ReactNode; icon: React.ReactNode }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
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
	);
};
