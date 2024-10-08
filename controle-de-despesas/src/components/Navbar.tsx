import { NavLink } from "react-router-dom";
import './styles/Navbar.css';

export interface INavLink {
    label: string,
    url: string
}

interface NavbarProps {
    links: INavLink[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
    return (
        <nav>
           <ul className="navOptions">
                {links.map((link, index) => (
                    <li key={index}>
                        <NavLink to={link.url} className={({ isActive }) => (isActive? "active": undefined)}>
                            {link.label}
                        </NavLink>
                    </li>
                ))}
           </ul>
        </nav>
    )
}

export default Navbar;