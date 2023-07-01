import React from "react";
import { useState, useEffect } from "react";
import { Flex, Text, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import Card from "components/card/Card.js";

// Assets

export default function FBClickThroughRate() {
    const [stats, setStats] = useState([]);
    const [thisWeekStat, setThisWeekStat] = useState([]);
    const [thisWeekStatCut, setThisWeekStatCut] = useState([]);
    const [lastWeekStat, setLastWeekStat] = useState([]);
    const [lastWeekDiff, setLastWeekDiff] = useState([]);
    const [difference, setDifference] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);

    const textColorSecondary = "secondaryGray.600";
    const [isNegative, setIsNegative] = useState(false);

    useEffect(() => {
        fetch("/api/facebook/ctr")
            .then((response) => response.json())
            .then((data) => setStats(data))
            .then(() => setIsLoaded(true))
            .catch((error) => console.log("facebook", error));
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setThisWeekStat(stats.thisWeek);
            const cut = Number(thisWeekStat).toFixed(2);
            setThisWeekStatCut(cut);
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
        isNegative,
        difference,
        isLoaded,
        lastWeekStat,
        stats.lastWeek,
        stats.thisWeek,
        thisWeekStat,
        lastWeekDiff,
    ]);

    return (
        <div className="App">
            <Card py="15px">
                <Flex
                    my="auto"
                    h="100%"
                    align={{ base: "center", xl: "start" }}
                    justify={{ base: "center", xl: "center" }}
                >
                    <Stat my="auto" ms="0px">
                        <StatLabel
                            color={textColorSecondary}
                            lineHeight="100%"
                            fontSize={{
                                base: "sm",
                            }}
                        >
                            FIRST AD | Click Through Rate
                        </StatLabel>

                        <StatNumber
                            fontSize={{
                                base: "2xl",
                            }}
                        >
                            {thisWeekStatCut}%
                        </StatNumber>

                        <Flex align="center">
                            <Text
                                color={isNegative ? "red.500" : "green.500"}
                                fontSize="xs"
                                fontWeight="700"
                                me="5px"
                            >
                                {isNegative ? +difference : "+" + difference}%
                            </Text>
                            <Text
                                color="secondaryGray.600"
                                fontSize="xs"
                                fontWeight="400"
                            >
                                seit letztem Monat
                            </Text>
                        </Flex>
                    </Stat>
                    <Flex ms="auto" w="max-content"></Flex>
                </Flex>
            </Card>
        </div>
    );
}
