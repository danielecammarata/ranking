import Layout from '../components/Layout.js'
import MetaHead from '../components/MetaHead.js'

export default () => (
  <Layout>
    {MetaHead('about')}
    <p>This is the about page</p>
  </Layout>
)
