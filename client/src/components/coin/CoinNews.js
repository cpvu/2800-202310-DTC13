import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Text, Image, Flex, Heading, Button, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewsComponent = ({ news }) => {
  const [sentiments, setSentiments] = useState({});

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

  const handleSentimentAnalysis = async (title) => {
    try {
      const response = await fetch('YOUR_SENTIMENT_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const data = await response.json();
        setSentiments((prevSentiments) => ({ ...prevSentiments, [title]: data.sentiment }));
      } else {
        console.error('Failed to analyze sentiment');
      }
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
  };

  const { coin } = useRouter().query;

  const getDefaultImage = () => {
    return `/${coin}.png`;
  };

  return (
    <>
    <Heading my={"30px"}>Latest News Sentiments</Heading>
    <Box py={"15px"} backgroundColor={"gray.200"} rounded={"lg"}  mb={"20px"} border={"1px"} borderColor={"gray.300"}>
      <Slider {...settings}>
        {news ? (
          news.map((newsItem, index) => (
            <Box key={index} p={4} textAlign="left" w={"500px"} h={"580px"} maxH={"80%"}>
              <Flex justifyContent={"center"}>
                {newsItem.image_url ? (
                  <Image src={newsItem.image_url} alt="News" align={"center"} w='250px' h="250px" />
                ) : (
                  <Image src={getDefaultImage()} alt="Default" w='250px' h="250px" my={"auto"} />
                )}
              </Flex>
              <Text my={"5px"} fontSize="lg" fontWeight="bold" mt={4}>
                {newsItem.title}
              </Text>
              <Text my={"5px"} fontSize={"12px"}>{newsItem.description ? (newsItem.description).split('. ')[0] : <p>No description available. View the article for more information.</p>}</Text>

              <Flex display={"block"} position={"fixed"} bottom={0}>
              <Text py={"15px"} color="blue.500" textDecoration="underline" as="a" href={newsItem.link} target="_blank" rel="noopener noreferrer">
                Read More
              </Text>

              <Button
                colorScheme="blue"
                display={"flex"}
                justifyContent={"right"}
                size="sm"
                my={"10px"}
                onClick={() => handleSentimentAnalysis(newsItem.title)}
                disabled={sentiments[newsItem.title]}
              >
                {sentiments[newsItem.title] ? 'Sentiment Analyzed' : 'Analyze Sentiment'}
              </Button>
              </Flex>
            </Box>
          ))
        ) : (
          <Text>No news available.</Text>
        )}
      </Slider>
    </Box>
    </>
  );
};

export default NewsComponent;
