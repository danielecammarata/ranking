import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'

import getContext from '../lib/context'
import getRootUrl from '../lib/api/getRootUrl'
import Header from './Header'
import Footer from './Footer'

class Layout extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.pageContext = this.props.pageContext || getContext()
    this.state = {
      isOffCanvasOpen: false
    }
    this.offCanvasHandler = this.offCanvasHandler.bind(this)
  }

  pageContext = null

  offCanvasHandler () {
    this.setState({isOffCanvasOpen: !this.state.isOffCanvasOpen})
  }

  render () {
    return (
      <MuiThemeProvider
        theme={this.pageContext.theme}
      >
        <CssBaseline/>
        <div>
          <Head>
            <link rel="shortcut icon" href={`${getRootUrl()}/scoreza.png`} type="image/png"/>
          </Head>
          <Header handler={this.offCanvasHandler}/>
          <div style={{fontSize: '15px', minHeight: 'calc(100vh - 128px)'}}>
            {this.props.children}
          </div>
          <Footer/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Layout
