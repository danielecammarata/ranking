import Layout from '../components/Layout.js'
import MetaHead from '../components/MetaHead.js'

import {
  styleH1,
} from '../lib/SharedStyles.js'

export default () => (
  <Layout>
    {MetaHead('home')}
    <h1 style={styleH1}>Scoreza</h1>
  </Layout>
)
