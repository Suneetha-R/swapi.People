/* eslint-disable jsx-a11y/alt-text */
import {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profileData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.onGetProfileDetails()
  }

  onGetProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = ' https://swapi.dev/api/people'
    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, optionsProfile)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachItem => ({
        birthYear: eachItem.birth_year,
        created: eachItem.created,
        edited: eachItem.edited,
        eyeColor: eachItem.eye_color,
        films: eachItem.films,
        gender: eachItem.gender,
        hairColor: eachItem.hair_color,
        height: eachItem.height,
        homeWorldUrl: eachItem.homeworld,
        mass: eachItem.mass,
        name: eachItem.name,
        skinColor: eachItem.skin_color,
      }))
      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onGetJobsFailureView = () => (
    <div className="failure-img-button-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        we cannot seem to find the page you are looking for
      </p>
      <div className="jobs-failure-button-container">
        <button
          className="failure-button"
          type="button"
          onClick={this.onRetryJobs}
        >
          retry
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <div>
        <h1>Loading...</h1>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="blue"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible
        />
      </div>
    </div>
  )

  onGetProfileView = () => {
    const {profileData} = this.state
    return (
      <div className="container ">
        <ul className="ul-items-container">
          {profileData.map(each => (
            <li className="item-container">
              <h1>{each.name}</h1>
              <p>Height: {each.height}</p>
              <p>Mass: {each.mass}</p>
              <p>Hair Color: {each.hairColor}</p>
              <p>Skin Color: {each.skinColor}</p>
              <p>Eye Color: {each.skinColor}</p>
              <p>Birthday Year: {each.birthYear}</p>
              <p>Gender : {each.gender}</p>
              <img src={each.homeWorldUrl} />
              <ul className="ul-films">
                {each.films.map(eachFilm => (
                  <li>
                    <img src={eachFilm} alt="film" />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  onRenderProfileStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onGetProfileView()
      case apiStatusConstants.failure:
        return this.onGetProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="all-items-container">
          <h1 className="heading">Biodata</h1>
          {this.onRenderProfileStatus()}
        </div>
      </>
    )
  }
}
export default Profile
