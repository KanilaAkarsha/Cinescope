"use client";

import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function AnalyticsCharts({
  viewsByMonth,
  genreDistribution,
  ratingDistribution,
  topMovies,
}) {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "#8884d8",
    "#82ca9d",
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Monthly Movies Added</CardTitle>
            <CardDescription>
              New movie records added per month.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-6">
            <div className="h-75 w-full">
              <ChartContainer
                config={{
                  views: {
                    label: "Movies",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={viewsByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="var(--color-views)"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Genre Distribution</CardTitle>
            <CardDescription>Distribution of movies by genre.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-6">
            <div className="h-75 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genreDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ genre, percent }) =>
                      `${genre}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="genre">
                    {genreDistribution.map((entry, index) => (
                      <Cell
                        key={`genre-cell-${entry.genre}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>
              Distribution of movies by rating bucket.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-6">
            <div className="h-75 w-full">
              <ChartContainer
                config={{
                  count: {
                    label: "Movies",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ratingDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rating" />
                    <YAxis allowDecimals={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="count" fill="var(--color-count)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Top Reviewed Movies</CardTitle>
            <CardDescription>
              Movies with the most review activity.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-6">
            <div className="h-75 w-full">
              <ChartContainer
                config={{
                  views: {
                    label: "Reviews",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={topMovies}
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis type="category" dataKey="title" width={100} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="views" fill="var(--color-views)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
