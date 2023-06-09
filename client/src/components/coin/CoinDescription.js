import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import fetchCoinInformation from "./services/fetchCoinInformation";

//Component to display coin description
export default function CoinDescription({ description }) {
  return (
    <Box width={"100%"}>
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Market Cap:
              </Heading>
              <Text pt="2" fontSize="sm">
                {description.marketCap}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                History:
              </Heading>
              <Text pt="2" fontSize="sm">
                {description.history}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Founder
              </Heading>
              <Text pt="2" fontSize="sm">
                {description.founder}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Year Founded
              </Heading>
              <Text pt="2" fontSize="sm">
                {description.yearFounded}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}
