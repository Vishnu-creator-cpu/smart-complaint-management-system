import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip
} from "recharts";

import "./ComplaintChart.css";

function ComplaintChart() {

    const data = [

        {
            name: "Resolved",
            value: 15
        },

        {
            name: "Pending",
            value: 8
        },

        {
            name: "Rejected",
            value: 2
        }

    ];

    const COLORS = [

        "#22C55E",

        "#F59E0B",

        "#EF4444"

    ];

    return (

        <div className="chart-card">

            <h2>Complaint Statistics</h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie

                        data={data}

                        cx="50%"

                        cy="50%"

                        outerRadius={110}

                        dataKey="value"

                        label

                    >

                        {

                            data.map((entry, index) => (

                                <Cell

                                    key={index}

                                    fill={COLORS[index]}

                                />

                            ))

                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ComplaintChart;