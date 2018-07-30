import Head from 'next/head'

const MetaHead = (pageName) => {
  switch (pageName) {
    case 'home':
      return (
        <Head>
          <title>Scoreza - Our ranking app</title>
          <meta
            name="description"
            content="Ranking application"
          />
        </Head>
      )
    default:
      return (
        <Head>
          <title>Scoreza - Our ranking app</title>
          <meta
            name="description"
            content="Ranking application"
          />
        </Head>
      )
    }
}

export default MetaHead
