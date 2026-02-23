import { fetchFraudStatistics } from "@/lib/fraud";
import StatisticDemo from "./second/StatictisticDamo";
export default async function Statistics() {
  const statisticsData = await fetchFraudStatistics();

  if (!statisticsData.data.summary){
    return <div>
      no data found in db
    </div>
  }
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <StatisticDemo FSdata={statisticsData.data} />
        </div>
      </div>
    );
}
