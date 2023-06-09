import { Center, Divider, useMediaQuery } from "@chakra-ui/react";

export default function TokenPageDivider() {
  const [isSmScreen] = useMediaQuery("(max-width: 640px)");
  return (
    <>
      {" "}
      {isSmScreen ? (
        <Center height="50px">
          <Divider orientation="vertical" borderColor="gray.500" />
        </Center>
      ) : (
        <></>
      )}{" "}
    </>
  );
}
