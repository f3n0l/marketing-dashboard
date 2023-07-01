import React from "react";
import { useState, useEffect } from "react";
import { Button, Input, Text } from "@chakra-ui/react";
import Card from "components/card/Card";
import { useColorModeValue } from "@chakra-ui/react";
function SlackButton({ onClick }) {
    return (
        <Button type="submit" colorScheme="purple" onClick={onClick}>
            Senden!
        </Button>
    );
}

// SECOND SLACK FUNCTION TO NOTIFY ABOUT DEALS

export default function ChatGPT() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [responseRender, setResponseRender] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };

    const messageEntry = async (event) => {
        event.preventDefault();
        const response = await fetch("/api/chatgpt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        console.log(data);
        setResponse(data);
        setIsLoaded(true);
    };

    useEffect(() => {
        if (isLoaded) {
            setResponseRender(response);
        }
    }, [isLoaded, response]);

    return (
        <div className="ChatBot">
            <Text color={textColor}>Chat GPT</Text>

            <Input
                mt="12px"
                type="text"
                placeholder="Frag die Frage"
                size="md"
                variant="filled"
                borderRadius="16px"
                id="link"
                name="link"
                value={prompt}
                onChange={handlePromptChange}
                mb="12px"
            />
            <SlackButton onClick={messageEntry}></SlackButton>
            <Card
                mt="16px"
                w="100%"
                h="300px"
                p={4}
                color="white"
                direction="column"
                px="0px"
                overflowX={{ sm: "hidden", lg: "hidden" }}
                padding="20px"
            >
                <Text color={textColor}>{responseRender}</Text>
            </Card>
        </div>
    );
}
