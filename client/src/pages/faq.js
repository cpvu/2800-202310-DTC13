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
          ></Box>
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
