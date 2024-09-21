import { Route, Routes } from 'react-router-dom';
import { Breadcrumb, Layout, theme, Skeleton } from 'antd';
import PrivateRoute from './components/PrivateRoute';
import AppHeader from './components/Header';
import { lazy, Suspense } from 'react';

const SignUp = lazy(() => import('./components/SignUp'));
const Login = lazy(() => import('./components/Login'));
const Categories = lazy(() => import('./components/Categories'));
const Records = lazy(() => import('./components/Records'));

const { Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const LoadingSkeleton = () => (
    <div style={{ padding: '20px' }}>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </div>
  );

  return (
    <>
      <Layout>
        <AppHeader />
        <Content style={{ padding: '0 48px' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[
              {
                title: 'Home',
              },
              {
                title: 'Application',
              },
            ]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Suspense fallback={<LoadingSkeleton />}>
              <Routes>
                <Route path='/register' Component={SignUp} />
                <Route path='/login' Component={Login} />
                <Route element={<PrivateRoute />}>
                  <Route path='/categories' element={<Categories />} />
                  <Route path='/records' element={<Records />} />
                </Route>
              </Routes>
            </Suspense>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Expense React ©{new Date().getFullYear()} Created by Hafiz</Footer>
      </Layout>
    </>
  );
}

export default App;
