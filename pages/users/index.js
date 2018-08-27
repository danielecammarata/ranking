import Link from 'next/link'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import Layout from '../../components/Layout.js'
import { getUsersList, deleteUser } from '../../lib/api/users'
import { styleH1, styleCard, styleCardContainer, styleCardContent, styleBigAvatar } from '../../lib/SharedStyles'

class IndexUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: props.users || [],
      userDeleted: false
    }
  }

  async componentDidMount() {
    try {
      const data = await getUsersList()
      this.setState({ users: data })
    } catch (err) {
      console.log(err)
    }
  }

  async removeUser (user, e) {
    e.preventDefault()
    console.log(user)
    const removedUser = await deleteUser(user._id)
    const localUserList = this.state.users.filter( el => el._id !== removedUser._id )
    this.setState({ users: localUserList, userDeleted: true })
  }

// https://static.nexilia.it/bitchyf/2018/05/cristiano-malgioglio-danzando-800x500.jpg

  render() {
    return (
      <Layout>
        <h1 style={styleH1}>Ranking</h1>
        <Divider />
        <ul
          style={{
            listStyle: 'none'
          }}
        >
          {this.state.users && this.state.users.map(user => (
            <li
              key={user.slug}
              style={{
                marginBottom: '10px'
              }}
            >
              <Link as={`/users/${user.slug}`} href={`/users/update/?slug=${user.slug}`}>
                <Card style={styleCard}>
                  <div style={styleCardContainer}>
                    <CardContent style={styleCardContent}>
                      <Typography variant="headline">{user.name}</Typography>
                      <Typography variant="subheading" color="textSecondary">Points: {user.points}</Typography>
                    </CardContent>
                  </div>
                  <CardMedia
                    style={styleBigAvatar}
                    image={user.avatarUrl}
                    title={user.name}
                  />
                </Card>
              {/* <button variant="raised" onClick={(e) => this.removeUser(user, e)}>X</button> */}
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }


}
export default IndexUser
