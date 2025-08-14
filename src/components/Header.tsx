import AdminNavigation from "./nav/AdminNavigation"
import { Link, useLocation } from "react-router-dom"
import HomeNavigation from "./nav/HomeNavigation"

export default function Header() {

    const location = useLocation()
  return (
          <header className="bg-[#101010] py-8">
                <div className="mx-auto max-w-5xl flex flex-row md:flex-row items-center md:justify-between">
                    <Link to='/' className="w-full p-5 lg:p-0 md:w-1/3 sm:w-1/4">
                        <img src="/logo.svg" className="w-40 block" />
                    </Link>
                    <nav className="md:w-1/3 md:flex md:justify-end">
                        {location.pathname === '/admin' ? <AdminNavigation/> : <HomeNavigation/>}
                    </nav>
                </div>
            </header>
  )
}
