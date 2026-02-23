// : Promise<FraudStats>

export async function fetchFraudStatistics() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/v1/statistics`,
      {
        cache: "no-cache"
      },
    );

    console.log(response)

    if (!response.ok) {
      throw new Error("Failed to fetch fraud statistics");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching fraud stats:", error);
    // Return empty stats structure
    return {
      success: false,
      message: "Failed to load",
      data: {
        summary: {
          _id: null,
          totalOrders: 0,
          fraudOrders: 0,
          legitOrders: 0,
          unverifiedEmails: 0,
          avgRisk: 0,
        },
        riskOrders: [],
        ipStats: [],
        behavior: [],
        locationMismatch: [],
      },
    };
  }
}
