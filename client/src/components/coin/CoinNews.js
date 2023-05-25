import { useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Text, Image, Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewsComponent = ({ news }) => {

  useEffect(() => {
    console.log(news)
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };



  const { coin } = useRouter().query;

  const getDefaultImage = () => {
    return `/${coin}.png`;
  };

  return (
    <Box>
      <Heading my={"30px"}>Latest News Sentiments</Heading>
      <Slider {...settings}>
        {news ? (
          news.map((newsItem, index) => (
            <Box key={index} p={4} textAlign="center" maxW={"500px"} maxH={"500px"}>
              <Flex justifyContent={"center"}>
                {newsItem.image_url ? (
                  <Image src={newsItem.image_url} alt="News" align={"center"} w='80%' maxHeight='60%' />
                ) : (
                  <Image src={getDefaultImage()} alt="Default" maxWidth='56%' maxHeight='60%' my={"auto"} />
                )}
              </Flex>
              <Text fontSize="lg" fontWeight="bold" mt={4}>
                {newsItem.title}
              </Text>
              <Text fontSize={"12px"}>{newsItem.description ? (newsItem.description).split('. ')[0] : <></>}</Text>
              <Text color="blue.500" textDecoration="underline" mt={2} as="a" href={newsItem.link} target="_blank" rel="noopener noreferrer">
                Read More
              </Text>
            </Box>
          ))
        ) : (
          <Text>No news available.</Text>
        )}
      </Slider>
    </Box>
  );
};

export default NewsComponent;
