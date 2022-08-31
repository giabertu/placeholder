import { Avatar, AvatarBadge, AvatarGroup, Box, Button, chakra, Flex, Icon, Tag, Text } from '@chakra-ui/react';
import React from 'react'
import { GoRocket, GoLocation } from "react-icons/go";
import { GiBrain, GiChart, GiPartyPopper } from "react-icons/gi"
import { BiCodeAlt, BiQuestionMark } from "react-icons/bi"
import { FaChalkboardTeacher, FaGraduationCap, FaHandsHelping } from "react-icons/fa"
import { IoSendSharp, IoAddSharp, IoCloseSharp } from "react-icons/io5"
import { ImBubbles3 } from "react-icons/im"
import { ChatEngineUser, User, UserType } from '../lib/models/User';
import ChatEngineApi from '../services/ChatEngineApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addMentorId } from '../redux/slices/mentorIdsSlice';
import { Types } from 'mongoose';



function MatchedUserCard({ matchedUser, handleAddMentor, selectedMentorIds }: { matchedUser: { user: UserType, chatEngineUser: ChatEngineUser }, handleAddMentor: any, selectedMentorIds: Types.ObjectId[] }) {


  // const preferenceGenerator = function() {
  //   if (desiredCategories.length === 2) return <Box><Text display="inline"> Down to help out with </Text><Text display="inline" fontWeight="extrabold">programming</Text><Text display="inline"> and </Text><Text display="inline" fontWeight="extrabold">developer careers</Text></Box>
  //   else if (desiredCategories.includes("advance their programming skills")) return <Box><Text display="inline"> Down to help out with </Text><Text display="inline" fontWeight="extrabold">programming</Text></Box>
  //   // else if (matchedUser.user.custom_json.mentorPreferences.desiredCategories.includes("developer careers")) return "speak about developer careers"
  //   else return <Box><Text display="inline"> Down to help out with </Text><Text display="inline" fontWeight="extrabold">developer careers</Text></Box>
  // }

  const preferenceGenerator = function () {
    if (desiredCategories.length === 2) return <Box><Text display="inline" fontWeight="extrabold">Programming</Text><Text display="inline"> and </Text><Text display="inline" fontWeight="extrabold">developer careers</Text><Text display="inline"> mentor </Text></Box>
    else if (desiredCategories.includes("advance their programming skills")) return <Box><Text display="inline" fontWeight="extrabold">Programming</Text><Text display="inline"> mentor </Text></Box>
    // else if (matchedUser.user.custom_json.mentorPreferences.desiredCategories.includes("developer careers")) return "speak about developer careers"
    else return <Box><Text display="inline" fontWeight="extrabold">Developer careers</Text><Text display="inline"> mentor </Text></Box>
  }

  const desiredCategories = matchedUser.user.custom_json.menteePreferences.desiredCategories;
  const desiredTechnologies = matchedUser.user.custom_json.menteePreferences.desiredTechnologies;
  const experiencedWithTechnologies = matchedUser.user.custom_json.experiencedWithTechnologies;
  const userId = matchedUser.user._id!;

  // console.log(matchedUser.user.first_name, desiredTechnologies)

  return (
    <Flex
      // bg="#fff"
      bg="#fff"

      _dark={{
        bg: "#1a202c",
      }}
      // p={50}
      maxWidth="35vw"
      // w="full"
      alignItems="center"
      justifyContent="center"
      paddingTop={'0'}
    >
      <Box
        // border="1px white solid"
        borderRadius="md"
        // minW={420}
        // maxW={420}
        mx="auto"
        bg="white"
        _dark={{
          bg: "gray.800",
          // shadow: "none"
          boxShadow: "0px 0px 5px #fff"
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
              marginBottom={2}
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
              <Icon as={GoLocation} h={4} w={4} mr={-2.5} />
              <chakra.h2 fontSize="md">
                {matchedUser.user.custom_json.location[0].toUpperCase() + matchedUser.user.custom_json.location.slice(1)}
              </chakra.h2>
            </Flex>
          </Flex>

          {/* <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg" _dark={{
            color: "#1a202c",
          }}>
            {matchedUser.user.custom_json.developerField}
          </chakra.h1> */}
        </Flex>

        {matchedUser.user.custom_json.level === "beginner" &&
          <Flex justifyContent="center" alignItems="center" px={6} py={3} bg="gray.600" _dark={{
            bg: "#fff",
          }}>
            <Icon as={GiChart} h={6} w={6} color="white" _dark={{
              color: "#1a202c",
            }} />

            <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="md" _dark={{
              color: "#1a202c",
            }}>
              Beginner - just getting started!
              {/* {matchedUser.user.custom_json.developerField} */}
            </chakra.h1>
          </Flex>
        }

        {matchedUser.user.custom_json.level !== "beginner" &&
          <Flex justifyContent="center" alignItems="center" px={6} py={3} bg="gray.500" _dark={{
            bg: "#fff",
          }}>
            <Icon as={BiCodeAlt} h={6} w={6} color="white" _dark={{
              color: "#1a202c",
            }} />

            <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="md" _dark={{
              color: "#1a202c",
            }}>
              {matchedUser.user.custom_json.level[0].toUpperCase() + matchedUser.user.custom_json.level.slice(1)} - {matchedUser.user.custom_json.developerField} developer
              {/* {matchedUser.user.custom_json.developerField} */}
            </chakra.h1>
          </Flex>
        }

        <Box py={4} px={6} _dark={{
          bg: "#1a202c",
        }}>

          {/* <chakra.h1
        fontSize="xl"
        fontWeight="bold"
        color="gray.800"
        _dark={{
          color: "white",
        }}
      > */}
          {/* {matchedUser.user.first_name} {matchedUser.user.last_name} */}
          {/* Bio */}
          {/* </chakra.h1> */}


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
            <Icon as={FaHandsHelping} h={6} w={6} mr={2} />
            <chakra.h3 px={2} fontSize="sm" fontWeight="hairline">
              {preferenceGenerator()}
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
            <Icon as={FaGraduationCap} h={6} w={6} mr={2} />
            <chakra.h3 px={2} fontSize="sm" fontWeight="hairline">
              <Text display="inline" fontWeight="extrabold">Down to teach </Text>
            </chakra.h3>
            <AvatarGroup size='sm' max={7} marginLeft='0.4rem' >
              {desiredTechnologies.map(technology => {
                if (typeof technology == 'string') {
                  return <Tag key={technology}>{technology}</Tag>
                }
                return <Avatar key={technology.name} src={technology.imageSrc} bg='transparent' border='none' borderRadius='none' scale={0.7} minWidth='fit-content' />
              })}
            </AvatarGroup>
          </Flex>

          {desiredCategories.includes("advance in their developer careers") &&
            <Flex
              alignItems="center"
              mt={4}
              color="gray.700"
              _dark={{
                color: "gray.200",
              }}
            >

              <Icon as={ImBubbles3} h={6} w={6} mr={2} />

              <chakra.h3 px={2} fontSize="sm" fontWeight="hairline">
                <Box><Text display="inline"> Happy to give advice about</Text><Text display="inline" fontWeight="extrabold"> {matchedUser.user.custom_json.developerField} developer careers</Text></Box>
              </chakra.h3>
            </Flex>
          }

          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
          >
            <Icon as={GiBrain} h={6} w={6} mr={2} />
            <chakra.h3 px={2} fontSize="sm" fontWeight="hairline">
              <Text display="inline" fontWeight="extrabold">Experienced with</Text>
            </chakra.h3>
            <AvatarGroup size='sm' max={7} marginLeft='0.4rem' >
              {experiencedWithTechnologies.map(technology => {
                if (typeof technology == 'string') {
                  return <Tag key={technology}>{technology}</Tag>
                }
                return <Avatar key={technology.name} src={technology.imageSrc} bg='transparent' border='none' borderRadius='none' scale={0.7} minWidth='fit-content' />
              })}
            </AvatarGroup>
          </Flex>


          {desiredCategories.includes("learning how to program") &&
            <Flex
              alignItems="center"
              mt={4}
              color="gray.700"
              _dark={{
                color: "gray.200",
              }}
            >
              {desiredTechnologies.length === 0 ? <Icon as={BiQuestionMark} h={6} w={6} mr={2} /> : <Icon as={FaChalkboardTeacher} h={6} w={6} mr={2} />}
              <chakra.h3 px={2} fontSize="sm" fontWeight="hairline">
                {/* The "general" string is not being successfully uploaded to the DB, so in the interim we replace checking for general with checking if length === 0 below */}
                {/* {desiredTechnologies.includes("general") ? "Unsure of which technologies to start learning" : "Technologies of interest:"} */}
                {desiredTechnologies.length === 0 ? <Box> <Text display="inline" fontWeight="extrabold">Unsure</Text> <Text display="inline"> of which technologies to start learning </Text> </Box> : "Technologies of interest:"}

              </chakra.h3>
              {desiredTechnologies.length === 0 ||
                <AvatarGroup size='sm' max={7} marginLeft='0.4rem' >
                  {desiredTechnologies.map(technology => {
                    if (typeof technology == 'string') {
                      return <Tag key={technology}>{technology}</Tag>
                    }
                    return <Avatar key={technology.name} src={technology.imageSrc} bg='transparent' border='none' borderRadius='none' scale={0.7} minWidth='fit-content' />
                  })}
                </AvatarGroup>}
            </Flex>
          }


          <Flex
            justifyContent="center"
            mt={6}
            color="gray.700"
            gap={3}
            _dark={{
              color: "gray.200",
            }}
          >
            {/* <Button leftIcon={<IoSendSharp />} colorScheme='cyan' variant='outline'>
          Message now
        </Button> */}
            <Button leftIcon={selectedMentorIds.includes(userId) ? <GiPartyPopper /> : <IoAddSharp />} style={{ cursor: "pointer", transition: 'color 0.4s ease-out, background-color 0.4s ease-out' }} colorScheme={selectedMentorIds.includes(userId) ? "whatsapp" : 'cyan'} variant='outline' onClick={() => handleAddMentor(matchedUser)}>
              {selectedMentorIds.includes(userId) ? "Mentor added!" : "Add mentor"}
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}

export default MatchedUserCard