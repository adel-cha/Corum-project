import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { LuCircleUser } from 'react-icons/lu';
import { MdOutlineArrowDropDown } from 'react-icons/md';
export const Header = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
  };
  if (!user || !user.active) return null;

  return (
    <header className=" bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 flex justify-between items-center">
      <div className="flex justify-between items-center">
        <img src="/corum_logo.png" alt="Logo Corum" className="w-40 h-auto" />
      </div>
      {user && (
        <div className="relative flex items-center space-x-4">
          <button
            className="flex items-center space-x-2  py-2 px-4 rounded-full focus:outline-none"
            onClick={toggleDropdown}
          >
            <LuCircleUser />
            <span>{user.firstName}</span>
            <MdOutlineArrowDropDown />
          </button>

          {/* Liste déroulante */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50"
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
