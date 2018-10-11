import { withStyles } from '@material-ui/core/styles'
import CappottoIcon from './IconComponents/CappottoIcon'
import Tooltip from '@material-ui/core/Tooltip'

const badgeSize = '50px'

const styles = theme => ({
    badge: {
        height: badgeSize,
        width: badgeSize,
    },
})

let TagName

class BadgeIcon extends React.Component {
  constructor (props) {
    super(props)
  }

  async componentWillMount () {
    try {
        if(this.props.type == 'cappotto') {
            TagName = CappottoIcon
        }
    } catch(err) {
        console.log(err)
    }
  }

  render() {
    return (
        <Tooltip title={this.props.type}>
            <TagName className={this.props.classes.badge}/>
        </Tooltip>
    )
    
  }

}
export default withStyles(styles)(BadgeIcon)