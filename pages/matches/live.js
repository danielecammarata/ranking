import Layout from '../../components/Layout.js'
import { styleLedBox, styleLedRed } from '../../lib/LedStyles.js'
import "../../lib/animations.css"

export default () => (
    <Layout>
        <p>This is the live matches</p>
        <div style={styleLedBox}>
            <div style={styleLedRed}></div>
        </div>
    </Layout>
)
