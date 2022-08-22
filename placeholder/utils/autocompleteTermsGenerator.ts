var fs = require('fs');
import techData from "./techterms.json";

let options: any = techData.map((tech) => {
  return {
    value: tech.tagName,
    label: tech.tagName
  }
});

options = JSON.stringify(options);

fs.writeFile("autocompleteData.json", options, function(error: any) {
    if (error) {
        console.log(error);
    }
});

export default techData;