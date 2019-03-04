import Head from 'next/head'

const HeadMeta = ({
  title,
  description
}) =>
  <Head>
    { title &&  <title>{title}</title> }
    { description && <meta name="Description" content={description} /> }
  </Head>

export default HeadMeta
