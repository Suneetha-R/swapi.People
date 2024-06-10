/* eslint-disable react/no-unescaped-entities */
import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-content">
            <h1 className="home-heading">SWAPI</h1>
            <p>The Star Wars API</p>
            <p className="home-description">
              The Star Wars API is the world's first quantified and
              programmatically-formatted set of Star Wars data.
              <br />
              After hours of watching films and trawling through content online,
              we present to you all the People, Films, Species, Starships,
              Vehicles and Planets from Star Wars.
              <br /> We've formatted this data in JSON and exposed it to you in
              a RESTish implementation that allows you to programmatically
              collect and measure the data.
            </p>
            <button type="button" className="shop-now-button">
              Find
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default Home
