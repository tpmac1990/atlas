import React, { Component } from 'react'
import MapContent from './MapContent'


export default class Display extends Component {
  render() {
    return (
        <div style={{position: "relative"}}>
            <MapContent />
        </div>
    )
  }
}
