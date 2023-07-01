import React from "react";
import { useState, useEffect } from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Chart from "react-apexcharts";

// Custom components
import Card from "components/card/Card.js";
import { barChartOptionsDailyTraffic } from "variables/charts";

// Assets

export default function FBReach(props) {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { ...rest } = props;
    const [stats, setStats] = useState([]);
    const [thisWeekStat, setThisWeekStat] = useState([]);
    const [lastWeekStat, setLastWeekStat] = useState([]);
    const [lastWeekDiff, setLastWeekDiff] = useState([]);
    const [difference, setDifference] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isNegative, setIsNegative] = useState(false);

    useEffect(() => {
        fetch("/api/facebook/reach")
            .then((response) => response.json())
            .then((data) => setStats(data))
            .then(() => setIsLoaded(true))
            .catch((error) => console.log("facebook", error));
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setThisWeekStat(stats.thisWeek);
            setLastWeekStat(stats.lastWeek);
            setLastWeekDiff(lastWeekStat - thisWeekStat);
            const percentage =
                ((thisWeekStat - lastWeekDiff) / thisWeekStat) * 100;

            setDifference(percentage.toFixed(2));
            if (difference < 0) {
                setIsNegative(true);
            }
        }
    }, [
        difference,
        isNegative,
        isLoaded,
        lastWeekStat,
        stats.lastWeek,
        stats.thisWeek,
        thisWeekStat,
        lastWeekDiff,
    ]);

    const barChartData = [
        {
            name: "Daily Traffic",
            data: [lastWeekDiff, thisWeekStat],
        },
    ];

    return (
        <div className="App">
            <Card
                align="center"
                direction="column"
                w="100%"
                h="100%"
                {...rest}
                // overflow="hidden"
                wrap="initial"
            >
                {/* <Flex justify="space-between" align="start" px="10px" pt="5px"> */}
                <Flex flexDirection="column" align=" start" me="20px">
                    <Flex w="100%">
                        <Text
                            me="auto"
                            color="secondaryGray.600"
                            fontSize="sm"
                            fontWeight="500"
                        >
                            FIRST AD | Wöchentlich
                        </Text>
                    </Flex>
                    <Flex align="end">
                        <Text
                            color={textColor}
                            fontSize="34px"
                            fontWeight="700"
                            lineHeight="100%"
                        >
                            {thisWeekStat}
                        </Text>
                        <Text
                            ms="6px"
                            color="secondaryGray.600"
                            fontSize="sm"
                            fontWeight="500"
                        >
                            Impressionen
                        </Text>
                    </Flex>
                </Flex>
                <Flex align="center">
                    <Text // size + flex to have it on upper right corner
                        color={isNegative ? "red.500" : "green.500"}
                        fontSize="xs"
                        fontWeight="700"
                    >
                        {isNegative ? +difference : "+" + difference}%
                    </Text>
                    <Text
                        color="secondaryGray.600"
                        fontSize="xs"
                        fontWeight="400"
                        ml="3px"
                    >
                        seit letzter Woche
                    </Text>
                </Flex>
                {/* </Flex> */}
                <Box h="240px" mt="auto">
                    <Chart
                        type="bar"
                        width="100%"
                        height="100%"
                        series={barChartData}
                        options={barChartOptionsDailyTraffic}
                    />
                </Box>
            </Card>
        </div>
    );
}
