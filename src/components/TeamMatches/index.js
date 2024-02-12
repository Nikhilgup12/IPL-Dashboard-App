import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {isLoading: true, teamMatchesData: {}}

  componentDidMount() {
    this.getTeamMtaches()
  }

  getFormateData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    venue: data.venue,
    date: data.date,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMtaches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const formateData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.getFormateData(data.latest_match_details),
      recentMatches: data.recent_matches.map(each => this.getFormateData(each)),
    }
    this.setState({isLoading: false, teamMatchesData: formateData})
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchesData
    return (
      <div className="teammatches-container">
        <img
          src={teamBannerUrl}
          className="team-banner-image"
          alt="team banner"
        />
        <LatestMatch latestMatchData={latestMatchDetails} />
        <ul className="matchList-main-card">
          {recentMatches.map(matchList => (
            <MatchCard matchList={matchList} key={matchList.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => {
    return (
      <div testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )
  }

  getTeamMatchesClassname = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'MI':
        return 'mi'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'RR':
        return 'rr'
      case 'SH':
        return 'srh'
      case 'CSK':
        return 'csk'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const classname = `teammatches-main-container ${this.getTeamMatchesClassname()}`
    return (
      <div className={classname}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
