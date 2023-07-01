import React from "react";
import { useState, useEffect } from "react";
import { Button, Input, Text } from "@chakra-ui/react";

import { useColorModeValue } from "@chakra-ui/react";
function SlackButton({ onClick }) {
    return (
        <Button colorScheme="purple" onClick={onClick}>
            Senden!
        </Button>
    );
}

// SECOND SLACK FUNCTION TO NOTIFY ABOUT DEALS

const time = new Date().toLocaleTimeString();
const date = new Date().toLocaleDateString();

export default function SlackDeal() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [linkInput, setLinkInput] = useState("");
    const [fieldInput, setFieldInput] = useState("");
    const handleLinkChange = (event) => {
        setLinkInput(event.target.value);
    };

    const handleFieldChange = (event) => {
        setFieldInput(event.target.value);
    };

    const messageWithHandler = {
        blocks: [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: "🥳  Neuer Kunde!  🥳  ",
                    emoji: true,
                },
            },
            {
                type: "section",
                fields: [
                    {
                        type: "mrkdwn",
                        text: "*Kunde seit dem:*\n" + date + "\n um " + time,
                    },
                    {
                        type: "mrkdwn",
                        text: "*Art:*\nDealabschluss",
                    },
                ],
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: linkInput,
                },
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text:
                        fieldInput + " ist unser neuester Kunde!\n\n\n\n Wow!",
                },
                accessory: {
                    type: "image",
                    image_url:
                        "https://media.giphy.com/media/xT5LMQ8rHYTDGFG07e/giphy.gif",
                    alt_text: "cute cat",
                },
            },
        ],
    };
    function ClickedButton() {
        const messageEntry = () => {
            fetch("/api/slackdeal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messageWithHandler),
            })
                .then((response) => response.json())
                .catch((error) => {
                    console.log("error /api/slack", error);
                });
        };

        messageEntry();
    }

    return (
        <div className="slackButton">
            <Text color={textColor}>Neuer Deal?</Text>

            <Input
                mt="12px"
                type="text"
                placeholder="Kundenlink"
                size="sm"
                variant="filled"
                borderRadius="16px"
                id="link"
                name="link"
                value={linkInput}
                onChange={handleLinkChange}
            />

            <Input
                mt="12px"
                mb="12px"
                type="text"
                placeholder="Kunden Name"
                size="lg"
                borderRadius="16px"
                id="field"
                name="field"
                value={fieldInput}
                onChange={handleFieldChange}
            />

            <SlackButton onClick={ClickedButton}></SlackButton>
        </div>
    );
}
