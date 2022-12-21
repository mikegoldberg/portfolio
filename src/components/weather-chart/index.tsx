import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  Label,
  ReferenceLine,
} from "recharts";
import { WeatherChartProps } from "./types";

const WeatherChart = ({
  data,
  scrollPosition,
  dataKey,
  label,
}: WeatherChartProps) => {
  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <YAxis dataKey={dataKey} width={30} />
        <CartesianGrid strokeDasharray="4 1" />
        <ReferenceLine x={scrollPosition} stroke="rgba(0, 0, 0, 0.3)" />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="rgba(0, 0, 0, 1)"
          fill="rgba(0, 0, 0, .3)"
        />
        <XAxis tick={false}>
          <Label value={label} offset={0} position="insideBottom" />
        </XAxis>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;
