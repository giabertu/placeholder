import autocompleteOptions from "../utils/autocompleteData.json";
import { Flex, flexbox, FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList, AutoCompleteTag } from "@choc-ui/chakra-autocomplete";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleDesiredTechnologies } from '../redux/slices/mentorPreferencesSlice';
import { toggleExperiencedWithTechnologies } from "../redux/slices/userInfoSlice";


function AutocompleteInput({learnOrLearnt}: {learnOrLearnt: "to learn" | "experienced"}) {

  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");

  const handleInputChange = function (event: ChangeEvent<HTMLInputElement>) {
    const currentValue = event.target.value;
    setValue(currentValue);
  }

  const handleTagRemove = function (tag: string) {
    const valueObj = {
      name: tag,
      imageSrc: ""
    };
    learnOrLearnt === "to learn" ? dispatch(toggleDesiredTechnologies(valueObj)) : dispatch(toggleExperiencedWithTechnologies(valueObj));
  };

  const handleTagSelect = function (params: any) {
    const valueObj = {
      name: params.item.value,
      imageSrc: ""
    };
    learnOrLearnt === "to learn" ? dispatch(toggleDesiredTechnologies(valueObj)) : dispatch(toggleExperiencedWithTechnologies(valueObj));
    setValue("");
  }

  return (
  //  <Flex pt="48" justify="center" align="center" w="full" direction="column" className="" bg="red.400">
      <FormControl style={{width: "28vw"}}>
        {/* <FormLabel>Test Label</FormLabel> */}
        <AutoComplete openOnFocus multiple onChange={tags => console.log(tags)} onTagRemoved={handleTagRemove} onSelectOption={handleTagSelect}>
          <AutoCompleteInput variant="filled" value={value} placeholder="Type technology here..." onChange={handleInputChange} autoComplete="off">
            {({ tags }) =>  (
              tags.map((tag, tid) => (
                <AutoCompleteTag
                  // backgroundColor={"#F08080"}
                  key={tid}
                  label={tag.label}
                  onRemove={tag.onRemove}
                />
              )))
            }
          </AutoCompleteInput>
          <AutoCompleteList>
            {autocompleteOptions.map((technology, index) => (
              <AutoCompleteItem
                key={`option-${index}`}
                value={technology}
                // textTransform="capitalize"
                _selected={{ bg: "whiteAlpha.50" }}
                _focus={{ bg: "whiteAlpha.100" }}
              >
                {technology}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      </FormControl>
    // </Flex>
  )
};

export default AutocompleteInput