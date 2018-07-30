import React from 'react'
import Head from 'next/head'

const withTitle = (title) => (WrappedComponent) => {
  class WithTitle extends React.Component {
    render() {
      return (
        <div>
          <Head>
            <title>{title || 'Scoreza'}</title>
          </Head>
          <WrappedComponent />
        </div>
      )
    }
  }
  return WithTitle
}
export default withTitle
