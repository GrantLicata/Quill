import Head from "next/head"

export const siteTitle = "Quill Notes"

export default function Layout ({children}) {
    return (
        <div>
            <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta
            name="Note space"
            content="Note taking and viewing space"
            />
            <meta name="og:title" content={siteTitle} />
            </Head>
            <main>{children}</main>
        </div>
    )
}