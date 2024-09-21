import { Layout, Menu } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn, logout } from '../store/actions/userActions';
import { UserDispatch } from '../types/user';
import { AppState } from '../store';
import CustomSkeleton from './CustomSkeleton';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const { Header } = Layout;

const getMenuItems = <T extends object>(data: T): { key: string; label: React.ReactNode }[] => {
  if (Object.keys(data).length !== 0) {
    return [
      {
        key: '/categories',
        label: <Link to='/categories'>Categories</Link>,
      },
      {
        key: '/records',
        label: <Link to='/records'>Records</Link>,
      },
      {
        key: '/logout',
        label: 'Logout',
      },
    ];
  } else {
    return [
      {
        key: '/',
        label: <Link to='/login'>Home</Link>,
      },
      {
        key: '/register',
        label: <Link to='/register'>Register</Link>,
      },

      {
        key: '/login',
        label: <Link to='/login'>Login</Link>,
      },
    ];
  }
};

function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch<UserDispatch>();
  const { pathname } = useLocation();

  const { data: user, loading } = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (pathname !== '/login' && pathname !== '/register') {
      dispatch(isLoggedIn());
    }
  }, [dispatch]);

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === '/logout') {
      dispatch(logout());
      navigate('/login');
    }
  };
  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className='demo-logo' />
      {loading ? (
        <div style={{ display: 'flex', gap: 16 }}>
          {Object.keys(user).length === 0 ? (
            <CustomSkeleton />
          ) : (
            <>
              <CustomSkeleton />
              <CustomSkeleton />
              <CustomSkeleton />
            </>
          )}
        </div>
      ) : (
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['2']}
          items={getMenuItems(user)}
          style={{ flex: 1, minWidth: 0 }}
          onClick={handleMenuClick}
        />
      )}
    </Header>
  );
}

export default AppHeader;
