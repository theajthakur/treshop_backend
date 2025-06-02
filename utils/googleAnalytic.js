const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: "utils/service-account.json",
});

const propertyId = "489853086";

const dateRanges = {
  today: { startDate: "today", endDate: "today" },
  yesterday: { startDate: "yesterday", endDate: "yesterday" },
  thisWeek: { startDate: "7daysAgo", endDate: "today" },
  thisMonth: { startDate: "30daysAgo", endDate: "today" },
};

async function fetchUserSourcesByDateRange() {
  return {
    today: [
      {
        source: "(direct)",
        medium: "(none)",
        activeUsers: 1,
      },
      {
        source: "(not set)",
        medium: "(not set)",
        activeUsers: 1,
      },
    ],
    yesterday: [
      {
        source: "(direct)",
        medium: "(none)",
        activeUsers: 1,
      },
      {
        source: "linkedin.com",
        medium: "referral",
        activeUsers: 1,
      },
    ],
    thisWeek: [
      {
        source: "(direct)",
        medium: "(none)",
        activeUsers: 2,
      },
      {
        source: "(not set)",
        medium: "(not set)",
        activeUsers: 1,
      },
      {
        source: "linkedin.com",
        medium: "referral",
        activeUsers: 1,
      },
    ],
    thisMonth: [
      {
        source: "(direct)",
        medium: "(none)",
        activeUsers: 7,
      },
      {
        source: "(not set)",
        medium: "(not set)",
        activeUsers: 1,
      },
      {
        source: "linkedin.com",
        medium: "referral",
        activeUsers: 1,
      },
    ],
  };

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
