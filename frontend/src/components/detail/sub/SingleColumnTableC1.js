import React, { Fragment } from 'react'



const format_values = (value, format) => {
    switch(format){
        case 'date':
            const sDate = value.split("-")
            return sDate[0] === '2999' ? '' : `${sDate[2]}-${sDate[1]}-${sDate[0]}`
        case 'length_boolean':
            return value.length != 0 ? "Yes" : "No"
        case 'length':
            return value.length
        default:
            return value
    }
}

// null is necessary incase there are no values for a field such as localgov regions for offshore sites
const SingleColumnTableC1 = (props) => {

    const { dict, value } = props
    const { header, table_data } = dict

    return (
        <Fragment>
            <h5>{ header }:</h5>
            <div className="detail-sub-info-c1">
                <table className="table">
                    <tbody>
                        { table_data.map((row, index) => {
                            var val = value
                            for (var i=0; i < row['td'].length; i++){
                                var val = val ? val[row['td'][i]] : null
                            }
                            let gg = []
                            return (
                                <tr key={index} className="row">
                                    <th className="col-5">{ row['th'] }:</th>
                                    {row['multi'] == null
                                    ? <td className="col-7">{ format_values(val, row['format']) }</td>
                                    : <td className="col-7">{ val.map((line,ind) => {
                                        const key = row['multi'] != '' ? line[row['multi']] : line
                                        // remove duplicates
                                        if (!gg.includes(key)) {
                                            gg.push(key)
                                            return <p key={ind}>{ format_values(key, row['format']) }</p>
                                        }
                                    })}</td> }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div><br/>
        </Fragment>
    )
}

export default SingleColumnTableC1