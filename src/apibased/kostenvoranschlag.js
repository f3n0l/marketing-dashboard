import React from "react";
// import { useState, useEffect } from "react";
import { Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import Card from "components/card/Card.js";

// Assets

export default function Kostenvoranschläge() {
    const textColorSecondary = "secondaryGray.600";

    // const lastDaily = lastMonthly / 30;
    // const lastWeekly = ((lastMonthly / 30) * 7).toFixed();

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
                            Kostenvoranschläge aktuell
                        </StatLabel>
                        <StatNumber
                            mt="15px"
                            fontSize={{
                                base: "2xl",
                            }}
                        >
                            <small>Insgesamt:</small> 412
                        </StatNumber>
                        <StatNumber
                            mt="15px"
                            fontSize={{
                                base: "2xl",
                            }}
                        >
                            <small>Angenommen:</small> 232
                        </StatNumber>
                        <StatNumber
                            mt="15px"
                            fontSize={{
                                base: "2xl",
                            }}
                        >
                            <small>Noch offen:</small> 180
                        </StatNumber>
                        <StatNumber
                            mt="15px"
                            fontSize={{
                                base: "2xl",
                            }}
                        >
                            <small>Umsatzvolumen:</small> 64363434 €
                        </StatNumber>
                    </Stat>
                </Flex>
            </Card>
        </div>
    );
}
