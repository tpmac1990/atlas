
import axios from 'axios';


function getHolderOptions(){
    return axios.get("/holders-list/")
    .then(res => {
        return res.data
        })
    .catch(err => {
        return {value: '', label: ''}
        })
}


// search = value entered in the select box.
// prevOptions = list of values already in the dropdown. When scrolled past the end, more values will be added.
async function loadOptions(search, prevOptions){

    const options = await getHolderOptions()

    let filteredOptions;
    if (!search) {
        filteredOptions = options;
    } else {
        const searchLower = search.toLowerCase();

        filteredOptions = options.filter(({ label }) =>
        label.toLowerCase().includes(searchLower)
        );
    }

    const hasMore = filteredOptions.length > prevOptions.length + 10;
    const slicedOptions = filteredOptions.slice(
        prevOptions.length,
        prevOptions.length + 10
    );

    return {
        options: slicedOptions,
        hasMore
    };
};

export default loadOptions;
