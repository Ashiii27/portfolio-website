"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface DataPoint {
  subject: string;
  value: number;
  fullMark?: number;
}

interface SkillsChartProps {
  data: DataPoint[];
  color?: string;
}

export default function SkillsChart({
  data,
  color = "#00e5ff",
}: SkillsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.08)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
        />
        <Radar
          name="Skill"
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.15}
          strokeWidth={1.5}
        />
        <Tooltip
          contentStyle={{
            background: "oklch(0.18 0.02 220)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "12px",
          }}
          labelStyle={{ color: color }}
          itemStyle={{ color: "rgba(255,255,255,0.7)" }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
