import React from "react";
import { useState, useEffect } from "react";
import MiniStatistics from "components/card/MiniStatistics";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import IconBox from "components/icons/IconBox";
import { MdBarChart } from "react-icons/md";

export default function GAMonthlyUsers() {
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const brandColor = useColorModeValue("brand.500", "white");
    // Chakra Color Mode

    const [usageDuration, setUsageDuration] = useState([]);

    useEffect(() => {
        fetch("/api/google")
            .then((response) => response.json())
            .then((data) => setUsageDuration(data.message[1]))
            .catch((error) => console.log("google", error));
    }, []);

    // useEffect(() => {
    //     fetch("/api/google")
    //         .then((response) => response.json())
    //         .then((data) => setSourceCount(data.message[2]))
    //         .catch((error) => console.log("google", error));
    // }, []);

    return (
        <div>
            <MiniStatistics
                startContent={
                    <IconBox
                        w="56px"
                        h="56px"
                        bg={boxBg}
                        icon={
                            <Icon
                                w="32px"
                                h="32px"
                                as={MdBarChart}
                                color={brandColor}
                            />
                        }
                    />
                }
                name="PAGE NAME | Durchschnittliche Interaktionsdauer"
                value={usageDuration}
            />
        </div>
    );
}
