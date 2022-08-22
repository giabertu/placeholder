import autocompleteOptions from "../utils/autocompleteData.json";
import { Flex, FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList, AutoCompleteTag } from "@choc-ui/chakra-autocomplete";


function AutocompleteInput() {

  const [value, setValue] = useState("");

  const handleInputChange = function (event: ChangeEvent<HTMLInputElement>) {
    const currentValue = event.target.value;
    setValue(currentValue);
  }

  const onAutoCompleteChange = function (tags: string[]) {
    console.log(tags);
  }

  const onAutocompleteSelect = function (params: any) {
    setValue("");
  }

  return (
    <div>
   <Flex pt="48" justify="center" align="center" w="full" direction="column" className="">
      <FormControl id="email" w="60">
        <FormLabel>Test Label</FormLabel>
        <AutoComplete openOnFocus multiple onChange={tags => onAutoCompleteChange(tags)} onSelectOption={onAutocompleteSelect}>
          <AutoCompleteInput variant="filled" value={value} onChange={handleInputChange} autoComplete="off">
            {({ tags }) =>  (
              tags.map((tag, tid) => (
                <AutoCompleteTag
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
                textTransform="capitalize"
                _selected={{ bg: "whiteAlpha.50" }}
                _focus={{ bg: "whiteAlpha.100" }}
              >
                {technology}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      </FormControl>
    </Flex>
    </div>
  )
};

export default AutocompleteInput