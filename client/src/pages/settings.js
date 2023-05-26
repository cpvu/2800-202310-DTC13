import { useSession, getSession } from "next-auth/react"
import { Box, Heading, FormControl, FormLabel, Button, Switch, Avatar, Input } from "@chakra-ui/react";

//Component to display setting
export default function Settings() {
    const { data: session } = useSession()
    return (
        <>
            {session ? 
            <Box minW={"40vh"} w={"25%"} maxW="50%" minH={"40vh"} mx="auto" p={"80px"} bg="light blue" boxShadow="lg" borderRadius="md" mt={"100"} bgGradient="linear(to-r, #E2E8F0, #EDF2F7)">
                <Box textAlign="center" mb={8}>
                    <Avatar size="xl" name="John Doe" src="/path-to-profile-image.jpg" mb={2} />
                    <Heading size="md">ID: {session.user.name}</Heading>
                    <Box color="gray.500" fontSize="sm" mt={1}>
                        calvin1234@hotmail.com
                    </Box>
                </Box>

                <Heading size="sm" mb={4}>Settings</Heading>

                <FormControl display="flex" alignItems="center" mb={6}>
                    <FormLabel htmlFor="darkMode" flex="1" mb={0}>
                        First Name:
                    </FormLabel>
                    <Input type="text" bg={"white"} w={"40%"} placeholder="Calvin" />
                </FormControl>

                <FormControl display="flex" alignItems="center" mb={6}>
                    <FormLabel htmlFor="darkMode" flex="1" mb={0}>
                        Last name
                    </FormLabel>
                    <Input type="text" bg={"white"} w={"40%"} placeholder="Vu"/>
                </FormControl>

                <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel htmlFor="darkMode" flex="1" mb={0}>
                        Dark Mode
                    </FormLabel>
                    <Switch id="darkMode" />
                </FormControl>

                <FormControl display="flex" alignItems="center" mb={6}>
                    <FormLabel htmlFor="notifications" flex="1" mb={0}>
                        Notifications
                    </FormLabel>
                    <Switch id="notifications" />
                </FormControl>

                <Button colorScheme="blue">Save Changes</Button>
            </Box>
            : <h1>Unauthorized</h1>}
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: {
            session: session,
        },
    };
}