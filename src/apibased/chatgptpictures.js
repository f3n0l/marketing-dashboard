import React from "react";
import { useState, useEffect } from "react";
import { Button, Input, Image, Box } from "@chakra-ui/react";

function SlackButton({ onClick }) {
    return (
        <Button type="submit" colorScheme="purple" onClick={onClick}>
            Senden!
        </Button>
    );
}

// SECOND SLACK FUNCTION TO NOTIFY ABOUT DEALS

export default function ChatGPTPictures() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [responseRender, setResponseRender] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };

    const messageEntry = async (event) => {
        event.preventDefault();
        const response = await fetch("/api/chatgptpictures", {
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
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                h="96%"
                w="100%"
            >
                <Box p="6">
                    <label>Bildgenerator</label>
                    <Input
                        w="100%"
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
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                    >
                        <SlackButton onClick={messageEntry}></SlackButton>
                    </Box>
                    <Box mt="16px">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={responseRender}
                        >
                            {prompt}
                        </a>
                        <Box as="span" color="gray.600" fontSize="sm">
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={responseRender}
                            >
                                <Image
                                    w="300px"
                                    target="_blank"
                                    src={responseRender}
                                ></Image>
                            </a>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}
