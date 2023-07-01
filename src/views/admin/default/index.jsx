/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
    Avatar,
    Box,
    CircularProgress,
    CircularProgressLabel,
    Flex,
    FormLabel,
    IconButton,
    Icon,
    Select,
    Progress,
    SimpleGrid,
    useColorModeValue,
} from "@chakra-ui/react";
// Assets
import React from "react";

import Card from "components/card/Card";

import SlackSelect from "apibased/slackselect";
import GAMonthlyUsers from "apibased/google/analytics";
import GAPieCard from "apibased/google/gaPieChart";
import FBReach from "apibased/facebook/fbreach";
import FBClickThroughRate from "apibased/facebook/fbclickthroughrate";
import FBCostPerClick from "apibased/facebook/fbcostperclick";
import MailchimpData from "apibased/mailchimp/mailchimpclicks";
import YearProgress from "apibased/yearprogressbar";
import WebsiteOfTheDay from "apibased/websiteoftheday";
import QuoteOfTheDay from "apibased/quoteoftheday";
import FBReachSecondary from "apibased/facebook/fbreachsecondary";
import FBCostPerClickSecondary from "apibased/facebook/fbcostperclicksecondary";
import FBClickThroughRateSecondary from "apibased/facebook/fbclickthroughratsecondary";
import ChatGPT from "apibased/chatgpt";
import ChatGPTPictures from "apibased/chatgptpictures";
import ChatGPTCode from "apibased/chatgptcode";
import BiggestClients from "apibased/biggestclients";
import RevenueQuota from "apibased/revenue";
import Kostenvoranschläge from "apibased/kostenvoranschlag";
import SocialMedia from "apibased/socialmedia";

export default function UserReports() {
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
                gap="20px"
                mb="20px"
            >
                {/* <EasyJobTest></EasyJobTest> */}
                <GAMonthlyUsers />
                <FBClickThroughRate />
                <FBCostPerClick />
                <SocialMedia />
                <GAPieCard></GAPieCard>
                <FBReach />
                <RevenueQuota />
                <Kostenvoranschläge />
                <WebsiteOfTheDay></WebsiteOfTheDay>
                <MailchimpData></MailchimpData> <BiggestClients />
                <FBReachSecondary />
                <FBCostPerClickSecondary />
                <FBClickThroughRateSecondary />
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
                <Box pt={{ base: 1, md: 2, xl: 2 }} pr="20px">
                    <Flex>
                        <QuoteOfTheDay />
                    </Flex>
                </Box>
                <Card
                    w="100%"
                    p={4}
                    color="white"
                    direction="column"
                    px="0px"
                    overflowX={{ sm: "hidden", lg: "hidden" }}
                    padding="20px"
                >
                    <Flex ml="16px" mr="16px">
                        <SlackSelect />
                    </Flex>
                </Card>
                /*{" "}
                <Card
                    w="100%"
                    p={4}
                    color="white"
                    direction="column"
                    px="0px"
                    overflowX={{ sm: "scroll", lg: "hidden" }}
                >
                    <YearProgress />
                </Card>{" "}
                */
            </SimpleGrid>

            <SimpleGrid
                columns={{ base: 1, md: 2, xl: 2 }}
                gap="20px"
                mb="20px"
            ></SimpleGrid>

            <SimpleGrid
                columns={{ base: 1, md: 1, xl: 2 }}
                gap="20px"
                mb="20px"
            >
                <SimpleGrid
                    columns={{ base: 1, md: 2, xl: 2 }}
                    gap="20px"
                ></SimpleGrid>
            </SimpleGrid>
            <SimpleGrid
                columns={{ base: 1, md: 1, xl: 2 }}
                gap="20px"
                mb="20px"
            >
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px">
                    <Card
                        w="100%"
                        h="100%"
                        p={4}
                        color="white"
                        direction="column"
                        px="0px"
                        overflowX={{ sm: "hidden", lg: "hidden" }}
                        padding="20px"
                    >
                        <Flex ml="16px" mr="16px">
                            <ChatGPT />
                        </Flex>
                    </Card>{" "}
                    <Flex ml="16px" mr="16px"></Flex>
                </SimpleGrid>
                <ChatGPTPictures />
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px">
                    <Card
                        w="100%"
                        p={4}
                        color="white"
                        direction="column"
                        px="0px"
                        overflowX={{ sm: "hidden", lg: "hidden", xl: "hidden" }}
                        padding="20px"
                    >
                        <Flex ml="16px" mr="16px">
                            <ChatGPTCode />
                        </Flex>
                    </Card>{" "}
                    <Flex ml="16px" mr="16px"></Flex>
                </SimpleGrid>{" "}
            </SimpleGrid>
        </Box>
    );
}
