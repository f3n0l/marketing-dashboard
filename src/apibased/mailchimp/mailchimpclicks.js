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

export default function MailchimpData() {
    const [stats, setStats] = useState([]);
    const [subs, setSubs] = useState([]);
    const [openRate, setOpenRate] = useState([]);
    const [clickRate, setClickRate] = useState([]);
    const [unsubs, setUnsubs] = useState([]);
    const [members, setMembers] = useState([]);
    const [unsubsLastPost, setUnsubsLastPost] = useState([]);
    const [subsLastPost, setSubsLastPost] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const textColor = useColorModeValue("secondaryGray.900", "white");

    useEffect(() => {
        fetch("/api/mailchimp")
            .then((response) => response.json())
            .then((data) => setStats(data))
            .then(() => setIsLoaded(true))
            .catch((error) => console.log("mailchimp", error));
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setSubs(stats.subs);
            setOpenRate(stats.openRate.toFixed(2));
            setClickRate(stats.clickRate.toFixed(2));
            setUnsubs(stats.unsubs);
            setMembers(stats.members);
            setUnsubsLastPost(stats.unsubSince);
            setSubsLastPost(stats.subsSince);
        }
    }, [
        isLoaded,
        stats.clickRate,
        stats.members,
        stats.openRate,
        stats.subs,
        stats.subsSince,
        stats.unsubSince,
        stats.unsubs,
    ]);

    return (
        <div className="App">
            <Card p="20px" align="center" direction="column" w="100%" h="100%">
                <Flex
                    px={{ base: "0px", "2xl": "10px" }}
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                    mb="40px"
                >
                    <Text
                        color={textColor}
                        fontSize="md"
                        fontWeight="600"
                        mt="4px"
                    >
                        Mailchimp Newsletter
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
                                <Th>Metrik</Th>

                                <Th isNumeric>Wert</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Member</Td>

                                <Td isNumeric>{members}</Td>
                            </Tr>
                            <Tr>
                                <Td>Abos</Td>

                                <Td color="green.500" isNumeric>
                                    {subs}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>De-Abos</Td>

                                <Td color="red.500" isNumeric>
                                    {unsubs}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Abos s. l. m.</Td>

                                <Td color="green.500" isNumeric>
                                    {subsLastPost}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>De-Abos s. l. m.</Td>

                                <Td color="red.500" isNumeric>
                                    {unsubsLastPost}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Mail geöffnet</Td>

                                <Td isNumeric>{openRate}%</Td>
                            </Tr>
                            <Tr>
                                <Td>Link geöffnet</Td>

                                <Td isNumeric>{clickRate}%</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Flex>
            </Card>
        </div>
    );
}
