import { Box, Text, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function QuoteOfTheDay() {
    const [webData, setWebData] = useState([]);
    const [quote, setQuote] = useState([]);
    const [author, setAuthor] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("/api/qotd")
            .then((response) => response.json())
            .then((data) => setWebData(data.message))
            .then(() => setIsLoaded(true))
            .catch((error) => console.log("awwwards", error));
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setQuote(webData[0].q);
            setAuthor(webData[0].a);
        }
    }, [isLoaded, webData.q, webData.a, webData]);

    return (
        <div>
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                <Box pt={{ base: 1, md: 2, xl: 2 }}>
                    <Flex ml="16px">
                        <Text fontSize="xl" fontWeight="600" mt="0px">
                            {quote}
                            <br></br>
                            <br></br>- <em>{author}</em>
                        </Text>
                    </Flex>
                    <Flex mt="10%" ml="16px" mr="16px"></Flex>
                </Box>
            </Box>
        </div>
    );
}
