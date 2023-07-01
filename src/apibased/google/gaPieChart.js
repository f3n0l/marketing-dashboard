import React from "react";
import { useState, useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";

import ReactApexChart from "react-apexcharts";

// Chakra imports
import { Box, Flex, Text } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import { VSeparator } from "components/separator/Separator";

export default function GAPieCard() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const cardColor = useColorModeValue("white", "navy.700");
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );

    const [sourceCount, setSourceCount] = useState([]);

    const [mobileCount, setMobileCount] = useState([]);
    const [desktopCount, setDesktopCount] = useState([]);
    const [tabletCount, setTabletCount] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);

    const [mobilePercentage, setMobilePercentage] = useState([]);
    const [desktopPercentage, setDesktopPercentage] = useState([]);
    const [tabletPercentage, setTabletPercentage] = useState([]);
    const [pieChartData, setPieChartData] = useState();
    useEffect(() => {
        fetch("/api/google")
            .then((response) => response.json())
            .then((data) => setSourceCount(data.message[2]))
            .then(() => setIsLoaded(true))
            .catch((error) => console.log("google", error));
    }, []);

    useEffect(() => {
        if (isLoaded) {
            //disect array then remove string + return actual number
            const mobile = Number(sourceCount[0].replace(/^\D+/g, ""));
            const desktop = Number(sourceCount[1].replace(/^\D+/g, ""));
            const tablet = Number(sourceCount[2].replace(/^\D+/g, ""));

            const allSourceSum = mobile + desktop + tablet;

            //calculate percentage
            const percentMobile =
                Math.floor((mobile / allSourceSum) * 100) + " %";
            const percentDeskop =
                Math.floor((desktop / allSourceSum) * 100) + " %";
            const percentTablet =
                Math.floor((tablet / allSourceSum) * 100) + " %";
            setMobileCount(mobile);
            setDesktopCount(desktop);
            setTabletCount(tablet);
            setMobilePercentage(percentMobile);
            setDesktopPercentage(percentDeskop);
            setTabletPercentage(percentTablet);
            setPieChartData([mobile, desktop, tablet]);
            // setPieChartData([mobileCount, desktopCount, tabletCount]);
        }
    }, [desktopCount, isLoaded, mobileCount, sourceCount, tabletCount]);

    const pieChartOptions = {
        id: "source",
        labels: ["Mobile", "Desktop", "Tablet"],
        colors: ["#4318FF", "#6AD2FF", "#00B5D8"],
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
            show: false,
            position: "bottom",
            floating: false,
            labels: {
                colors: textColor,
            },
        },
        dataLabels: {
            enabled: false,
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
            colors: ["#4318FF", "#6AD2FF", "#00B5D8"],
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
                >
                    <Text
                        color={textColor}
                        fontSize="md"
                        fontWeight="600"
                        mt="4px"
                        mb="24px"
                    >
                        Company Name | Geräte
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
                    height="60%"
                />
                <Card
                    bg={cardColor}
                    flexDirection="row"
                    boxShadow={cardShadow}
                    justifyContent="center"
                    w="100%"
                    p="15px"
                    px="20px"
                    mt="15px"
                    mx="auto"
                >
                    <Flex direction="column" py="5px">
                        <Flex align="center">
                            <Box
                                h="8px"
                                w="8px"
                                bg="brand.500"
                                borderRadius="50%"
                                me="4px"
                            />
                            <Text
                                fontSize="xs"
                                color="secondaryGray.600"
                                fontWeight="700"
                                mb="5px"
                            >
                                Mobile
                            </Text>
                        </Flex>
                        <Text fontSize="lg" color={textColor} fontWeight="700">
                            {mobilePercentage}
                        </Text>
                    </Flex>
                    <VSeparator
                        mx={{ base: "1rem", xl: "1rem", "2xl": "1rem" }}
                    />
                    <Flex direction="column" py="5px" me="10px">
                        <Flex align="center">
                            <Box
                                h="8px"
                                w="8px"
                                bg="#6AD2FF"
                                borderRadius="50%"
                                me="4px"
                            />
                            <Text
                                fontSize="xs"
                                color="secondaryGray.600"
                                fontWeight="700"
                                mb="5px"
                            >
                                Desktop
                            </Text>
                        </Flex>
                        <Text fontSize="lg" color={textColor} fontWeight="700">
                            {desktopPercentage}
                        </Text>
                    </Flex>
                    <VSeparator
                        mx={{ base: "1rem", xl: "1rem", "2xl": "1rem" }}
                    />
                    <Flex direction="column" py="5px" me="10px">
                        <Flex align="center">
                            <Box
                                h="8px"
                                w="8px"
                                bg="#6AD2FF"
                                borderRadius="50%"
                                me="4px"
                            />
                            <Text
                                fontSize="xs"
                                color="secondaryGray.600"
                                fontWeight="700"
                                mb="5px"
                            >
                                Tablet
                            </Text>
                        </Flex>
                        <Text fontSize="lg" color={textColor} fontWeight="700">
                            {tabletPercentage}
                        </Text>
                    </Flex>
                </Card>
            </Card>
        </div>
    );
}
