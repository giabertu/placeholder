import React, { useState } from "react";
import { Tag, TagLabel, TagLeftIcon, TagRightIcon, TagCloseButton, HStack, color, Avatar } from "@chakra-ui/react"
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleDesiredTechnologies } from "../redux/slices/menteePreferencesSlice"
import { TechnologyObj } from "../redux/types";

function TechTag({technology}: {technology: TechnologyObj}) {

  const dispatch = useAppDispatch();
  const techToTeach = useAppSelector((state) => state.menteePreferences.desiredTechnologies);
  const selected = techToTeach.find((tech) => tech.name === technology.name);

  return (
    <Tag size={"lg"} key={technology.name} variant='subtle' style={{cursor: "pointer", transition: 'color 0.4s ease-out, background-color 0.4s ease-out'}} colorScheme={selected ? "red" : 'cyan'} onClick={() => dispatch(toggleDesiredTechnologies(technology))}>
      <TagLeftIcon boxSize='12px' as={selected ? CloseIcon : AddIcon }/>
      <TagLabel>{technology.name}</TagLabel>
      {technology.imageSrc && <Avatar
        borderRadius={0}
        bg="transparent"
        src={technology.imageSrc}
        size='sm'
        width={"auto"}
        maxHeight={"fit-content"}
        name='Segun Adebayo'
        mt={1.5}
        mb={1}
        ml={2}
        mr={1}
      />}
    </Tag>
  )
}

export default TechTag;