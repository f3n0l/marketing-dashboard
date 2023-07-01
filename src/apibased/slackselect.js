import React from "react";
import { useState, useEffect } from "react";
import { Switch, FormControl, FormLabel } from "@chakra-ui/react";
import SlackMessage from "./slack";
import SlackDeal from "./slackdeal";

import { useColorModeValue } from "@chakra-ui/react";
// RENDER EACH INPUT FIELD DEPENDING ON SWITCH

export default function SlackSelect() {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const [value, setValue] = useState(true);
    const handleChange = () => {
        setValue((prevValue) => !prevValue);
    };

    return (
        <div>
            <FormControl display="flex" alignItems="center">
                <FormLabel color={textColor} htmlFor="email-alerts" mb="0">
                    Klick hier!
                </FormLabel>
                <Switch
                    value={value}
                    onChange={handleChange}
                    id="email-alerts"
                    colorScheme="brand"
                />
            </FormControl>
            <br />
            {value ? <SlackMessage /> : <SlackDeal />}
        </div>
    );
}
