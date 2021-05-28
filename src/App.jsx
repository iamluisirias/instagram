import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InstagramLogo from './components/InstagramLogo';
import * as ROUTES from './constants/routes';
/*
  - lazy es un import dinámico que lo que hace es que webpack divida el código de la app del bundle
  y busque solo por ese elemento.
  - Suspense es la forma en que se renderizara el componente lazy
  - el atributo fallback es lo que se mostrará mientras carga el componente lazy.
*/
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));

const App = () => {
  const hola = 'Hola mundo';

  return (
    <>
      <Router>
        <Suspense fallback={<InstagramLogo />}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
