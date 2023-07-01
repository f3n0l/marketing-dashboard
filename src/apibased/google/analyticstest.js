const { BetaAnalyticsDataClient } = require("@google-analytics/data");
const analyticsDataClient = new BetaAnalyticsDataClient({
    keyFile: "FILE NAME", // add keyfile
});

async function mainFetch() {
    const propertyId = "PROPERTY ID"; // ADD ID

    //analytics reports
    const [responseUsers] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: "2020-03-31",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "year",
            },
        ],
        metrics: [
            {
                name: "activeUsers",
            },
        ],
    });

    const [responseDeviceCategory] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: "2020-03-31",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "deviceCategory",
            },
        ],
        metrics: [
            {
                name: "activeUsers",
            },
        ],
    });

    const [responseDuration] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dimensions: [
            {
                name: "year",
            },
        ],
        metrics: [
            {
                name: "userEngagementDuration",
            },
        ],
        dateRanges: [
            {
                startDate: "360daysAgo",
                endDate: "today",
            },
        ],
    });

    //prepare device data for piechart
    const deviceCategory = responseDeviceCategory.rows.map((row) => {
        const categories = `${row.dimensionValues[0].value}, ${row.metricValues[0].value}`;
        return categories;
    });

    //Analytics reports
    const userCount = responseUsers.rows[0].metricValues[0].value;

    //calculate averageUsageDuration
    const usageDuration = responseDuration.rows[0].metricValues[0].value;
    const intDuration = usageDuration / userCount;
    const usageMinutes = Math.floor(intDuration / 60);
    const usageSeconds = intDuration % 60;
    const cutUsageSeconds = Math.round(usageSeconds);

    let averageUsageDuration = usageMinutes + "m " + cutUsageSeconds + "s";

    const allArray = [
        userCount,
        averageUsageDuration,
        deviceCategory,
        // adsImpressions,
        // adsCostPerClick,
        // adClicks,
    ]; // add analytics when ready
    // console.log(
    //     "test.js",
    //     adsImpressions,
    //     adsCostPerClick,
    //     adClicks,
    //     responseUsers
    // );

    return allArray;
}
mainFetch();
module.exports = { mainFetch };
