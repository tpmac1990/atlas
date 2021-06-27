



export const holder_objs = {
    SubsidiariesDict: {
        styles: "detail-sub-info-c1",
        lookup: "subsidiaries",
        header: "Subsidiaries",
        table_headers: ["Name","% Held","Type","Listed"],
        table_data: [["name"],["percown"],["typ"],["listed"]]
    },
    OwnersDict: {
        styles: "detail-sub-info-c1",
        lookup: "parent_company",
        header: "Parent Companies",
        table_headers: ["Name","% Held","Type","Listed"],
        table_data: [["name"],["percown"],["typ"],["listed"]]
    },
    TickerDict: {
        styles: "detail-sub-info-c1",
        lookup: "listed",
        header: "Listed Locations",
        table_headers: ["Ticker","Exchange Code","Exchange Name"],
        table_data: [["ticker"],["exchange","code"],["exchange","name"]]
    },
    BasicDict: {
        header: "General Info",
        table_data: [
            {
                th: "Holder/Company Type", 
                td: ["company_type","original"], 
                multi: null, 
                format: null
            },
            {
                th: "Is Listed", 
                td: ["listed"], 
                multi: null, 
                format: 'length_boolean'
            },
            {
                th: "Number of Owners", 
                td: ["parent_company"], 
                multi: null, 
                format: 'length'
            },
            {
                th: "Number of Subsidiaries", 
                td: ["subsidiaries"], 
                multi: null, 
                format: 'length'
            },
            {
                th: "Number of Titles", 
                td: ["title_count"], 
                multi: null, 
                format: 'length'
            },
            {
                th: "Number of Sites", 
                td: ["site_count"], 
                multi: null, 
                format: 'length'
            },
            {
                th: "States Holding Titles", 
                td: ["states"], 
                multi: '', 
                format: null
            },
        ]
    }
}


export const site_objs = {
    RelatedTitlesDict: {
        styles: "detail-sub-info-c1",
        lookup: "tenements",
        header: "Related Titles",
        table_headers: ["ID","Type","Status"],
        table_data: [["ind"],["typ"],["status"]]
    },
    NameDict: {
        header: "Site Names",
        table_data: [
            {
                th: "Names", 
                td: ["name"], 
                multi: "name", 
                format: null
            },
        ]
    },
    TypeDict: {
        header: "Site Type",
        table_data: [
            {
                th: "General Group", 
                td: ["typ"], 
                multi: "simple", 
                format: null
            },
            {
                th: "Detailed Group", 
                td: ["typ"], 
                multi: "original", 
                format: null
            },
            {
                th: "Resource Size", 
                td: ["size","name"], 
                multi: null, 
                format: null
            },
        ]
    },
    StatusDict: {
        header: "Site Status",
        table_data: [
            {
                th: "General Group", 
                td: ["status","simple"], 
                multi: null, 
                format: null
            },
            {
                th: "Detailed Group", 
                td: ["status","original"], 
                multi: null, 
                format: null
            },
        ]
    },
    LocationDict: {
        header: "Location",
        table_data: [
            {
                th: "State", 
                td: ["state","name"], 
                multi: null, 
                format: null
            },
            {
                th: "Local Governments", 
                td: ["localgov","name"], 
                multi: null, 
                format: null
            },
            {
                th: "Government Regions", 
                td: ["govregion","name"], 
                multi: null, 
                format: null
            },
            {
                th: "Geological Provinces", 
                td: ["geoprovince"], 
                multi: "name", 
                format: null
            }
        ]
    },
    MaterialsDict: {
        header: "Materials",
        table_data: [
            {
                th: "Major Materials", 
                td: ["majmat"], 
                multi: "name", 
                format: null
            },
            {
                th: "Minor Materials", 
                td: ["minmat"], 
                multi: "name", 
                format: null
            },
        ]
    },
    AlternateSourceDict: {
        header: "Alternate Source ID's",
        table_data: [
            {
                th: "ID's", 
                td: ["oid"], 
                multi: "code", 
                format: null
            },
        ]
    }
}


export const title_objs = {
    DateDict: {
        header: "Dates",
        table_data: [
            {
                th: "Lodge Date", 
                td: ["lodgedate"], 
                multi: null, 
                format: 'date'
            },
            {
                th: "Start Date", 
                td: ["startdate"], 
                multi: null, 
                format: 'date'
            },
            {
                th: "End Date", 
                td: ["enddate"], 
                multi: null, 
                format: 'date'
            }
        ]
    },
    LocationDict: {
        header: "Location",
        table_data: [
            {
                th: "Onshore / Offshore", 
                td: ["shore","name"], 
                multi: null, 
                format: null
            },
            {
                th: "State", 
                td: ["state","name"], 
                multi: null, 
                format: null
            },
            {
                th: "Local Governments", 
                td: ["localgov"], 
                multi: "name", 
                format: null
            },
            {
                th: "Government Regions", 
                td: ["govregion"], 
                multi: "name", 
                format: null
            },
            {
                th: "Geological Provinces", 
                td: ["geoprovince"], 
                multi: "name", 
                format: null
            }
        ]
    },
    TypeDict: {
        header: "Title Type",
        table_data: [
            {
                th: "General Group", 
                td: ["typ","simple"], 
                multi: null, 
                format: null
            },
            {
                th: "Detailed Group", 
                td: ["typ","original"], 
                multi: null, 
                format: null
            },
            {
                th: "Act", 
                td: ["typ","act"], 
                multi: null, 
                format: null
            },
        ]
    },
    StatusDict: {
        header: "Title Status",
        table_data: [
            {
                th: "General Group", 
                td: ["status","simple"], 
                multi: null, 
                format: null
            },
            {
                th: "Detailed Group", 
                td: ["status","original"], 
                multi: null, 
                format: null
            },
        ]
    },
    MaterialsDict: {
        header: "Materials",
        table_data: [
            {
                th: "Major Materials", 
                td: ["majmat"], 
                multi: "name", 
                format: null
            },
            {
                th: "Minor Materials", 
                td: ["minmat"], 
                multi: "name", 
                format: null
            },
        ]
    },
    AlternateSourceDict: {
        header: "Alternate Source ID's",
        table_data: [
            {
                th: "ID's", 
                td: ["oid"], 
                multi: "code", 
                format: null
            },
        ]
    },
    ParentsDict: {
        header: "Title Holders Parent Companies",
        table_data: [
            {
                th: "Names", 
                td: ["parents"], 
                multi: null, 
                format: null
            },
        ]
    },
    // RelatedSitesDict: {
    //     styles: "detail-sub-info-c1",
    //     lookup: "occurrence",
    //     header: "Related Sites",
    //     table_headers: ["ID","Name","Type","Status"],
    //     table_data: [["ind"],["name"],["typ"],["status"]]
    // },
    HoldersDict: {
        styles: "detail-sub-info-c1",
        lookup: "holder",
        header: "Title Holders",
        table_headers: ["Name","% Held"],
        table_data: [["name"],["percown"]]
    }
}

