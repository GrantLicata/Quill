import Head from 'next/head'
import Layout from '@/components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Quill</title>
      </Head>
      <main className='text-center mt-6'>
        <h1 className='mb-4'>Welcome to Quill</h1>
        <Link href='/notebook' className='p-2 border rounded-lg bg-slate-300'>Enter the Notebook</Link>
      </main>
    </Layout>
  )
}
