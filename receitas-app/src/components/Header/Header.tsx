import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../auth/AuthProvider";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mainLinks = [
    { path: "/", label: "Início" },
    { path: "/tabela", label: "Receitas" },
    { path: "/form", label: "Nova Receita" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-yellow-300 shadow-md px-4 py-3 flex items-center justify-between h-16">
      {/* Esquerda */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-yellow-950 bg-transparent p-0 mx-2 my-2 border-none outline-none focus:outline-none active:outline-none"
          title="sidebar-toggle"
          type="button"
        >
          <FaBars size={22} />
        </button>
        <Link to="/" className="text-xl font-bold text-yellow-950 hover:text-yellow-800">
          MeuApp
        </Link>
        <nav className="hidden md:flex gap-4 ml-6">
          {mainLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-950 font-semibold hover:text-yellow-950"
                  : "text-yellow-700 hover:text-yellow-900"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Direita */}
      <div className="relative flex items-center gap-2" ref={dropdownRef}>
        <span className="text-sm font-bold text-yellow-950 hidden sm:block">
          {user?.nome || "Usuário"}
        </span>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="text-yellow-950 bg-transparent p-0 border-none outline-none focus:outline-none active:outline-none"
          type="button"
        >
          <FaUserCircle size={24} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-5 mt-2 bg-yellow-500 border-yellow-500 rounded shadow z-50">
            <NavLink
              to="/conta"
              className="text-yellow-950 font-bold block px-4 py-2 text-sm hover:bg-yellow-100 hover:text-black"
              onClick={() => setDropdownOpen(false)}
            >
              Conta
            </NavLink>
            <button
              onClick={() => {
                logout();
                setDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm bg-transparent hover:bg-yellow-100 rounded-none text-red-600 font-bold border-none outline-none focus:outline-none active:outline-none"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;