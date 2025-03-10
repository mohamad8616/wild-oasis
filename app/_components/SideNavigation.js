"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className='h-5 w-5 text-blue-600' />,
  },
  {
    name: "Reservations",
    href: "/account/reservation",
    icon: <CalendarDaysIcon className='h-5 w-5 text-blue-600' />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className='h-5 w-5 text-blue-600' />,
  },
];

function SideNavigation() {
  const pathName = usePathname();
  return (
    <nav className='border-r border-blue-900'>
      <ul className='flex flex-col gap-2 h-full text-lg'>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-blue-800 hover:text-blue-100 transition-colors flex items-center gap-4 font-semibold text-blue-200 ${
                pathName === link.href ? "bg-blue-600" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className='mt-auto'>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
