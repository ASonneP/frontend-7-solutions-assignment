import {
  Box,
  Heading,
  Text,
  Link,
  List,
  ListItem,
  useColorModeValue,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import details from "../lib/details";

const Hero: React.FC = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const headingColor = useColorModeValue("gray.800", "white");
  const linkColor = useColorModeValue("blue.600", "blue.300");

  const linkHoverStyle = {
    textDecoration: "none",
    color: "orange",
  };

  return (
    <Box textAlign="center" py={10} px="20%" bg={bgColor}>
      <Heading as="h2" size="xl" mb={10} color={headingColor}>
        {details.testTitle}
      </Heading>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={4}
        px="20%"
        alignItems="top"
        justifyItems="left"
      >
        <GridItem>
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Participant:
          </Text>
        </GridItem>
        <GridItem>
          <Link
            _hover={linkHoverStyle}
            href={details.cv}
            color={linkColor}
            fontSize="lg"
            fontWeight="bold"
            isExternal
          >
            {details.participant}
          </Link>
        </GridItem>
        <GridItem>
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Test Information:
          </Text>
        </GridItem>
        <GridItem>
          <List spacing={2} textAlign="left" color={textColor} m={0}>
            {Object.values(details.testMap).map((test, index) => (
              <ListItem key={index}>
                <Link
                  _hover={linkHoverStyle}
                  href={test.testRoute}
                  color={linkColor}
                  fontSize="lg"
                  fontWeight="bold"
                >
                  {" "}
                  {test.testTitle}
                </Link>
              </ListItem>
            ))}
          </List>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Hero;
