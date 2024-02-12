import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {iplTeamList: [], isLoading: true}

  componentDidMount() {
    this.getIplTeam()
  }

  getIplTeam = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const formatedData = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))

    this.setState({iplTeamList: formatedData, isLoading: false})
  }

  renderTeamList = () => {
    const {iplTeamList} = this.state
    return (
      <ul className="ipldashboard-list-container">
        {iplTeamList.map(eachTeam => (
          <TeamCard team={eachTeam} key={eachTeam.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => {
    return (
      <div testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="ipldashboard-main-container">
        <div className="ipldashboard-container">
          <div className="ipldashboard-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              className="ipl-logo"
              alt="ipl logo"
            />
            <h1 className="ipl-heading"> IPL Dashboard </h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamList()}
        </div>
      </div>
    )
  }
}

export default Home
