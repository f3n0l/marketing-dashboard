import { useState, useEffect } from "react";
import { Text, useColorModeValue, Progress, Flex } from "@chakra-ui/react";

export default function YearProgress() {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const [daysTill, setDaysTill] = useState([]);
    const [goalWords, setGoalWords] = useState([]);
    const [progress, setProgress] = useState([]);

    // generate random word
    const wordsToChoose = [
        "Motivation",
        "Effectivity",
        "Power",
        "Winning",
        "Coding",
        "Github",
        "Jest",
    ];
    const chosenWord =
        wordsToChoose[Math.floor(Math.random() * wordsToChoose.length)];

    // calculate days left in year
    const today = new Date();
    const lastDayOfYear = new Date(today.getFullYear(), 11, 31);
    const dayDuration = 1000 * 60 * 60 * 24;

    const daysLeft = Math.ceil(
        (lastDayOfYear.getTime() - today.getTime()) / dayDuration
    );

    // calculate percentage of days left
    const daysLeftPercentage = 100 - ((daysLeft / 365) * 100).toFixed();

    useEffect(() => {
        setDaysTill(daysLeft);
        setProgress(daysLeftPercentage);
        setGoalWords(chosenWord);
    }, [chosenWord, daysLeft, daysLeftPercentage]);

    return (
        <div>
            <Flex ml="16px">
                <Text color={textColor} fontSize="xl" fontWeight="600" mt="4px">
                    Noch {daysTill} Tage dieses Jahr für <em>{goalWords}</em>
                </Text>
            </Flex>
            <Flex mt="10%" ml="16px" mr="16px">
                <Progress
                    width="100%"
                    hasStripe
                    isAnimated
                    value={progress}
                    size="L"
                    colorScheme="pink"
                ></Progress>
            </Flex>
            <Flex mt="2%" ml="88%">
                <Text> {progress} % </Text>
            </Flex>
        </div>
    );
}
