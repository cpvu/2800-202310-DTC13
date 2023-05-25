import { lazy, Suspense, useEffect, useState } from 'react';
import { Container, Flex, Box, useMediaQuery } from '@chakra-ui/react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

export default function Layout({ children }) {
  const [isDesktop] = useMediaQuery('(min-width: 768px)');
  const [shouldRenderBottomNavbar, setShouldRenderBottomNavbar] = useState(false);

  useEffect(() => {
    setShouldRenderBottomNavbar(!isDesktop);
  }, [isDesktop]);

  return (
    <Flex
      minW={'100%'}
      minH={'100vh'}
      display="flex"
      flexDirection="column"
      overflow="hidden"
      p={0}
    >
    <Navbar />
      {children}
      <Container id="root" flex={'1'}></Container>
      <Footer></Footer>
    </Flex>
  );
}
