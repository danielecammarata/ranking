import Layout from '../../components/Layout.js'
import { getMatchesList } from '../../lib/api/match'
import { styleMatchInfo,styleMatchScore,styleMatchTile,stylePlayerScore,styleTeamTile,styleTeamPlayer } from '../../lib/ListOfMatches.js'
import { withStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

function convertDate (inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

const styles = {
  chipsLabel: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}

const Index = (props) => (
  <Layout>
    <p>Played matches</p>
    <GridList style={{margin: '0 auto', maxWidth: '500px', minWidth: '400px'}}>
      {props.matches.map(match => (
        <GridListTile style={styleMatchTile}>
          <GridList>
            <GridListTile style={styleTeamTile('right')}>
              <Chip
                avatar={<Avatar src={match.teamHome.defender.avatarUrl} />}
                label={match.teamHome.defender.name}
                style={styleTeamPlayer('right')}
              />
              <Chip
                avatar={<Avatar src={match.teamHome.striker.avatarUrl} />}
                label={match.teamHome.striker.name}
                style={styleTeamPlayer('right')}
              />
            </GridListTile>
            <GridListTile style={styleMatchScore}>
              <Button variant="fab" mini color="primary">
                {match.teamHome.score} - {match.teamAway.score}
              </Button>
              <Badge color="secondary" badgeContent={<small>dh</small>} style={stylePlayerScore('defender','home')}></Badge>
              <Badge color="secondary" badgeContent={<small>sh</small>} style={stylePlayerScore('striker','home')}></Badge>
              <Badge color="secondary" badgeContent={<small>da</small>} style={stylePlayerScore('defender','away')}></Badge>
              <Badge color="secondary" badgeContent={<small>sa</small>} style={stylePlayerScore('striker','away')}></Badge>
            </GridListTile>
            <GridListTile style={styleTeamTile('left')}>
              <Chip
                avatar={<Avatar src={match.teamAway.defender.avatarUrl} />}
                classes={{label: props.classes.chipsLabel}}
                label={match.teamAway.defender.name}
                style={styleTeamPlayer('left')}
              />
              <Chip
                avatar={<Avatar src={match.teamAway.striker.avatarUrl} />}
                label={match.teamAway.striker.name}
                style={styleTeamPlayer('left')}
              />
            </GridListTile>
          </GridList>
          <GridListTileBar
            style={styleMatchInfo}
            title={convertDate(match.createdAt)}
          >
          </GridListTileBar>
        </GridListTile>
      ))}
    </GridList>
  </Layout>
)

Index.getInitialProps = async function getInitialProps() {
  const data = await getMatchesList()

  return {
    matches: data
  }
}

export default withStyles(styles)(Index)