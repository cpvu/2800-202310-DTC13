import { lazy, Suspense, useEffect, useState } from 'react';
import { Container, Flex, Box, useMediaQuery } from '@chakra-ui/react';
import Footer from '../common/Footer';

const Navbar = lazy(() => import('../common/Navbar'));
const BottomNavbar = lazy(() => import('../common/BottomNavbar'));

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
      {isDesktop && <Navbar />}
      {children}
      <Container id="root" flex={'1'}></Container>
      <Footer></Footer>
      {shouldRenderBottomNavbar && (
        <Suspense fallback={<div>Loading...</div>}>
          <BottomNavbar />
        </Suspense>
      )}
    </Flex>
  );
}
