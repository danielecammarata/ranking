import Link from 'next/link'
import { AdminHeader } from '../../components/blocks/Admin';

class Admin extends React.Component {
  render () {
    return (
      <div>
        <AdminHeader />
        {/* <Link href="/admin/stats">
          <a>Stats</a>
        </Link> */}
        <Link href="/admin/matches">
          <a>Matches</a>
        </Link>
      </div>
    )
  }
}

export default Admin
