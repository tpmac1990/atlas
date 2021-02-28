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


const SingleColumnTableC1 = (props) => {
    const { value, header, table_data } = props.dict
    return (
        <Fragment>
            <h5>{ header }:</h5>
            <div className="detail-sub-info-c1">
                <table className="table">
                    <tbody>
                        {table_data.map((row, index) => {
                            var val = value
                            for (var i=0; i<row['td'].length; i++){
                                var val = val[row['td'][i]]
                            }
                            return (
                                <tr key={index} className="row">
                                    <th className="col-5">{ row['th'] }:</th>
                                    {row['multi'] == null
                                    ? <td className="col-7">{ format_values(val, row['format']) }</td>
                                    : <td className="col-7">{ val.map((line,index) => {
                                        const key = row['multi'] != '' ? line[row['multi']] : line
                                        return <p key={index}>{ format_values(key, row['format']) }</p>
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