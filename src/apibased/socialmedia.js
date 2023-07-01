import React from "react";
import { useState, useEffect } from "react";
import {
    Flex,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";

// Assets

export default function SocialMedia() {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (
        <div className="App">
            <Card p="20px" align="center" direction="column" w="100%" h="100%">
                <Flex
                    px={{ base: "0px", "2xl": "10px" }}
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                    mb="20px"
                >
                    <Text
                        color={textColor}
                        fontSize="md"
                        fontWeight="600"
                        mt="4px"
                    >
                        Social Media
                    </Text>
                </Flex>
                <Flex
                    px={{ base: "0px", "2xl": "10px" }}
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                    mb="0px"
                >
                    <Table size="sm">
                        <Thead>
                            <Tr>
                                <Th>Instagram</Th>

                                {/* <Th isNumeric>Wert</Th> */}
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Neue Follower d.M.</Td>

                                <Td color="green.500" isNumeric>
                                    21
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Wachstum d.M.</Td>

                                <Td color="white.500" isNumeric>
                                    8
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Neue Follower l.M.</Td>

                                <Td color="green.500" isNumeric>
                                    15
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Wachstum l.M. </Td>

                                <Td color="white.500" isNumeric>
                                    1
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Beiträge/Woche</Td>

                                <Td color="orange.500" isNumeric>
                                    ø 4.5
                                </Td>
                            </Tr>
                            {/* <Tr>
                                <Td>Mail geöffnet</Td>

                                <Td isNumeric>{openRate}%</Td>
                            </Tr>
                            <Tr>
                                <Td>Link geöffnet</Td>

                                <Td isNumeric>{clickRate}%</Td>
                            </Tr> */}
                        </Tbody>
                    </Table>
                </Flex>
                <Flex>
                    <Table size="sm" mt="27px">
                        <Thead>
                            <Tr>
                                <Th>LinkedIn</Th>

                                {/* <Th isNumeric>Wert</Th> */}
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Neue Follower d.M.</Td>

                                <Td color="green.500" isNumeric>
                                    36
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Beiträge d.M.</Td>

                                <Td color="white.500" isNumeric>
                                    13
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Neue Follower l.M.</Td>

                                <Td color="green.500" isNumeric>
                                    40
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Beiträge l.M. </Td>

                                <Td color="white.500" isNumeric>
                                    16
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Beiträge/Woche </Td>

                                <Td color="orange.500" isNumeric>
                                    ø 3.3
                                </Td>
                            </Tr>
                            {/* <Tr>
                                <Td>Mail geöffnet</Td>

                                <Td isNumeric>{openRate}%</Td>
                            </Tr>
                            <Tr>
                                <Td>Link geöffnet</Td>

                                <Td isNumeric>{clickRate}%</Td>
                            </Tr> */}
                        </Tbody>
                    </Table>
                </Flex>
            </Card>
        </div>
    );
}
