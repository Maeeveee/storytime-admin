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

export const description = "A bar chart"


const chartConfig = {
  stories: {
    label: "Stories",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartDashboardGrowth({ data }: { data?: { month: string; stories: number }[] }) {
  const displayData = data || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Story Growth</CardTitle>
        <CardDescription>Stories created per month</CardDescription>
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
            <Bar dataKey="stories" fill="var(--color-stories)" barSize={20} radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

