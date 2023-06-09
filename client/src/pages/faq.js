import { FAQ_ENDPOINT } from '@/constants/endpoints';
import { ChakraProvider, Box, VStack, Heading, Text, Button, Textarea } from "@chakra-ui/react";
import React from 'react';

const handleClickEvent = async (event) => {
    const prompt = document.getElementsByName('prompt')[0].value;
    const ChatBox = document.getElementById('ChatBox');
    const newQuestion = document.createElement('div');
    newQuestion.innerHTML = `<h3 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">Q: ${prompt}</h3>`;
    ChatBox.appendChild(newQuestion);
    document.getElementsByName('prompt')[0].value = '';
    event.preventDefault();
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    await fetch(baseURL + FAQ_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: prompt,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            const newAnswer = document.createElement('p');
            newAnswer.innerHTML = `A: ${data.bot}`;
            ChatBox.appendChild(newAnswer);
        });
};

const FAQPage = () => {
    return (
        <ChakraProvider>
            <Box minH="100vh" p={10} display="flex" justifyContent="center" alignItems="center">
                <VStack spacing={8} align="center" maxW="600px" w="100%">
                    <Box
                        id="chat_container"
                        w="100%"
                        h="35rem"
                        border="1px solid #ccc"
                        overflowY="auto"
                        p={4}
                        boxShadow="md"
                        borderRadius={20}
                        bg="white"
                    >
                        <div id="ChatBox"></div>
                        <Heading fontSize="24px" fontWeight="bold" mb="16px">FAQ</Heading>
                        <Text fontSize="18px" fontWeight="bold" mb="8px">Q: What is cryptocurrency?</Text>
                        <Text mb="16px">A: Cryptocurrency is a digital or virtual form of currency that uses cryptography for secure financial transactions, controls the creation of new units, and verifies the transfer of assets.</Text>

                        <Text fontSize="18px" fontWeight="bold" mb="8px">Q: What are some popular cryptocurrencies?</Text>
                        <Text mb="16px">A: Some popular cryptocurrencies include Bitcoin (BTC), Ethereum (ETH), Binance Coin (BNB), Cardano (ADA), and Solana (SOL), among others.</Text>

                        <Text fontSize="18px" fontWeight="bold" mb="8px">Q: How does cryptocurrency mining work?</Text>
                        <Text mb="16px">A: Cryptocurrency mining involves using powerful computers to solve complex mathematical problems that validate and secure transactions on the blockchain network. Miners are rewarded with newly created cryptocurrency tokens for their computational efforts.</Text>

                        <Text fontSize="18px" fontWeight="bold" mb="8px">Q: What is blockchain technology?</Text>
                        <Text mb="16px">A: Blockchain technology is a decentralized, distributed ledger system that records and verifies transactions across multiple computers. It provides transparency, security, and immutability to various applications, including cryptocurrencies.</Text>

                        <Text fontSize="18px" fontWeight="bold" mb="8px">Q: How can I buy cryptocurrencies?</Text>
                        <Text mb="16px">A: You can buy cryptocurrencies through cryptocurrency exchanges. These platforms allow you to trade fiat currency (such as USD) for cryptocurrencies or exchange one cryptocurrency for another.</Text>

                        <Text fontSize="18px" fontWeight="bold" mb="8px">Q: What is a wallet in the context of cryptocurrencies?</Text>
                        <Text mb="16px">A: A cryptocurrency wallet is a software application or a physical device that allows you to securely store, manage, and interact with your cryptocurrencies. It stores your private keys, which are required to access and transfer your digital assets.</Text>

                        <Text fontSize="18px" fontWeight="bold" mb="8px">Q: What is CrytoMentai?</Text>
                        <Text mb="16px">A: CrytoMentai is a project that focuses on Crypto Twitter Sentiment Analysis. It uses a dataset of tweets related to cryptocurrency and provides sentiment analysis for different coins. It can also provide additional information about a specific coin using ChatGPT.</Text>

                    </Box>

                    <Button colorScheme="blue" size="lg" fontSize="xl" fontWeight="bold" mb={6}>
                        Next Question
                    </Button>

                    <Box w="100%" maxW="600px">
                        <form>
                            <Textarea
                                name="prompt"
                                rows={3}
                                placeholder="Ask your questions here"
                                resize="none"
                                mb={4}
                                borderRadius={8}
                                borderColor="gray.300"
                                _focus={{ borderColor: 'blue.500' }}
                                _placeholder={{ color: 'gray.500' }}
                                _hover={{ borderColor: 'gray.400' }}
                            />

                            <Button colorScheme="blue" size="lg" width="100%" onClick={handleClickEvent}>
                                Send Prompt
                            </Button>
                        </form>
                    </Box>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default FAQPage;
