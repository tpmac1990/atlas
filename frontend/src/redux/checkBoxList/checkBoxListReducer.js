import { SET_CHECK_LIST_DATA, CREATE_CHECK_LIST_STATE, SET_LOADING, SET_SEARCH, FILTER_CLIENT_SIDE, RESET_OFFSET } from './checkBoxListType'

const initialState = createState()

function createState(){
    const arr = [
                'ausstate','region','local','province','typesimple','typedetail','statussimple',
                'statusdetail','typesimplerelated','typedetailrelated','statussimplerelated',
                'statusdetailrelated','materialcategory','materialname','materialcategoryrelated',
                'materialnamerelated','holderparent','holdertype','holdername','occurrencename',
                'newids','givenids','changegroup']

    const dic = {}
    arr.forEach(name => {
        dic[name] = {
            all_data: [],
            filter_data: [],
            search: '',
            is_serverside: null,
            loading: false,
            loaded: false, // if data has been loaded. necessary when re-opening an already populated group.
            has_more: true,
            offset: 0,
            limit: 40,
        }
    })
    return dic
}



const checkBoxListReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_CHECK_LIST_DATA:
            var { name, data } = action.payload
            return {
                ...state,
                    [name]: { ...state[name],
                        // by resetting the offset, when search is changed, the get request will replace all the data not add to id. 
                        // otherwise on scroll, it will fetch more data and add to existing array.
                        all_data: state[name].offset === 0 ? data.data : [...state[name].all_data, ...data.data],
                        filter_data: state[name].offset === 0 ? data.data : [...state[name].all_data, ...data.data],
                        has_more: data.has_more,
                        // decides if requires server side or client side filtering from first render
                        is_serverside: state[name].is_serverside !== null ? state[name].is_serverside : data.has_more ? true : false,
                        offset: state[name].limit + state[name].offset,
                        loaded: true,
                        loading: false,
                    }
            }
        // case CREATE_CHECK_LIST_STATE:
        //     var name = action.payload
        //     return {
        //         ...state,
        //         [name]: { ...state[name],
        //             all_data: [],
        //             filter_data: [],
        //             search: '',
        //             is_serverside: null,
        //             loading: false,
        //             loaded: false, // if data has been loaded. necessary when re-opening an already populated group.
        //             has_more: true,
        //             offset: 0,
        //             limit: 40,
        //         }
        //     }
        case SET_LOADING:
            var name = action.payload
            return {
                ...state,
                    [name]: { ...state[name],
                        loading: true,
                    }
            }
        case SET_SEARCH:
            var { name, search } = action.payload
            return {
                ...state,
                    [name]: { ...state[name],
                        search: search
                    }
            }
        case FILTER_CLIENT_SIDE:
            var name = action.payload
            var new_data = state[name].all_data.filter(row => {
                return row[1].toLowerCase().includes(state[name].search.toLowerCase());
            })
            return {
                ...state,
                    [name]: { ...state[name],
                        filter_data: new_data
                    }
            }
        case RESET_OFFSET:
            var name = action.payload
            return {
                ...state,
                    [name]: { ...state[name],
                        offset: 0
                    }
            }
        default: return state
    }
}

export default checkBoxListReducer
