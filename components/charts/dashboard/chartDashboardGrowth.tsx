"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A multiple bar chart"


const chartConfig = {
  users: {
    label: "New Users",
    color: "var(--chart-1)",
  },
  stories: {
    label: "New Stories",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartDashboardGrowth({ data }: { data?: { month: string; users: number; stories: number }[] }) {
  const displayData = data || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Growth</CardTitle>
        <CardDescription>New Users vs New Stories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-56 w-full">
          <BarChart accessibilityLayer data={displayData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="users" fill="var(--color-users)" barSize={20} radius={2} />
            <Bar dataKey="stories" fill="var(--color-stories)" barSize={20} radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Tracking monthly platform activity <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
