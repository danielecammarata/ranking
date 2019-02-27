import {
  CardContent,
  Collapse,
  GridListTile,
  List,
  ListItem,
} from '@material-ui/core'
import CountUp from 'react-countup'

const userFeature = {
  display: 'block',
  float: 'left',
  marginBottom: '-8px',
  padding: '5px',
  width: '33%',
}

const userFeatureBar = color => ({
  backgroundColor: color ? color : 'rgb(25, 118, 210)',
  height: '8px',
  maxWidth: '0px',
  opacity: '0',
  marginBottom: '2px',
  transition: 'all 0.85s ease-in-out',
  width: '100%',
})

const userFeatureBarWrapper = {
  marginTop: '20px',
  position: 'relative',
  top: '-10px',
  width: '100%',
}

const userFeatureLabel = {
  display: 'flex',
  alignItems: 'flex-end',
  fontSize: '12px',
  fontWeight: '700',
  height: '26px',
  lineHeight: '13px',
}

const userFeatureTitle = {
  marginBottom: '-24px',
  marginRight: '20px',
  fontSize: '18px',
  padding: '0px',
  width: '100%',
}

const userFeatureValue = {
  color: '#1976d2',
  fontSize: '16px',
  marginBottom: '10px',
}

const PlayerStatsCollapse = ({
  expanded,
  stats,
  points
}) =>
  <Collapse in={expanded} timeout="auto" unmountOnExit>
    <CardContent>
      <GridListTile style={{display: 'block', height: 'initial', width: '100%'}}>
        <List>
          <ListItem style={userFeatureTitle}>
            <h5 style={{margin: '20px 20px 20px 0'}}>SCORE</h5>
            <div style={userFeatureBarWrapper}>
              <div data-bar data-bar-value={`${stats.points_max * 50 / 1200}`} style={userFeatureBar()}></div>
              <div data-bar data-bar-value={`${stats.points_min * 50 / 1200}`} style={userFeatureBar('rgb(29, 199, 115)')}></div>
            </div>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>Points</span>
            <span style={userFeatureValue}><CountUp start={1200} end={points} duration={1.6}/></span>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>Highest points</span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.points_max} duration={1.7}/></span>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>Lowest points</span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.points_min} duration={2.5}/></span>
          </ListItem>
          <ListItem style={userFeatureTitle}>
            <h5 style={{margin: '20px 20px 20px 0'}}>TRENDS</h5>
            <div style={userFeatureBarWrapper}>
              <div data-bar data-bar-value={`${stats.max_win_streak}`} style={userFeatureBar()}></div>
              <div data-bar data-bar-value={`${stats.points_trend}`} style={userFeatureBar('rgb(29, 199, 115)')}></div>
            </div>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>Win streak</span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.win_streak} duration={1.9}/></span>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>Longest streak </span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.max_win_streak} duration={1.6}/></span>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>Trend</span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.points_trend} duration={2.2}/></span>
          </ListItem>
          <ListItem style={userFeatureTitle}>
            <h5 style={{margin: '20px 20px 20px 0'}}>MATCHES</h5>
            <div style={userFeatureBarWrapper}>
              <div data-bar data-bar-value={`${stats.match_win / stats.match_played * 100}`} style={userFeatureBar()}></div>
              <div data-bar data-bar-value={`${(stats.match_played - stats.match_win) / stats.match_played * 100}`} style={userFeatureBar('rgb(29, 199, 115)')}></div>
            </div>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>Played</span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.match_played} duration={2}/></span>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>Winned</span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.match_win} duration={1.9}/></span>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>Crawl</span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.match_crawl} duration={1.7}/></span>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>Crawled</span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.match_crawled} duration={2.1}/></span>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>As defender</span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.match_as_defender} duration={1.3}/></span>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>As striker</span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.match_as_striker} duration={1.4}/></span>
          </ListItem>
          <ListItem style={userFeatureTitle}>
            <h5 style={{margin: '20px 20px 20px 0'}}>GOALS</h5>
            <div style={userFeatureBarWrapper}>
              <div data-bar data-bar-value={`${stats.match_goals_made_as_defender / stats.match_goals_made_as_striker * 100}`} style={userFeatureBar()}></div>
            </div>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>As defender</span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.match_goals_made_as_defender} duration={2.1}/></span>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>As striker</span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.match_goals_made_as_striker} duration={1.6}/></span>
          </ListItem>
          <ListItem style={userFeature}>
            <span style={userFeatureLabel}>Conceded as defender</span>
            <span style={userFeatureValue}><CountUp start={1200} end={stats.match_goals_conceded_as_defender} duration={1.45}/></span>
          </ListItem>
        </List>
      </GridListTile>
    </CardContent>
  </Collapse>

export default PlayerStatsCollapse
