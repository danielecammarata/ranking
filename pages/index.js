import Grid from '@material-ui/core/Grid'
import Layout from '../components/Layout'
import withTitle from '../components/hoc/WithTitle'

import {
  styleH1,
} from '../lib/SharedStyles.js'

export default withTitle('Home | Scoreza')(() => (
  <Layout>
    <div style={{ padding: '10px 8%', fontSize: '15px' }}>
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={12} xs={12} style={{ textAlign: 'center' }}>
          <br />
          <h1 style={styleH1}>Scoreza</h1>
        </Grid>
      </Grid>
    </div>
  </Layout>
))
