import React from "react";
import { useState, useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";

import ReactApexChart from "react-apexcharts";

// Chakra imports
import { Box, Flex, Text } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import { VSeparator } from "components/separator/Separator";

export default function BiggestClients() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const cardColor = useColorModeValue("white", "navy.700");
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );

    const pieChartData = [
        138968, 23252, 23052, 55590, 21323, 63462, 41234, 41834, 77777, 454545,
    ];

    const pieChartOptions = {
        id: "source",
        labels: [
            "Company 1",
            "Company 2",
            "Company 3",
            "Company 4",
            "Company 5",
            "Company 6",
            "Company 7",
            "Company 8",
            "Company 9",
            "Company 10",
        ],
        colors: [
            "#4318FF",
            "#6AD2FF",
            "#00B5D8",
            "#EE5D50",
            "#01B574",
            "#FFB547",
            "#D69E2E",
            "#319795",
            "#D53F8C",
            "#718096",
        ],
        chart: {
            width: "500px",
        },
        states: {
            hover: {
                filter: {
                    type: "none",
                },
            },
        },
        legend: {
            show: true,
            position: "bottom",
            floating: false, // horizontalAlign: "b",
            // verticalAlign: "bottom",
            // width: "300%",
            markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                strokeColor: "#fff",
            },
            labels: {
                colors: textColor,
            },
        },
        dataLabels: {
            enabled: true,
        },
        hover: { mode: null },
        plotOptions: {
            pie: {
                customScale: 1,
            },
            donut: {
                expandOnClick: true,
                donut: {
                    labels: {
                        show: true,
                    },
                },
            },
        },
        fill: {
            colors: [
                "#4318FF",
                "#6AD2FF",
                "#00B5D8",
                "#EE5D50",
                "#01B574",
                "#FFB547",
                "#D69E2E",
                "#319795",
                "#D53F8C",
                "#718096",
            ],
        },
        tooltip: {
            enabled: true,
            theme: "dark",
        },
    };

    return (
        <div>
            <Card p="20px" align="center" direction="column" w="100%" h="100%">
                <Flex
                    px={{ base: "0px", "2xl": "10px" }}
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                    mb="8px"
                    direction="column"
                >
                    <Text
                        color={textColor}
                        fontSize="md"
                        fontWeight="600"
                        mt="4px"
                        mb="20px"
                    >
                        Größte Kundenumsätze 2023
                    </Text>
                    {/* <Select
                        fontSize="sm"
                        variant="subtle"
                        defaultValue="monthly"
                        width="unset"
                        fontWeight="700"
                    >
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </Select> */}
                </Flex>

                {/* <PieChart
                    h="100%"
                    w="100%"
                    chartData={pieChartData}
                    chartOptions={pieChartOptions}
                /> */}
                <ReactApexChart
                    options={pieChartOptions}
                    series={pieChartData}
                    type="pie"
                    // width="50%"
                    height="110%"
                />
                <Card
                    // bg={cardColor}
                    flexDirection="row"
                    boxShadow={cardShadow}
                    justifyContent="center"
                    w="100%"
                    p="15px"
                    px="20px"
                    mt="15px"
                    mx="auto"
                ></Card>
            </Card>
        </div>
    );
}
