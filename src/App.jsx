import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as ROUTES from './constants/routes';

import UserContext from './context/user';

import useAuth from './hooks/useAuth';

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
            <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
            <Route path={ROUTES.LOGIN} component={Login} exact />
            <Route path={ROUTES.SIGN_UP} component={SignUp} exact />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
