import React from 'react'
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

    const CreativeCommonsHandler = e => {
        e.preventDefault()
        window.open("http://creativecommons.org/licenses/by/4.0/legalcode", "_blank")
    }

    const linkObject = {
        geo_aus: 'http://www.ga.gov.au/copyright',
        nsw: 'https://www.industry.nsw.gov.au/about/our-business/our-publications-and-websites/copyright',
        vic: 'https://earthresources.vic.gov.au/copyright',
        qld: 'https://www.dnrme.qld.gov.au/home/legal/copyright',
        sa: 'http://www.energymining.sa.gov.au/minerals/copyright',
        wa: 'https://www.dmirs.wa.gov.au/copyright',
        tas: 'https://www.tas.gov.au/stds/codi.htm',
        nt: 'https://nt.gov.au/page/copyright-disclaimer-and-privacy'
    }

    const CopyrightHandler = e => {
        e.preventDefault()
        window.open(linkObject[e.target.name], "_blank")
    }

    return (
        <div id='attribution'>
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
                        <td><a onClick={CreativeCommonsHandler}><img src={creative_commons} /></a></td>
                        <td><a name='geo_aus' onClick={CopyrightHandler} >© Commonwealth of Australia (Geoscience Australia) 2016</a></td>
                    </tr>
                    <tr>
                        <td>New South Wales</td>
                        <td><a onClick={CreativeCommonsHandler}><img src={creative_commons} /></a></td>
                        <td><a name='nsw' onClick={CopyrightHandler}>© State of New South Wales through NSW Department of Industry 2018</a></td>
                    </tr>
                    <tr>
                        <td>Victoria</td>
                        <td><a onClick={CreativeCommonsHandler}><img src={creative_commons} /></a></td>
                        <td><a name='vic' onClick={CopyrightHandler}>© Geological Survey of Victoria</a></td>
                    </tr>
                    <tr>
                        <td>Queensland</td>
                        <td><a onClick={CreativeCommonsHandler}><img src={creative_commons} /></a></td>
                        <td><a name='qld' onClick={CopyrightHandler}>© Geological Survey of Queensland 2018</a></td>
                    </tr>
                    <tr>
                        <td>South Australia</td>
                        <td><a onClick={CreativeCommonsHandler}><img src={creative_commons} /></a></td>
                        <td><a name='sa' onClick={CopyrightHandler}>© Department for Energy and Mining, Government of South Australia</a></td>
                    </tr>
                    <tr>
                        <td>Western Australia</td>
                        <td><a onClick={CreativeCommonsHandler}><img src={creative_commons} /></a></td>
                        <td><a name='wa' onClick={CopyrightHandler}>© State of Western Australia (Department of Mines, Industry Regulation and Safety) 2020</a></td>
                    </tr>
                    <tr>
                        <td>Tasmania</td>
                        <td><a onClick={CreativeCommonsHandler}><img src={creative_commons} /></a></td>
                        <td><a name='tas' onClick={CopyrightHandler}>© Mineral Resources Tasmania, Government of Tasmania</a></td>
                    </tr>
                    <tr>
                        <td>Northern Territory</td>
                        <td><a onClick={CreativeCommonsHandler}><img src={creative_commons} /></a></td>
                        <td><a name='nt' onClick={CopyrightHandler}>© Northern Territory of Australia (Northern Territory Geological Survey)</a></td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <div id='state-logos'>
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
