function gaAdsFetch() {
    const { BetaAnalyticsDataClient } = require("@google-analytics/data");
    const analyticsDataClient = new BetaAnalyticsDataClient({
        keyFile: "[[YOUR FILE]]", // insert keyfile
    });

    function main(propertyId = "PROPERTY ID") {
        //insert property id
        async function runBatchReport() {
            const [response] = await analyticsDataClient.batchRunReports({
                property: `properties/${propertyId}`,
                requests: [
                    {
                        dimensions: [
                            {
                                name: "year",
                            },
                        ],
                        metrics: [
                            {
                                name: "advertiserAdImpressions",
                            },
                        ],
                        dateRanges: [
                            {
                                startDate: "360daysAgo",
                                endDate: "today",
                            },
                        ],
                    },

                    {
                        dimensions: [
                            {
                                name: "year",
                            },
                        ],
                        metrics: [
                            {
                                name: "advertiserAdClicks",
                            },
                        ],
                        dateRanges: [
                            {
                                startDate: "360daysAgo",
                                endDate: "today",
                            },
                        ],
                    },
                    {
                        dimensions: [
                            {
                                name: "year",
                            },
                        ],
                        metrics: [
                            {
                                name: "advertiserAdCostPerClick",
                            },
                        ],
                        dateRanges: [
                            {
                                startDate: "360daysAgo",
                                endDate: "today",
                            },
                        ],
                    },
                ],
            });

            console.log("Batch report results:");
            response.reports.forEach((report) => {
                printRunReportResponse(report);
            });
        }

        runBatchReport();

        // Prints results of a runReport call.
        function printRunReportResponse(response) {
            console.log(`${response.rowCount} rows received`);
            response.dimensionHeaders.forEach((dimensionHeader) => {
                console.log(`Dimension header name: ${dimensionHeader.name}`);
            });
            response.metricHeaders.forEach((metricHeader) => {
                console.log(
                    `Metric header name: ${metricHeader.name} (${metricHeader.type})`
                );
            });

            console.log("Report result:");
            response.rows.forEach((row) => {
                console.log(
                    `${row.dimensionValues[0].value}, ${row.metricValues[0].value}`
                );
            });
        }
    }

    process.on("unhandledRejection", (err) => {
        console.error(err.message);
        process.exitCode = 1;
    });
    main(...process.argv.slice(2));
}

module.exports = { gaAdsFetch };
