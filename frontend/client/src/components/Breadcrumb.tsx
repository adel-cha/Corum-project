import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const isLoginPage = items.find((item) => item.label === 'Login');
  if (isLoginPage) {
    return null;
  }
  return (
    <nav className="bg-gray-100 p-4 rounded-md shadow mb-4">
      <ol className="list-none flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link
              to={item.path}
              className="text-teal-600 font-normal hover:underline"
            >
              {item.label}
            </Link>
            {index < items.length - 1 && (
              <span className="mx-2 text-gray-500">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
