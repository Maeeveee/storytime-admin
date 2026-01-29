import { CardDashbordStats } from "@/components/cards/dashboard/cardDashbordStats";
import { ChartPieDonutText } from "@/components/charts/dashboard/chartDashboardTotalStories";
import { TableDashboardTopAuthor } from "@/components/tables/dashboard/tableDashboardTopAuthor";
import { ChartDashboardGrowth } from "@/components/charts/dashboard/chartDashboardGrowth";
import { BookOpenText } from "lucide-react";
export default function DashboardPage() {
    return (
        <>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                <CardDashbordStats title="Total Stories" content="100" icon={<BookOpenText />} />
                <CardDashbordStats title="Total Categories" content="12" icon={<BookOpenText />} />
                <CardDashbordStats title="Total Users" content="60" icon={<BookOpenText />} />
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
                <ChartPieDonutText />
                <TableDashboardTopAuthor />
            </div>
            <div className="w-full">
                <ChartDashboardGrowth />
            </div>
        </>
    );
}
