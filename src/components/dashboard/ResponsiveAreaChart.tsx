import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Line,
  LineChart,
} from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";

type TResponsiveAreaChartProps = {
  kpi: string;
  data: IChartDatum[];
  colors: {
    stroke: string;
    fill: string;
  };
};

export const ResponsiveAreaChart = ({
  kpi,
  data,
  colors,
}: TResponsiveAreaChartProps) => {
  return (
    <ResponsiveContainer height={200}>
      <LineChart
        data={data}
        height={400}
        margin={{
          top: 10,
          right: 40,
          left: -15,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} stroke="#F5F5F5" />
        <XAxis
          dataKey="date"
          tickCount={10}
          tick={{
            stroke: "#676767",
            strokeWidth: 0.5,
            fontSize: "12px",
          }}
          stroke="#F5F5F5"
        />
        <YAxis
          tickCount={4}
          tick={{
            stroke: "#676767",
            strokeWidth: 0.5,
            fontSize: "12px",
          }}

          axisLine={false}
          interval="preserveStartEnd"
          domain={[0, "dataMax + 10"]}
        />
        <Tooltip
          content={<ChartTooltip kpi={kpi} colors={colors} />}
          wrapperStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "0 solid #000",
            borderRadius: "10px",
          }}
        />
        <Line //second line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
