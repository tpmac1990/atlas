

const fmt_date = date => {
    const s_date = date.split('-')
    return s_date[0] === '2999' ? '' : `${s_date[2]}-${s_date[1]}-${s_date[0]}`
}

export const COLUMNS = {
    titles: [
        {
            Header: 'Index',
            accessor: 'ind',
        },
        {
            Header: 'Holders',
            accessor: 'holder',
        },
        {
            Header: 'Lodge Date',
            accessor: 'lodgedate',
            Cell: ({ value }) => {
                return fmt_date(value)
            }
        },
        {
            Header: 'Start Date',
            accessor: 'startdate',
            Cell: ({ value }) => {
                return fmt_date(value)
            }
        },
        {
            Header: 'Expiry Date',
            accessor: 'enddate',
            Cell: ({ value }) => {
                return fmt_date(value)
            }
        },
        {
            Header: 'State',
            accessor: 'state',
        },
        {
            Header: 'Government Regions',
            accessor: 'govregion',
        },
        {
            Header: 'Geological Provinces',
            accessor: 'geoprovince',
        },
        {
            Header: 'Onshore / Offshore',
            accessor: 'shore',
        },
        {
            Header: 'Major Materials',
            accessor: 'majmat',
        },
        {
            Header: 'Minor Materials',
            accessor: 'minmat',
        },
        {
            Header: 'Detailed Type',
            accessor: 'typ.fname',
        },
        {
            Header: 'Simplified Type',
            accessor: 'typ.simple',
        },
        {
            Header: 'Detailed Status',
            accessor: 'status.original',
        },
        {
            Header: 'Simplified Status',
            accessor: 'status.simple',
        }
    ],
    sites: [
        {
            Header: 'Index',
            accessor: 'ind',
        },
        {
            Header: "Related ID's",
            accessor: 'oid',
        },
        {
            Header: "Size",
            accessor: 'size',
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'State',
            accessor: 'state',
        },
        {
            Header: 'Government Regions',
            accessor: 'govregion',
        },
        {
            Header: 'Geological Provinces',
            accessor: 'geoprovince',
        },
        {
            Header: 'Major Materials',
            accessor: 'majmat',
        },
        {
            Header: 'Minor Materials',
            accessor: 'minmat',
        },
        {
            Header: 'Detailed Type',
            accessor: 'typdetail',
        },
        {
            Header: 'Simplified Type',
            accessor: 'typsimple',
        },
        {
            Header: 'Detailed Status',
            accessor: 'status.original',
        },
        {
            Header: 'Simplified Status',
            accessor: 'status.simple',
        }
    ]
}

