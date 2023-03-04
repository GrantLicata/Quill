import Head from 'next/head'
import Layout from '@/components/Layout'
import Editor from '@/components/Editor';

export default function Home() {

  return (
    <Layout>
      <Head>
        <title>Quill</title>
      </Head>
      <Editor/>
    </Layout>
  )
}