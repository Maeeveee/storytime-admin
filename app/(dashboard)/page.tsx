import { CardDashbordStats } from "@/components/cards/dashboard/cardDashbordStats";
import { ChartPieDonutText } from "@/components/charts/dashboard/chartDashboardTotalStories";
import { TableDashboardTopAuthor } from "@/components/tables/dashboard/tableDashboardTopAuthor";
import { ChartDashboardGrowth } from "@/components/charts/dashboard/chartDashboardGrowth";
export default function DashboardPage() {
    return (
        <div className="flex h-full flex-col gap-4">
            {/* Stats Cards - Fixed height */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <CardDashbordStats title="tes" content="tes" />
                <CardDashbordStats title="tes" content="tes" />
                <CardDashbordStats title="tes" content="tes" />
                <CardDashbordStats title="tes" content="tes" />
            </div>

            {/* Middle section - Takes remaining space */}
            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 min-h-0">
                <ChartPieDonutText />
                <TableDashboardTopAuthor />
            </div>

            {/* Growth Chart - Full width, fixed height */}
            <div className="w-full">
                <ChartDashboardGrowth />
            </div>
        </div>
    );
}
