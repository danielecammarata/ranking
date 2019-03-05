import React from 'react'
import App, {Container} from 'next/app'
import Router from 'next/router'

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  // NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
  console.log('done')
})
Router.events.on('routeChangeError', () => {
  console.log('error')
})

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    //console.log(Component, router, ctx)

    return {pageProps}
  }

  render () {
    const {Component, router, pageProps} = this.props
    return <Container>
      <Component url={router} {...pageProps} />
    </Container>
  }
}
