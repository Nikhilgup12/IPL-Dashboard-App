import './index.css'

const MatchCard = props => {
  const {matchList} = props
  const {competingTeamLogo, competingTeam, matchStatus, result} = matchList
  const matchstatus = matchStatus === 'Won' ? 'match-won' : 'match-lose'
  return (
    <li className="matchList-list">
      <img
        src={competingTeamLogo}
        className="matchList-image"
        alt={`competing team ${competingTeam}`}
      />
      <h1 className="matchList-team-name"> {competingTeam} </h1>
      <p className="matchList-team-result"> {result} </p>
      <p className={`${matchstatus}`}> {matchStatus} </p>
    </li>
  )
}
export default MatchCard
