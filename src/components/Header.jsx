import { Link, NavLink } from "react-router-dom";
import { routes } from "../routes/routes";

const Header = () => {
  return (
    <nav className="flex justify-between items-center px-2 py-3 bg-black text-white">
      <div className="flex items-center gap-2">
        <h2 className="text-3xl font-bold text-blue-600">A</h2>
        <Link to="/" className="text-xl font-bold">
          Arcode
        </Link>
      </div>
      <ul>
        <li>
          {routes
            .filter((route) => route?.isShowInHeader)
            .map((route, index) => (
              <NavLink
                key={index}
                to={route?.path}
                className={`mx-4 font-bold text-sm hover:text-blue-400 transition-colors cursor-pointer`}
              >
                {route?.name}
              </NavLink>
            ))}
        </li>
      </ul>
      <div>
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-1 rounded-md"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Header;
