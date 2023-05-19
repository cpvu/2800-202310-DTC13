import { Box, Button, ChakraProvider, Textarea, VStack } from '@chakra-ui/react';
import React from 'react';

const FAQPage = () => {
    return (
        <ChakraProvider>
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
                    >
                        <div>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>FAQ</h2>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: What is cryptocurrency?</h3>
                            <p style={{ marginBottom: '16px' }}>A: Cryptocurrency is a digital or virtual form of currency that uses cryptography for secure financial transactions, control the creation of new units, and verify the transfer of assets.</p>

                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: What are some popular cryptocurrencies?</h3>
                            <p style={{ marginBottom: '16px' }}>A: Some popular cryptocurrencies include Bitcoin (BTC), Ethereum (ETH), Binance Coin (BNB), Cardano (ADA), and Solana (SOL), among others.</p>

                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: How does cryptocurrency mining work?</h3>
                            <p style={{ marginBottom: '16px' }}>A: Cryptocurrency mining involves using powerful computers to solve complex mathematical problems that validate and secure transactions on the blockchain network. Miners are rewarded with newly created cryptocurrency tokens for their computational efforts.</p>

                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: What is blockchain technology?</h3>
                            <p style={{ marginBottom: '16px' }}>A: Blockchain technology is a decentralized, distributed ledger system that records and verifies transactions across multiple computers. It provides transparency, security, and immutability to various applications, including cryptocurrencies.</p>

                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: How can I buy cryptocurrencies?</h3>
                            <p style={{ marginBottom: '16px' }}>A: You can buy cryptocurrencies through cryptocurrency exchanges. These platforms allow you to trade fiat currency (such as USD) for cryptocurrencies or exchange one cryptocurrency for another.</p>

                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: What is a wallet in the context of cryptocurrencies?</h3>
                            <p style={{ marginBottom: '16px' }}>A: A cryptocurrency wallet is a software application or a physical device that allows you to securely store, manage, and interact with your cryptocurrencies. It stores your private keys, which are required to access and transfer your digital assets.</p>

                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: What is CrytoMentai?</h3>
                            <p style={{ marginBottom: '16px' }}>A: CrytoMentai is a project that focuses on Crypto Twitter Sentiment Analysis. It uses a dataset of tweets related to cryptocurrency and provides sentiment analysis for different coins. It can also provide additional information about a specific coin using ChatGPT.</p>

                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Q: What is NFT price analysis?</h3>
                            <p style={{ marginBottom: '16px' }}>A: NFT price analysis involves analyzing data related to Non-Fungible Tokens (NFTs) to determine suggested popular NFT investment values. It helps users make informed decisions about investing in NFTs.</p>
                        </div>

                    </Box>
                    <Button colorScheme="blue" size="lg" fontSize="xl" fontWeight="bold">
                        Next Question
                    </Button>
                    <Box w="100%" maxWidth={600}>
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
                            ></Textarea>
                            <Button colorScheme="blue" size="lg" width="100%">
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
