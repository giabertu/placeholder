import { Avatar, AvatarBadge, Box, chakra, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react'
import { EmailIcon } from '@chakra-ui/icons';
import { GoRocket, GoLocation } from "react-icons/go";
import { GiChart } from "react-icons/gi"
import { BiCodeAlt } from "react-icons/bi"
import { ChatEngineUser, User, UserType } from '../lib/models/User';


function MatchedUserCard({ matchedUser }: {matchedUser: {user: UserType, chatEngineUser: ChatEngineUser}}) {

  const preferenceGenerator = function() {
    if (matchedUser.user.custom_json.mentorPreferences.desiredCategories.length === 2) return " about programming and developer careers"
    else if (matchedUser.user.custom_json.mentorPreferences.desiredCategories.includes("learning how to program")) return " how to program"
    else return "about developer careers"
  }

  return (
    <Flex
      bg="#fff"
      _dark={{
        bg: "#1a202c",
      }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        border="1px white solid"
        borderRadius="md"
        w="sm"
        mx="auto"
        bg="white"
        _dark={{
          bg: "gray.800",
          shadow: "none"
        }}
        shadow="lg"
        // rounded="md"
        overflow="hidden"
      >

        <Flex alignItems="center" px={6} py={3} bg="#fff" paddingRight={4} _dark={{
            bg: "#1a202c",
          }}>
          <Avatar name={matchedUser.user.first_name + " " + matchedUser.user.last_name} src={matchedUser.user.custom_json.avatar} size="xl">
            <AvatarBadge boxSize='0.4em' border='none' right='0.25em' bottom='0.2em' outline={'solid 1px white'} bg={matchedUser.chatEngineUser.is_online ? 'green.500' : 'gray.500'} />
          </Avatar>
          <Flex flexDirection="column" paddingLeft={"1rem"} alignItems="center" width="100%">
            <chakra.h1
              fontSize="2xl"
              // display="block"
              // fontWeight="bold"
              color="#1a202c"
              _dark={{
                color: "#fff",
              }}
            >
              {matchedUser.user.first_name} {matchedUser.user.last_name}
            </chakra.h1>
            <Flex alignItems="center" gap={3}>
            <chakra.h2 fontSize="md">
                {matchedUser.user.username}
              </chakra.h2>
              <Icon as={GoLocation} h={4} w={4} mr={-3} />
              <chakra.h2 fontSize="md">
                {matchedUser.user.custom_json.location[0].toUpperCase() + matchedUser.user.custom_json.location.slice(1)}
              </chakra.h2>
            </Flex>
          </Flex>

          <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg" _dark={{
            color: "#1a202c",
          }}>
            {matchedUser.user.custom_json.developerField}
          </chakra.h1>
        </Flex>

        {matchedUser.user.custom_json.level === "beginner" &&
        <Flex alignItems="center" px={6} py={3} bg="gray.900" _dark={{
            bg: "#fff",
          }}>
          <Icon as={GiChart} h={6} w={6} color="white" _dark={{
            color: "#1a202c",
          }}/>

          <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="md" _dark={{
            color: "#1a202c",
          }}>
            Beginner - just getting started!
            {/* {matchedUser.user.custom_json.developerField} */}
          </chakra.h1>
        </Flex>
        }

        {matchedUser.user.custom_json.level !== "beginner" &&
        <Flex alignItems="center" px={6} py={3} bg="gray.900" _dark={{
            bg: "#fff",
          }}>
          <Icon as={BiCodeAlt} h={6} w={6} color="white" _dark={{
            color: "#1a202c",
          }}/>

          <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="md" _dark={{
            color: "#1a202c",
          }}>
            {matchedUser.user.custom_json.level} {matchedUser.user.custom_json.developerField}
            {/* {matchedUser.user.custom_json.developerField} */}
          </chakra.h1>
        </Flex>
        }

      <Box py={4} px={6} _dark={{
          bg: "#1a202c",
        }}>
      <chakra.h1
        fontSize="xl"
        fontWeight="bold"
        color="gray.800"
        _dark={{
          color: "white",
        }}
      >
        {matchedUser.user.first_name} {matchedUser.user.last_name}
      </chakra.h1>

      <chakra.p
        py={2}
        color="gray.700"
        _dark={{
          color: "gray.400",
        }}
      >
        {matchedUser.user.custom_json.bio}
      </chakra.p>

      <Flex
        alignItems="center"
        mt={4}
        color="gray.700"
        _dark={{
          color: "gray.200",
        }}
      >
        <Icon as={GoRocket} h={6} w={6} mr={2} />
        <chakra.h3 px={2} fontSize="sm" fontWeight="hairline">
          Wants to learn <Text display="inline" fontWeight="extrabold"> {preferenceGenerator()} </Text>

        </chakra.h3>
      </Flex>

      <Flex
        alignItems="center"
        mt={4}
        color="gray.700"
        _dark={{
          color: "gray.200",
        }}
      >
        <Icon as={EmailIcon} h={6} w={6} mr={2} />

        <chakra.h1 px={2} fontSize="sm">
          California
        </chakra.h1>
      </Flex>
      <Flex
        alignItems="center"
        mt={4}
        color="gray.700"
        _dark={{
          color: "gray.200",
        }}
      >
        <Icon as={EmailIcon} h={6} w={6} mr={2} />

        <chakra.h1 px={2} fontSize="sm">
          patterson@example.com
        </chakra.h1>
      </Flex>
    </Box>
  </Box>
  </Flex>
  )
}

export default MatchedUserCard