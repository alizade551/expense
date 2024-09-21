import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  path?: string;
}

function PrivateRoute({ path = '/login' }: PrivateRouteProps) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={path} replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
