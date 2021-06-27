
// ssSort: for the serverside sorting method

// if the year is 2999 then mke it blank
const fmt_date = date => {
    const s_date = date.split('-')
    return s_date[0] === '2999' ? '' : `${s_date[2]}-${s_date[1]}-${s_date[0]}`
}

// configs to manage table data
//      Header: column header
//      accessor: the key to access the value from the recieved object
//      ssSort: the query to sort the column for individual column filtering. ??? this should be move to the backend and coupled with the global filter queries
export const COLUMNS = {
    titles: [
        {
            Header: 'Index',
            accessor: 'ind',
            ssSort: 'ind'
        },
        {
            Header: "Related ID's",
            accessor: 'oid',
            ssSort: 'oid__code'
        },
        {
            Header: 'Holders',
            accessor: 'holder',
            ssSort: 'holder__name'
        },
        {
            Header: 'Parents',
            accessor: 'parent',
            ssSort: 'holder__child_parent__name__name'
        },
        {
            Header: 'Lodge Date',
            accessor: 'lodgedate',
            ssSort: 'lodgedate',
            Cell: ({ value }) => {
                return fmt_date(value)
            }
        },
        {
            Header: 'Start Date',
            accessor: 'startdate',
            ssSort: 'startdate',
            Cell: ({ value }) => {
                return fmt_date(value)
            }
        },
        {
            Header: 'Expiry Date',
            accessor: 'enddate',
            ssSort: 'enddate',
            Cell: ({ value }) => {
                return fmt_date(value)
            }
        },
        {
            Header: 'State',
            accessor: 'state',
            ssSort: 'state__name'
        },
        {
            Header: 'Government Regions',
            accessor: 'govregion',
            ssSort: 'govregion__name'
        },
        {
            Header: 'Geological Provinces',
            accessor: 'geoprovince',
            ssSort: 'geoprovince__name'
        },
        {
            Header: 'Onshore / Offshore',
            accessor: 'shore',
            ssSort: 'shore__name'
        },
        {
            Header: 'Major Materials',
            accessor: 'majmat',
            ssSort: 'majmat__name'
        },
        {
            Header: 'Minor Materials',
            accessor: 'minmat',
            ssSort: 'minmat__name'
        },
        {
            Header: 'Detailed Type',
            accessor: 'typ.fname',
            ssSort: 'typ__fname'
        },
        {
            Header: 'Simplified Type',
            accessor: 'typ.simple',
            ssSort: 'typ__simple__name'
        },
        {
            Header: 'Detailed Status',
            accessor: 'status.original',
            ssSort: 'status__original'
        },
        {
            Header: 'Simplified Status',
            accessor: 'status.simple',
            ssSort: 'status__simple__name'
        } 
    ],
    sites: [
        {
            Header: 'Index',
            accessor: 'ind',
            ssSort: 'ind'
        },
        {
            Header: "Related ID's",
            accessor: 'oid',
            ssSort: 'oid__code'
        },
        {
            Header: "Size",
            accessor: 'size',
            ssSort: 'size__name'
        },
        {
            Header: 'Name',
            accessor: 'name',
            ssSort: 'name__name'
        },
        {
            Header: 'State',
            accessor: 'state',
            ssSort: 'state__name'
        },
        {
            Header: 'Government Regions',
            accessor: 'govregion',
            ssSort: 'govregion__name'
        },
        {
            Header: 'Geological Provinces',
            accessor: 'geoprovince',
            ssSort: 'geoprovince__name'
        },
        {
            Header: 'Major Materials',
            accessor: 'majmat',
            ssSort: 'majmat__name'
        },
        {
            Header: 'Minor Materials',
            accessor: 'minmat',
            ssSort: 'minmat__name'
        },
        {
            Header: 'Detailed Type',
            accessor: 'typdetail',
            ssSort: 'typ__original'
        },
        {
            Header: 'Simplified Type',
            accessor: 'typsimple',
            ssSort: 'typ__simple__name'
        },
        {
            Header: 'Detailed Status',
            accessor: 'status.original',
            ssSort: 'status__original'
        },
        {
            Header: 'Simplified Status',
            accessor: 'status.simple',
            ssSort: 'status__simple__name'
        }
    ]
}

