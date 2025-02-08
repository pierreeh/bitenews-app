import { Link, NavLink } from 'react-router-dom';

export default function PublicHeader() {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-black text-white">
      <Link to="/">Bitenews</Link>
      <nav>
        <ul className="flex gap-3 text-xs font-extralight">
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
