import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    validationSchema: yup.object({
      email: yup.string().required('Enter your email').email('Enter a valid email'),
      password: yup.string().required('Enter your password')
    }),

    onSubmit: (data) => {
      handleLogin(data);
    }
  });

  const [errores, setErrores] = useState({
    firebaseerror: ''
  });

  const { firebaseerror } = errores;

  async function handleLogin({ email, password }) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      // Cleaning form
      formik.resetForm();

      setErrores({
        ...errores,
        firebaseerror: error.message
      });
    }
  }

  const isInvalid = formik.values.email === '' || formik.values.password === '';

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="Instagram Logo" className="mt-2 w-6/12 mb-4" />
          </h1>
          {
            firebaseerror && <p className="mb-4 text-xs text-red-primary">{ firebaseerror }</p>
          }
          <form onSubmit={formik.handleSubmit}>
            <input
              aria-label="Enter your email address"
              type="email"
              placeholder="Email"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 bg-gray-background"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            { formik.errors.email ? <p className="mb-4 text-xs text-red-primary">{ formik.errors.email }</p> : null }
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 bg-gray-background"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            { formik.errors.password ? <p className="mb-4 text-xs text-red-primary">{ formik.errors.password }</p> : null }
            <button
              type="submit"
              disabled={isInvalid}
              className={`bg-blue-medium text-white w-full rounded h-8 py-1 ${isInvalid && 'opacity-50'}`}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Don&apos;t have an account?
            {' '}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
