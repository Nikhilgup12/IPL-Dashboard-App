import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {team} = props
  const {id, name, teamImageUrl} = team
  return (
    <Link to={`/team-matches/${id}`}>
      <li className="ipl-team-card">
        <img src={teamImageUrl} className="ipl-team-image" alt={name} />
        <h1 className="ipl-team-name"> {name} </h1>
      </li>
    </Link>
  )
}

export default TeamCard
