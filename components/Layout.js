import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import getContext from '../lib/context'
import Header from './Header'

class Layout extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.pageContext = this.props.pageContext || getContext()
  }

  pageContext = null

  render() {
    return (
      <MuiThemeProvider
        theme={this.pageContext.theme}
      >
        <CssBaseline />
        <div>
          <Header />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout
