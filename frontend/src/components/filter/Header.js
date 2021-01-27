import React, { Component } from 'react'
import { divIcon } from 'leaflet'

class Header extends Component {
    render() {
        return (
            <div>
                <button>Load</button>
                <button>Clear</button>
            </div>
        )
    }
}

export default Header
