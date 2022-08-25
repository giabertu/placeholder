import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  AvatarBadge,
  Flex,
  Icon,
  chakra,
  AvatarGroup,
  Tag,
} from '@chakra-ui/react';
import { IoSendSharp } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs"
import { ChatEngineUser, UserType } from '../lib/models/User';
import { GoLocation } from 'react-icons/go';

function DashboardMenteeProfile({ profile }: { profile: { user: UserType, chatEngineUser: ChatEngineUser } }) {

  const desiredCategories = profile.user.custom_json.mentorPreferences.desiredCategories;
  const desiredTechnologies = profile.user.custom_json.mentorPreferences.desiredTechnologies;
  const location = profile.user.custom_json.location;

  return (
    <Center py={6}>
      <Box
        position={'relative'}
        maxW={'280px'}
        minW={'280px'}
        height={"330px"}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        // bg="red"
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>

        <Flex alignItems="center" justifyContent="space-evenly">
          <Avatar
            size='lg'
            src={profile.user.custom_json.avatar}
            // alt={'Avatar Alt'}
            pos={'relative'}
          >
            <AvatarBadge boxSize='0.4em' border='none' right='0.25em' bottom='0.2em' outline={'solid 1px white'} bg={profile.chatEngineUser.is_online ? 'green.500' : 'gray.500'} />
          </Avatar>
        </Flex>

        <Flex flexDirection="column" gap="0.6rem" mt={2} alignItems="center" mb={2}>

          <Flex flexDirection="column" gap="0.1rem" alignItems="center">
            <Heading fontSize='xl'>
              {profile.user.first_name}
            </Heading>
            <Flex flexDirection="row" alignItems="center" gap="0.8rem">
              <Icon as={GoLocation} h={4} w={4} mr={-2.5} />
              <Text fontSize="md">
                {location[0].toUpperCase() + location.slice(1)}
              </Text>
            </Flex>
          </Flex>

          {Boolean(desiredTechnologies.length) &&
            <Flex
              justifyContent="center"
              alignItems="center"
              // mt={4}
              _dark={{
                color: "gray.200",
              }}
            >
              {/* <Icon as={FaGraduationCap} h={6} w={6} mr={2} /> */}
              {/* <chakra.h3 px={2} fontSize="sm" fontWeight="hairline"> */}
              <Text display="inline" fontWeight="extrabold">Wants to learn</Text>
              {/* </chakra.h3> */}
              <AvatarGroup size='sm' max={7} marginLeft='0.4rem' >
                {desiredTechnologies.map(technology => {
                  if (typeof technology == 'string') {
                    return <Tag>{technology}</Tag>
                  }
                  return <Avatar src={technology.imageSrc} bg='transparent' border='none' borderRadius='none' scale={0.7} minWidth='fit-content' />
                })}
              </AvatarGroup>
            </Flex>
          }

          {desiredCategories.includes("developer careers") &&
            <Text display="inline" fontWeight="extrabold" position="relative" top="0.5rem">Would like to speak about developer careers</Text>
          }
        </Flex>

        <Stack mt={9} direction={'row'} spacing={3} position="absolute" bottom={"15px"}>
          <Button
            leftIcon={<BsPersonCircle />}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            Profile
          </Button>
          <Button
            leftIcon={<IoSendSharp />}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Message
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}

export default DashboardMenteeProfile