import { Box, Badge, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function WebsiteOfTheDay() {
    const [webData, setWebData] = useState([]);
    const [imgUrl, setImgUrl] = useState([]);
    const [pageUrl, setPageUrl] = useState([]);
    const [description, setDescription] = useState([]);
    const [artistName, setArtistName] = useState([]);
    const [country, setCountry] = useState([]);
    const [pageName, setPageName] = useState([]);
    const [score, setScore] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("/api/wotd")
            .then((response) => response.json())
            .then((data) => setWebData(data.message))
            .then(() => setIsLoaded(true))
            .catch((error) => console.log("awwwards", error));
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setImgUrl(webData.images[0]);
            setPageUrl(webData.url);
            setArtistName(webData.designBy);
            setDescription(webData.description);
            setCountry(webData.country);
            setPageName(webData.name);
            setScore(webData.score);
        }
    }, [
        isLoaded,
        webData.country,
        webData.description,
        webData.designBy,
        webData.images,
        webData.name,
        webData.score,
        webData.url,
    ]);

    const property = {
        imageAlt: "Random Website of the Year",
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={imgUrl} alt={property.imageAlt} />
            <Box p="6">
                <Box d="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="brand">
                        {score} Pkt.
                    </Badge>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                    >
                        {artistName} &bull; {country}
                    </Box>
                </Box>
                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                >
                    <a href={pageUrl} target="_blank" rel="noreferrer">
                        {pageName}
                    </a>
                </Box>
                <Box>
                    <a href={pageUrl} target="_blank" rel="noreferrer">
                        {description}
                    </a>
                    <Box as="span" color="gray.600" fontSize="sm"></Box>
                </Box>
            </Box>
        </Box>
    );
}
