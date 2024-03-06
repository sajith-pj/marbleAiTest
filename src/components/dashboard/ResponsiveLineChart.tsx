import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { IChartDatum } from "../../interfaces";
import { ChartTooltip } from "./ChartTooltip";

type TResponsiveAreaChartProps = {
    kpi: string;
    data: IChartDatum[];
    colors: {
        stroke: string;
        fill: string;
    };
};

export const ResponsiveLineChart = ({
    kpi,
    data,
    colors,
}: TResponsiveAreaChartProps) => {
    return (
        <>
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
                    <Line
                        type="monotone"
                        dataKey="value1"
                        stroke={colors?.stroke}
                        dot={{ r: 0 }}

                    />
                    <Line
                        type="monotone"
                        dataKey="value2"
                        stroke={colors?.stroke}
                        dot={{ r: 0 }}
                        strokeDasharray="5 5"
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
};