import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split('/')
    .filter((segment) => segment); // Filtrer les segments vides

  const breadcrumbItems: BreadcrumbItem[] = pathSegments.map(
    (segment, index) => {
      let label = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitaliser la première lettre

      // Remplacer les segments d'identifiants par un label convivial
      if (segment.match(/^[a-zA-Z0-9-]+$/) && index > 0) {
        label = 'Modifier un utilisateur';
      } else if (segment === 'edit') {
        label = '';
      } else if (segment === 'create') {
        label = 'Créer un utilisateur';
      }

      return {
        label,
        path: `/${pathSegments.slice(0, index + 1).join('/')}`,
      };
    },
  );
  return [
    { label: 'Accueil', path: '/' }, // Toujours inclure la racine
    ...breadcrumbItems.filter((breadcrumbItem) => breadcrumbItem.label !== ''),
  ];
};

export default useBreadcrumbs;
