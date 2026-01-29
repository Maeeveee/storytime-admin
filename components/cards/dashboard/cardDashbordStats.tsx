import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CardDashbordStats = ({ title, content }: { title: React.ReactNode; content: React.ReactNode }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>{content}</CardContent>
		</Card>
	);
};
