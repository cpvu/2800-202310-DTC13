import { FAQ_ENDPOINT } from '@/constants/endpoints';
import { Box, Button, ChakraProvider, Textarea, VStack } from '@chakra-ui/react';
import { Bubbler_One } from 'next/font/google';
import React from 'react';



const handleClickEvent = async (event) => {
    const prompt = document.getElementsByName('prompt')[0].value;
    const ChatBox = document.getElementById('ChatBox');
    const newQuestion = document.createElement('div');
    newQuestion.innerHTML = `<h3 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">Q: ${prompt}</h3>
                             `;
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
            newAnswer.innerHTML = `<strong>A</strong>: ${data.bot}`;
            newAnswer.innerHTML += `<hr style="border: 1px solid black; color: black;" />`;
            ChatBox.appendChild(newAnswer);
        }
        );
};
const FAQPage = () => {
    return (
        <ChakraProvider >
            <Box minH="100vh" p={10} display="flex" justifyContent="center" alignItems="center">
                <VStack spacing={8} align="center">
                    <Box
                        id="chat_container"
                        w="100%"
                        h="35rem"
                        border="1px solid #ccc"
                        overflowY="auto"
                        p={4}
                        boxShadow="md"
                        borderRadius={20}
                        maxWidth={600}
                        backgroundColor="grey"
                    >
                        <img src='https://www.proofpoint.com/sites/default/files/styles/metatag/public/blog-banners/pfpt-blog-banner-bitcoin.jpg?itok=AsjmxroA'/>
                        <div id='ChatBox'>
                            
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', fontStyle: 'italic', textAlign: 'center', textDecoration: 'underline'}}>FAQ</h2>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: What is cryptocurrency?</h3>
                            <p style={{ marginBottom: '16px', font: 'oblique'}}><strong>A</strong>: Cryptocurrency is a digital or virtual form of currency that uses cryptography for secure financial transactions, control the creation of new units, and verify the transfer of assets.</p>
                            <hr style={{ border: '1px solid black' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: What are some popular cryptocurrencies?</h3>
                            <p style={{ marginBottom: '16px', fontStyle: 'italic' }}><strong>A</strong>: Some popular cryptocurrencies include Bitcoin (BTC), Ethereum (ETH), Binance Coin (BNB), Cardano (ADA), and Solana (SOL), among others.</p>
                            <hr style={{ border: '1px solid black' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: How does cryptocurrency mining work?</h3>
                            <p style={{ marginBottom: '16px', fontStyle: 'italic' }}><strong>A</strong>: Cryptocurrency mining involves using powerful computers to solve complex mathematical problems that validate and secure transactions on the blockchain network. Miners are rewarded with newly created cryptocurrency tokens for their computational efforts.</p>
                            <hr style={{ border: '1px solid black' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: What is blockchain technology?</h3>
                            <p style={{ marginBottom: '16px', fontStyle: 'italic' }}><strong>A</strong>: Blockchain technology is a decentralized, distributed ledger system that records and verifies transactions across multiple computers. It provides transparency, security, and immutability to various applications, including cryptocurrencies.</p>
                            <hr style={{ border: '1px solid black' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: How can I buy cryptocurrencies?</h3>
                            <p style={{ marginBottom: '16px', fontStyle: 'italic' }}><strong>A</strong>: You can buy cryptocurrencies through cryptocurrency exchanges. These platforms allow you to trade fiat currency (such as USD) for cryptocurrencies or exchange one cryptocurrency for another.</p>
                            <hr style={{ border: '1px solid black' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: What is a wallet in the context of cryptocurrencies?</h3>
                            <p style={{ marginBottom: '16px', fontStyle: 'italic' }}><strong>A</strong>: A cryptocurrency wallet is a software application or a physical device that allows you to securely store, manage, and interact with your cryptocurrencies. It stores your private keys, which are required to access and transfer your digital assets.</p>
                            <hr style={{ border: '1px solid black' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: What is CrytoMentai?</h3>
                            <p style={{ marginBottom: '16px', fontStyle: 'italic' }}><strong>A</strong>: CrytoMentai is a project that focuses on Crypto Twitter Sentiment Analysis. It uses a dataset of tweets related to cryptocurrency and provides sentiment analysis for different coins. It can also provide additional information about a specific coin using ChatGPT.</p>
                            <hr style={{ border: '1px solid black' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: What is NFT price analysis?</h3>
                            <p style={{ marginBottom: '16px', fontStyle: 'italic' }}><strong>A</strong>: NFT price analysis involves analyzing data related to Non-Fungible Tokens (NFTs) to determine suggested popular NFT investment values. It helps users make informed decisions about investing in NFTs.</p>
                            <hr style={{ border: '1px solid black' }} />
                        </div>

                    </Box>
                    <Button colorScheme="blue" size="lg" fontSize="xl" fontWeight="bold">
                        New Question
                    </Button>
                    <Box w="100%" maxWidth={600}>
                        <form>
                            <Textarea
                                name="prompt"
                                rows={3}
                                placeholder="Ask a question here"
                                resize="none"
                                mb={4}
                                borderRadius={8}
                                borderColor="gray.300"
                                _focus={{ borderColor: 'blue.500' }}
                                _placeholder={{ color: 'black.500' }}
                                _hover={{ borderColor: 'gray.400' }}
                            ></Textarea>
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
