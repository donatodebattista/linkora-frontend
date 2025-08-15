import AdminNavigation from "./nav/AdminNavigation"
import { Link, useLocation } from "react-router-dom"
import HomeNavigation from "./nav/HomeNavigation"

export default function Header() {

    const location = useLocation()
  return (
          <header className="bg-[#101010] py-6">
                <div className="mx-auto max-w-5xl flex flex-wrap items-center justify-between gap-4 px-4">
                    <Link to='/' className="w-full flex justify-center md:justify-start md:w-auto">
                        <img src="/logo.svg" className="w-34 md:w-40 block" />
                    </Link>
                    <nav className="w-full flex flex-row justify-center md:w-auto md:justify-end">
                        {location.pathname === '/admin' ? <AdminNavigation/> : <HomeNavigation/>}
                    </nav>
                </div>
            </header>
  )
}
