import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const data = [
    { month: "May", activity: 28 },
    { month: "Jun", activity: 42 },
    { month: "Jul", activity: 35 },
    { month: "Aug", activity: 68 },
];

function ActivityChart() {
    return (
        <div className="glass rounded-2xl p-6">

            <div className="mb-6 flex items-center justify-between">

                <div>
                    <h2 className="font-semibold">
                        Activity & Progress
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                        Your development activity
                    </p>
                </div>

                <span className="rounded-lg bg-violet-500/10 px-3 py-1.5 text-xs text-violet-300">
          Projects
        </span>

            </div>

            <div className="h-64">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <CartesianGrid
                            stroke="rgba(255,255,255,0.05)"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            stroke="#64748b"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            stroke="#64748b"
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "#0b1120",
                                border: "1px solid #4c1d95",
                                borderRadius: "12px",
                                color: "white",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="activity"
                            stroke="#a855f7"
                            strokeWidth={3}
                            dot={{
                                r: 5,
                                fill: "#a855f7",
                            }}
                            activeDot={{
                                r: 7,
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default ActivityChart;