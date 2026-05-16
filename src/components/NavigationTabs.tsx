import { BookmarkSquareIcon, UserIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const tabs = [
    { name: 'Links', href: '/admin', icon: BookmarkSquareIcon },
    { name: 'Mi Perfil', href: '/admin/profile', icon: UserIcon },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavigationTabs() {

    // Hook para obtener la location actual
    const location = useLocation()

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        navigate(e.target.value)
    }

    return (
        <div className='mb-5'>

            {/* mobile */}
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="p-3 block w-full rounded-md border-zinc-800 bg-zinc-900 text-white focus:border-cyan-400 focus:ring-cyan-400"
                    onChange={handleChange}
                >
                    {tabs.map((tab) => (
                        <option
                            value={tab.href}
                            key={tab.name}
                        >{tab.name}</option>
                    ))}
                </select>
            </div>

            {/* Desktop */}
            <div className="hidden sm:block">
                <div className="border-b border-zinc-800">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                                className={classNames(
                                    location.pathname === tab.href
                                        ? 'border-cyan-400 text-cyan-400'
                                        : 'border-transparent text-zinc-400 hover:border-zinc-700 hover:text-white',
                                    'group inline-flex items-center border-b-2 py-4 px-1 text-xl font-medium transition-colors'
                                )}
                            >
                                <tab.icon
                                    className={classNames(
                                        location.pathname === tab.href ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-zinc-300',
                                        '-ml-0.5 mr-2 h-5 w-5 transition-colors'
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}