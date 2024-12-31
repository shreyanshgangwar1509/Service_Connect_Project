import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const barChartData = [
  { name: "Jan", total: 45 },
  { name: "Feb", total: 52 },
  { name: "Mar", total: 61 },
  { name: "Apr", total: 58 },
  { name: "May", total: 65 },
  { name: "Jun", total: 72 },
];

const defaultRatingData = {
  labels: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
  datasets: [
    {
      data: [60, 25, 10, 3, 2], // Dummy data
      backgroundColor: ["#6c63ff", "#4caf50", "#ff9800", "#ff6961", "#9e9e9e"],
      hoverBackgroundColor: ["#5b54e8", "#45a049", "#fb8c00", "#ff5c5c", "#bdbdbd"],
      borderColor: "#ffffff",
      borderWidth: 2,
    },
  ],
};

const jobStatusData = {
  labels: ["Accepted", "Not Accepted", "Successfully Done", "Refunded"],
  datasets: [
    {
      data: [120, 30, 90, 10],
      backgroundColor: ["#6c63ff", "#ff6961", "#4caf50", "#ffd700"],
      hoverBackgroundColor: ["#5b54e8", "#ff5c5c", "#45a049", "#f4c20d"],
      borderColor: "#ffffff",
      borderWidth: 2,
    },
  ],
};

export default function Analytics() {
  const [ratingData, setRatingData] = useState(defaultRatingData);

  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/worker/ratingdetail", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { fiveStars, fourStars, threeStars, twoStars, oneStar } = response.data;
        setRatingData({
          labels: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
          datasets: [
            {
              data: [fiveStars, fourStars, threeStars, twoStars, oneStar],
              backgroundColor: ["#6c63ff", "#4caf50", "#ff9800", "#ff6961", "#9e9e9e"],
              hoverBackgroundColor: ["#5b54e8", "#45a049", "#fb8c00", "#ff5c5c", "#bdbdbd"],
              borderColor: "#ffffff",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching rating data:", error);
      }
    };

    fetchRatingData();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      {/* Bar Chart */}
      <Card className="transform transition-all duration-300 hover:scale-105 active:scale-95">
        <CardHeader>
          <CardTitle>Bookings Overview</CardTitle>
          <CardDescription>Number of bookings per month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" stroke="#333333" />
              <YAxis stroke="#333333" />
              <Bar dataKey="total" fill="#6c63ff" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Doughnut Chart - Job Status */}
      <Card className="transform transition-all duration-300 hover:scale-105 active:scale-95">
        <CardHeader>
          <CardTitle>Job Status</CardTitle>
          <CardDescription>Breakdown of job outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <Doughnut
            data={jobStatusData}
            options={{
              plugins: {
                legend: { position: "bottom" },
              },
              cutout: "60%", // 3D illusion effect
            }}
          />
        </CardContent>
      </Card>

      {/* Doughnut Chart - Ratings */}
      <Card className="transform transition-all duration-300 hover:scale-105 active:scale-95">
        <CardHeader>
          <CardTitle>Ratings Distribution</CardTitle>
          <CardDescription>Customer ratings breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <Doughnut
            data={ratingData}
            options={{
              plugins: {
                legend: { position: "bottom" },
              },
              cutout: "60%", // 3D illusion effect
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
