import { CardDashbordStats } from "@/components/cards/dashboard/cardDashbordStats";
import { ChartPieDonutText } from "@/components/charts/dashboard/chartDashboardTotalStories";
import { TableDashboardTopAuthor } from "@/components/tables/dashboard/tableDashboardTopAuthor";
import { ChartDashboardGrowth } from "@/components/charts/dashboard/chartDashboardGrowth";
export default function DashboardPage() {
    return (
        <>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                <CardDashbordStats title="tes" content="tes" />
                <CardDashbordStats title="tes" content="tes" />
                <CardDashbordStats title="tes" content="tes" />
                <CardDashbordStats title="tes" content="tes" />
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
