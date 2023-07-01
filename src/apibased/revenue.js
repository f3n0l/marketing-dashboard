import React from "react";
import { useState, useEffect } from "react";
import { Flex, Text, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import Card from "components/card/Card.js";

// Assets

export default function RevenueQuota() {
    const textColorSecondary = "secondaryGray.600";
    const [isNegative, setIsNegative] = useState(false);

    const averageMonthly = 92392; // UPDATE
    const averageWeekly = ((averageMonthly / 30) * 7).toFixed();
    const averageDaily = (averageMonthly / 30).toFixed();

    const lastMonthly = 63446; //UPDATE
    const lastDaily = (lastMonthly / 30).toFixed();
    const lastWeekly = ((lastMonthly / 30) * 7).toFixed();

    const differenceMonthly = (
        ((averageMonthly - lastMonthly) / averageMonthly) *
        100
    ).toFixed(2);

    let monthlyColor = "green.500";

    if (differenceMonthly < 0) {
        monthlyColor = "red.500";
    }
    useEffect(() => {
        if (differenceMonthly < 0) {
            setIsNegative(true);
        }
    }, [differenceMonthly, isNegative]);

    return (
        <div className="App">
            <Card py="15px" p="20px" direction="column" w="100%" h="100%">
                <Flex
                    my="auto"
                    h="100%"
                    align={{ base: "center", xl: "start" }}
                    justify={{ base: "center", xl: "center" }}
                >
                    <Stat my="auto" ms="0px" mt="12px">
                        <StatLabel
                            color={textColorSecondary}
                            lineHeight="100%"
                            fontSize={{
                                base: "sm",
                            }}
                        >
                            Durchschnittlicher Umsatz
                        </StatLabel>
                        <StatNumber
                            mt="15px"
                            fontSize={{
                                base: "2xl",
                            }}
                        >
                            ø {averageDaily} € <small>täglich</small>
                        </StatNumber>
                        <Flex align="center">
                            <StatNumber
                                fontSize={{
                                    base: "2xl",
                                }}
                                mt="15px"
                            >
                                ø {averageWeekly} € <small>wöchentlich</small>
                            </StatNumber>{" "}
                        </Flex>{" "}
                        <StatNumber
                            fontSize={{
                                base: "2xl",
                            }}
                            mt="15px"
                            mb="16px"
                        >
                            {averageMonthly} € <small>monatlich</small>
                        </StatNumber>
                        <Flex align="center">
                            <Text
                                color={monthlyColor}
                                fontSize="xs"
                                fontWeight="700"
                                me="5px"
                            >
                                {isNegative
                                    ? differenceMonthly
                                    : "+" + differenceMonthly}
                                %
                            </Text>
                            <Text
                                color="secondaryGray.600"
                                fontSize="xs"
                                fontWeight="400"
                            >
                                im Vergleich zum Vorjahr
                            </Text>
                        </Flex>
                        <StatLabel
                            color={textColorSecondary}
                            lineHeight="100%"
                            fontSize={{
                                base: "sm",
                            }}
                            mt="27px"
                        >
                            Im letzten Jahr
                        </StatLabel>
                        <StatNumber
                            mt="15px"
                            fontSize={{
                                base: "2xl",
                            }}
                        >
                            ø {lastDaily} € <small>täglich</small>
                        </StatNumber>
                        <Flex align="center">
                            <StatNumber
                                fontSize={{
                                    base: "2xl",
                                }}
                                mt="15px"
                            >
                                ø {lastWeekly} € <small>wöchentlich</small>
                            </StatNumber>{" "}
                        </Flex>{" "}
                        <StatNumber
                            fontSize={{
                                base: "2xl",
                            }}
                            mt="15px"
                            mb="16px"
                        >
                            {lastMonthly} € <small>monatlich</small>
                        </StatNumber>
                    </Stat>
                </Flex>
            </Card>
        </div>
    );
}
