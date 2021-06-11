import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as ROUTES from './constants/routes';

import UserContext from './context/user';

import useAuth from './hooks/useAuth';

import ProtectedRoute from './helpers/protected-route';
import IsUserLogedIn from './helpers/is-user-logged-in';

import InstagramLogo from './components/InstagramLogo';
/*
  - lazy es un import dinámico que lo que hace es que webpack divida el código de la app del bundle
  y busque solo por ese elemento.
  - Suspense es la forma en que se renderizara el componente lazy
  - el atributo fallback es lo que se mostrará mientras carga el componente lazy.
*/
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));

const App = () => {
  const { user } = useAuth();

  return (
    <UserContext.Provider
      value={{
        user
      }}
    >
      <Router>
        <Suspense fallback={<InstagramLogo />}>
          <Switch>
            <IsUserLogedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
              <Login />
            </IsUserLogedIn>
            <IsUserLogedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP}>
              <SignUp />
            </IsUserLogedIn>
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
