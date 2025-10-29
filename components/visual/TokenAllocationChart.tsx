"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

type TokenRow = {
  symbol: string;
  value: number; // USD total for that token
};

export default function TokenAllocationChart({
  tokens,
}: {
  tokens: TokenRow[];
}) {
  // convert to chart data with % label
  const total = tokens.reduce((sum, t) => sum + t.value, 0);

  const data = tokens.map((t) => ({
    name: t.symbol,
    value: t.value,
    pct: total > 0 ? ((t.value / total) * 100).toFixed(1) : "0.0",
  }));

  // we won't set custom colors (we let recharts pick defaults or browser default)
  // to respect the tool constraints about not forcing colors unless asked.
  // We'll just render <Cell /> without fill to allow default theme.

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={60}
            strokeWidth={1}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} />
            ))}
          </Pie>
          <Tooltip
            formatter={(val: any, name: any, props: any) => {
              const pct = props?.payload?.pct ?? "0.0";
              return [`$${Number(val).toFixed(2)} (${pct}%)`, name];
            }}
          />
          <Legend
            formatter={(value: any, entry: any) => {
              const pct = entry.payload?.pct ?? "0.0";
              return `${value} (${pct}%)`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
