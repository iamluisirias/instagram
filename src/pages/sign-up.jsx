import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

import { doesUsernameExist } from '../services/firebase';

const SignUp = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      username: '',
      password: ''
    },

    validationSchema: yup.object({
      email: yup
        .string()
        .required('Enter your email')
        .email('Enter a valid email'),
      name: yup.string().required('Enter your name'),
      username: yup.string().required('Enter your username'),
      password: yup
        .string()
        .required('Enter your password')
        .min(8, 'Password has to be at least 8 characters long')
    }),

    onSubmit: (data) => {
      handleSignUp(data);
    }
  });

  const [errores, setErrores] = useState({
    firebaseerror: ''
  });

  const { firebaseerror } = errores;

  async function handleSignUp({
    email, name, username, password
  }) {
    const usernameExists = await doesUsernameExist(username);

    // if the array of coinicides for a username is empty, then is a new username
    if (usernameExists.length === 0) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        // authentication
        // email & password $ username
        await createdUserResult.user.updateProfile({
          displayName: username
        });

        // firebase user collection (Create a document)
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName: name,
          emailAddress: email.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now()
        });

        // Redirection to dashboard
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        // Cleaning form
        formik.resetForm();

        // Catching firebase error
        setErrores({
          ...errores,
          firebaseerror: error.message
        });
      }
    } else {
      setErrores({
        ...errores,
        firebaseerror: 'That username is already taken, please try another.'
      });
    }
  }

  const isInvalid = formik.values.email === '' || formik.values.password === '' || formik.values.name === '' || formik.values.username === '';

  useEffect(() => {
    document.title = 'Sign up - Instagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center justify-center h-screen">
      <div className="flex flex-col w-5/12">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 px-8">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram Logo"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {
            firebaseerror && (<p className="mb-4 text-xs text-red-primary">{ firebaseerror }</p>)
          }
          <form onSubmit={formik.handleSubmit}>
            <legend className="text-gray-legend font-bold mb-4">Sign up to see photos and videos from your friends.</legend>
            <input
              aria-label="Enter your email address"
              type="email"
              placeholder="Email"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 bg-gray-background"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {
              formik.errors.email && (<p className="mb-4 text-xs text-red-primary">{ formik.errors.email }</p>)
            }
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 bg-gray-background"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {
              formik.errors.name && (<p className="mb-4 text-xs text-red-primary">{ formik.errors.name }</p>)
            }
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 bg-gray-background"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {
              formik.errors.username && (<p className="mb-4 text-xs text-red-primary">{ formik.errors.username }</p>)
            }
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 bg-gray-background"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {
              formik.errors.password && (<p className="mb-4 text-xs text-red-primary">{ formik.errors.password }</p>)
            }
            <button
              type="submit"
              disabled={isInvalid}
              className={`bg-blue-medium text-white w-full rounded h-8 py-1 ${
                isInvalid && 'opacity-50'
              }`}
            >
              Sign up
            </button>
          </form>
          <p className="text-xs text-gray-legend mt-4 text-center">By Signing up, you agree to our Terms, Data Policy and Cookies Policy .</p>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Have an account?
            {' '}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
