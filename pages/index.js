import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import Layout from '../components/Layout.js'

import {
  styleH1,
} from '../lib/SharedStyles.js'

export default () => (
  <Layout>
    <Head>
      <title>Open source (MIT License) web app to publish documentation and books</title>
      <meta
        name="description"
        content="Open source web app built with modern JavaScript stack: React, Material UI, Next, Express, Mongoose, and MongoDB. Integrated with AWS SES, Github, Google OAuth, Stripe, and MailChimp."
      />
    </Head>
    <div style={{ padding: '10px 8%', fontSize: '15px' }}>
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={12} xs={12} style={{ textAlign: 'center' }}>
          <br />
          <h1 style={styleH1}>RunKing</h1>
        </Grid>
      </Grid>
    </div>
  </Layout>
)
