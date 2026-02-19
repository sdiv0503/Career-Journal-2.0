"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { format, subDays, isSameDay, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JournalEntry } from "@/lib/types";

interface EntryChartProps {
  entries: JournalEntry[];
}

export function EntryChart({ entries }: EntryChartProps) {
  // 1. Process Data: Transform raw entries into chart-friendly format
  const chartData = useMemo(() => {
    // We want to show the last 7 days, even if some have 0 entries
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i); // 6 days ago to today
      return {
        date: date,
        label: format(date, "EEE"), // "Mon", "Tue"
        fullDate: format(date, "MMM d"), // "Oct 24"
        count: 0,
      };
    });

    // Count entries for each day
    entries.forEach((entry) => {
      // Handle both string dates (from API) and Date objects
      const entryDate = typeof entry.date === "string" ? parseISO(entry.date) : entry.date;

      const dayStat = last7Days.find((day) => isSameDay(day.date, entryDate));
      if (dayStat) {
        dayStat.count += 1;
      }
    });

    return last7Days;
  }, [entries]);

  // Calculate total for summary
  const totalEntries = entries.length;

  return (
    <Card className="col-span-1 shadow-sm">
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <p className="text-sm text-slate-500">You have logged {totalEntries} entries in total.</p>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] min-h-[200px] w-full">
          {" "}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="label"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-md">
                        <span className="text-[0.70rem] text-slate-500 uppercase">
                          {payload[0].payload.fullDate}
                        </span>
                        <div className="font-bold text-slate-900">{payload[0].value} Entries</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.count > 0 ? "#2563eb" : "#e2e8f0"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
