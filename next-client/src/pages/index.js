import Head from 'next/head'
import Layout, {siteTitle} from '@/components/Layout'
import Editor from '@/components/Editor'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <a>Stuff here</a>
      </section>
      <Editor></Editor>
    </Layout>
  )
}
