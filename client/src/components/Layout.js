import Head from "next/head"

export default function Layout ({children}) {
    return (
        <div>
            <main>{children}</main>
        </div>
    )
}