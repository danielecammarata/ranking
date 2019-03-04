import Link from 'next/link'
import { Fab, Grid } from '@material-ui/core'
import { SoccerFieldIcon, TrophyIcon } from '../../IconComponents'

const ActionsHeader = () =>
  <Grid container justify="center" alignItems="center" spacing={24}>
    <Grid item xs={8} sm={4}>
      <Link href="/users">
        <Fab
          variant="extended"
          aria-label="Ranking"
          style={{width: 200}}
        >
          <TrophyIcon style={{marginRight: '10px'}}/>
          Ranking
        </Fab>
      </Link>
    </Grid>
    <Grid item xs={8} sm={4}>
      <Link href="/matches/fast">
        <Fab
          variant="extended"
          aria-label="New Match"
          style={{width: 200}}
        >
          <SoccerFieldIcon style={{marginRight: '10px'}}/>
          New Match
        </Fab>
      </Link>
    </Grid>
  </Grid>

  export default ActionsHeader
