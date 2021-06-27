import React from 'react'

const ContactInfo = () => {

    return (
        <div className="basic-form-area">
            <div className='contact-info-area'>
                <h1>Contact Info</h1>
                <h2>Get in touch, stay in touch</h2>
                <hr />
                <table className='table'>
                    <tbody>
                        <tr>
                            <th>Email:</th>
                            <td>contact.gplore@gmail.com</td>
                        </tr>
                        <tr>
                            <th>Twitter:</th>
                            <td>@Gplore_aus</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ContactInfo