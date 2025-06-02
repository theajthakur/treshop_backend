const { BetaAnalyticsDataClient } = require("@google-analytics/data");
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials,
});

const propertyId = "489853086";

const dateRanges = {
  today: { startDate: "today", endDate: "today" },
  yesterday: { startDate: "yesterday", endDate: "yesterday" },
  thisWeek: { startDate: "7daysAgo", endDate: "today" },
  thisMonth: { startDate: "30daysAgo", endDate: "today" },
};

async function fetchUserSourcesByDateRange() {
  const results = {};

  for (const [key, dateRange] of Object.entries(dateRanges)) {
    try {
      const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [dateRange],
        dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [
          {
            metric: {
              metricName: "activeUsers",
            },
            desc: true,
          },
        ],
        limit: 10, // top 10 sources for example
      });

      results[key] =
        response.rows?.map((row) => ({
          source: row.dimensionValues[0].value,
          medium: row.dimensionValues[1].value,
          activeUsers: Number(row.metricValues[0].value),
        })) || [];
    } catch (error) {
      results[key] = `Error: ${error.message}`;
    }
  }

  return results;
}

module.exports = fetchUserSourcesByDateRange;
