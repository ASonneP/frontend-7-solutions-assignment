import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Button,
  useColorMode,
  IconButton,
  Link,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import details from "../lib/details";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const isActive = (route: any) => {
    return route === router.pathname;
  };

  const linkHoverStyle = {
    textDecoration: "none",
    color: "orange",
  };

  const toggleIcon = colorMode === "dark" ? <SunIcon /> : <MoonIcon />;

  // Handle resize event
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 830); // For example, 768px is your md breakpoint
    };

    handleResize(); // Set initial state on client-side load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Flex
      as="nav"
      paddingY="1rem"
      paddingX="2rem"
      bg={useColorModeValue("blue.100", "blue.900")}
      color={useColorModeValue("blue.600", "white")}
      justifyContent="space-between"
      alignItems="center"
      gap="2"
    >
      <Box mr="8">
        <Link
          href="/"
          _hover={linkHoverStyle}
          style={{ color: isActive("/") ? "orange" : undefined }}
        >
          <Text fontSize={["md", "lg", "xl", "2xl"]} fontWeight="bold">
            7 solutions test
          </Text>
        </Link>
      </Box>
      {isMobile === false && (
        <>
          {Object.values(details.testMap).map((test, index) => (
            <Box key={index} mr="4">
              <Link
                href={test.testRoute}
                _hover={linkHoverStyle}
                style={{
                  color: isActive(test.testRoute) ? "orange" : undefined,
                }}
              >
                <Text fontSize={["md", "lg", "xl"]} fontWeight="bold">
                  {test.testTitle}
                </Text>
              </Link>
            </Box>
          ))}
          {/* <Box mr="4">
            <Link
              href="/1-auto-delete-todo-list"
              _hover={linkHoverStyle}
              style={{
                color: isActive("/1-auto-delete-todo-list")
                  ? "orange"
                  : undefined,
              }}
            >
              <Text fontSize={["md", "lg", "xl"]} fontWeight="bold">
                Auto Delete Todo List
              </Text>
            </Link>
          </Box>

          <Box>
            <Link
              href="/contact"
              _hover={linkHoverStyle}
              style={{ color: isActive("/contact") ? "orange" : undefined }}
            >
              <Text fontSize={["md", "lg", "xl"]} fontWeight="bold">
                Contact
              </Text>
            </Link>
            
          </Box> */}

          <Spacer />
          <Box mr={2}>
            <IconButton
              aria-label="Toggle theme"
              icon={toggleIcon}
              onClick={toggleColorMode}
              colorScheme="teal"
              isRound={true}
              mr="1rem"
            />

            {/* <Button colorScheme="blue" mr="1rem">
                <Link href="/login" _hover={{ textDecoration: "none" }}>
                  Login
                </Link>
              </Button>
              <Button colorScheme="blue">Sign Up</Button> */}
          </Box>
        </>
      )}

      {isMobile && (
        <>
          <Box>
            <Flex>
              <Box>
                <IconButton
                  aria-label="Toggle theme"
                  icon={toggleIcon}
                  onClick={toggleColorMode}
                  colorScheme="teal"
                  isRound={true}
                  mr="1rem"
                />
              </Box>
              <Box>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<HamburgerIcon />}
                    variant="outline"
                    size="lg"
                  />
                  <MenuList>
                    {Object.values(details.testMap).map((test, index) => (
                      <MenuItem
                        as="a"
                        key={index}
                        href={test.testRoute}
                        _hover={linkHoverStyle}
                        style={{
                          color: isActive(test.testRoute)
                            ? "orange"
                            : undefined,
                        }}
                      >
                        <Text
                          fontSize={["md", "lg", "xl", "2xl"]}
                          fontWeight="bold"
                        >
                          {test.testTitle}
                        </Text>
                      </MenuItem>
                    ))}
                    {/* <MenuItem
                      as="a"
                      href="/1-auto-delete-todo-list"
                      _hover={linkHoverStyle}
                      style={{
                        color: isActive("/1-auto-delete-todo-list")
                          ? "orange"
                          : undefined,
                      }}
                    >
                      <Text
                        fontSize={["md", "lg", "xl", "2xl"]}
                        fontWeight="bold"
                      >
                        Auto Delete Todo List
                      </Text>
                    </MenuItem>
                    <MenuItem
                      as="a"
                      href="/contact"
                      _hover={linkHoverStyle}
                      style={{
                        color: isActive("/contact") ? "orange" : undefined,
                      }}
                    >
                      <Text
                        fontSize={["md", "lg", "xl", "2xl"]}
                        fontWeight="bold"
                      >
                        Contact
                      </Text>
                    </MenuItem> */}

                    {/* <MenuItem>
                        <Button as="div" colorScheme="blue" w="100%">
                          Login
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button as="div" colorScheme="blue" w="100%">
                          Sign Up
                        </Button>
                      </MenuItem> */}
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
          </Box>
        </>
      )}
    </Flex>
  );
}
