import React, { Fragment } from 'react'


const DetailTableC1 = (props) => {
    const { value, dict } = props
    const { lookup, header, table_headers, table_data, styles } = dict
    if (value == null){
        return null
    } else if (value[lookup].length === 0) {
        return null
    } else {
        return (
            <Fragment>
                <h5>{ header }:</h5>
                <div className={styles}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                {table_headers.map(row => {
                                    return <th key={row} >{row}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {value[lookup].map((row, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{index+1}</th>
                                        {table_data.map(line => {
                                            var val = row
                                            for (var i=0; i<line.length; i++){
                                                var val = val[line[i]]
                                            }
                                            return <td key={val}>{val}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table><br/>
                </div><br/>
            </Fragment>
        )
    }
}

export default DetailTableC1