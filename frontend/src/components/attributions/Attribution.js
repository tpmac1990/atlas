import React from 'react'
import { Link } from "react-router-dom"
import creative_commons from '../../assets/images/attribution/creative-commons-logo.jpg'
import nsw_logo from '../../assets/images/attribution/nsw_logo.png'
import nt_logo from '../../assets/images/attribution/nt_logo.png'
import qld_logo from '../../assets/images/attribution/qld_logo.png'
import sa_logo from '../../assets/images/attribution/sa_logo.png'
import tas_logo from '../../assets/images/attribution/tas_logo.png'
import vic_logo from '../../assets/images/attribution/vic_logo.png'
import wa_logo from '../../assets/images/attribution/wa_logo.png'
import ga_logo from '../../assets/images/attribution/ga_logo.jpg'


export default function Attribution() {
    return (
        <div id='attribution'>
            <Link id='attributionMapLink' to="/">Back To Map</Link>
            <h1>Copyright</h1><br/>
            <p>Data used in this application is governed by the copyright of the data owner. Requests and enquiries concerning reproduction and usage rights for data not licenced under CC-BY should be addressed to the copyright owners.</p>
            <p>Copyright attribution by data owner.</p>
            <table>
                <thead>
                    <tr>
                        <th>Owner</th>
                        <th>License</th>
                        <th>Attribution</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Geoscience Australia</td>
                        <td><a href='http://creativecommons.org/licenses/by/4.0/legalcode'><img src={creative_commons} /></a></td>
                        <td><a href='http://www.ga.gov.au/copyright'>© Commonwealth of Australia (Geoscience Australia) 2016</a></td>
                    </tr>
                    <tr>
                        <td>New South Wales</td>
                        <td><a href='http://creativecommons.org/licenses/by/4.0/legalcode'><img src={creative_commons} /></a></td>
                        <td><a href='https://www.industry.nsw.gov.au/about/our-business/our-publications-and-websites/copyright'>© State of New South Wales through NSW Department of Industry 2018</a></td>
                    </tr>
                    <tr>
                        <td>Victoria</td>
                        <td><a href='http://creativecommons.org/licenses/by/4.0/legalcode'><img src={creative_commons} /></a></td>
                        <td><a href='https://earthresources.vic.gov.au/copyright'>© Geological Survey of Victoria</a></td>
                    </tr>
                    <tr>
                        <td>Queensland</td>
                        <td><a href='http://creativecommons.org/licenses/by/4.0/legalcode'><img src={creative_commons} /></a></td>
                        <td><a href='https://www.dnrme.qld.gov.au/home/legal/copyright'>© Geological Survey of Queensland 2018</a></td>
                    </tr>
                    <tr>
                        <td>South Australia</td>
                        <td><a href='http://creativecommons.org/licenses/by/4.0/legalcode'><img src={creative_commons} /></a></td>
                        <td><a href='http://www.energymining.sa.gov.au/minerals/copyright'>© Department for Energy and Mining, Government of South Australia</a></td>
                    </tr>
                    <tr>
                        <td>Western Australia</td>
                        <td><a href='http://creativecommons.org/licenses/by/4.0/legalcode'><img src={creative_commons} /></a></td>
                        <td><a href='https://www.dmirs.wa.gov.au/copyright'>© State of Western Australia (Department of Mines, Industry Regulation and Safety) 2020</a></td>
                    </tr>
                    <tr>
                        <td>Tasmania</td>
                        <td><a href='http://creativecommons.org/licenses/by/4.0/legalcode'><img src={creative_commons} /></a></td>
                        <td><a href='https://www.tas.gov.au/stds/codi.htm'>© Mineral Resources Tasmania, Government of Tasmania</a></td>
                    </tr>
                    <tr>
                        <td>Northern Territory</td>
                        <td><a href='http://creativecommons.org/licenses/by/4.0/legalcode'><img src={creative_commons} /></a></td>
                        <td><a href='https://nt.gov.au/page/copyright-disclaimer-and-privacy'>© Northern Territory of Australia (Northern Territory Geological Survey)</a></td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <div id='stateLogos'>
                <img src={nsw_logo} />
                <img id='vic-logo' src={vic_logo} />
                <img src={tas_logo} />
                <img id='ga-logo' src={ga_logo} />
                <img src={wa_logo} />
                <img id='qld-logo' src={qld_logo} />
                <img id='sa-logo' src={sa_logo} />
                <img id='nt-logo' src={nt_logo} />
            </div>
        </div>
    )
}
