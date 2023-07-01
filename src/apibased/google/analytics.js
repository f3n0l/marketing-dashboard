import React from "react";
import { useState, useEffect } from "react";
import MiniStatistics from "components/card/MiniStatistics";
import { Icon, useColorModeValue, Text, Flex } from "@chakra-ui/react";
import IconBox from "components/icons/IconBox";
import { MdBarChart } from "react-icons/md";

// function ClickedButton() {
//     fetch("/api/google")
//         .then((response) => response.json())
//         .then((data) => console.log(data.message))

//         .catch((error) => console.log("google", error));
//     console.log("du bist in diese google");
// }

export default function GAMonthlyUsers() {
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    // const brandColor = useColorModeValue("brand.500", "white");
    // Chakra Color Mode

    const [userCount, setUserCount] = useState([]);
    const [usageDuration, setUsageDuration] = useState([]);

    useEffect(() => {
        fetch("/api/google")
            .then((response) => response.json())
            .then((data) => setUserCount(data.message[0]))
            .catch((error) => console.log("google", error));
    }, []);

    useEffect(() => {
        fetch("/api/google")
            .then((response) => response.json())
            .then((data) => setUsageDuration(data.message[1]))
            .catch((error) => console.log("google", error));
    }, []);

    return (
        <div>
            <Flex align="center">
                <MiniStatistics
                    name="PAGE NAME| Agenturseite Besucherzahl Gesamt"
                    value={userCount}
                />
                <Text opacity="0%" color={boxBg} mb="50px">
                    ........
                </Text>
                <MiniStatistics
                    name="PAGE NAME | Durchschnittliche Interaktionsdauer"
                    value={usageDuration}
                />
            </Flex>
        </div>
    );
}
