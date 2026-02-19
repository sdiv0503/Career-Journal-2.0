"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

interface SkillData {
  subject: string;
  A: number; // User's Score
  B: number; // JD Requirement (usually 100 or max)
  fullMark: number;
}

// Mock Data for now (will be replaced by AI later)
const mockData: SkillData[] = [
  { subject: "Technical", A: 120, B: 110, fullMark: 150 },
  { subject: "Communication", A: 98, B: 130, fullMark: 150 },
  { subject: "Leadership", A: 86, B: 130, fullMark: 150 },
  { subject: "Problem Solving", A: 99, B: 100, fullMark: 150 },
  { subject: "Experience", A: 85, B: 90, fullMark: 150 },
  { subject: "Education", A: 65, B: 85, fullMark: 150 },
];

export function SkillRadar({ data = mockData }: { data?: SkillData[] }) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Skill Match Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar
                name="Your Profile"
                dataKey="A"
                stroke="#2563eb"
                fill="#2563eb"
                fillOpacity={0.5}
              />
              <Radar
                name="Job Requirement"
                dataKey="B"
                stroke="#94a3b8"
                fill="#94a3b8"
                fillOpacity={0.2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}