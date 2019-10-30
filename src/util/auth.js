import React, { useState, useEffect, useContext, createContext } from "react";
import queryString from "query-string";
import fakeAuth from "fake-auth";

/*
    Handles authentication with fakeAuth, a library for prototyping ...
    ... auth flows without need for a backend (everything is stored locally).

    [CHANGING AUTH SERVICES]: You can switch to another auth service ...
    ... like firebase, auth0, etc, by modifying the useProvideAuth() ...
    ... function below. Simply swap out the fakeAuth.function() calls for the ...
    ... correct ones for your given auth service.
  */

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... update when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    return fakeAuth.signin(email, password).then(user => {
      setUser(user);
      return user;
    });
  };

  const signup = (email, password) => {
    return fakeAuth.signup(email, password).then(user => {
      setUser(user);
      return user;
    });
  };

  const signout = () => {
    return fakeAuth.signout().then(() => {
      setUser(false);
    });
  };

  const sendPasswordResetEmail = email => {
    return fakeAuth.sendPasswordResetEmail(email);
  };

  const confirmPasswordReset = (password, code) => {
    // If no reset code passed in then fetch it automatically from current url.
    // [CHANGING AUTH SERVICES]: If not passing in the code as the second ...
    // ... arg above then make sure getFromQueryString() below has the ...
    // ... correct url parameter name (it might not be "code").
    const resetCode = code || getFromQueryString("code");
    return fakeAuth.confirmPasswordReset(password, resetCode);
  };

  // Subscribe to user on mount
  // [CHANGING AUTH SERVICES]: Not all auth services have a subscription ...
  // ... function so depending on your service you may need to remove  ...
  // ... this effect and use the commented out one below.
  useEffect(() => {
    const unsubscribe = fakeAuth.onChange(user => {
      setUser(user);
    });

    // Call unsubscribe on cleanup
    return () => unsubscribe();
  }, []);

  // Fetch user on mount
  // [CHANGING AUTH SERVICES]: If your auth service doesn't have a subscribe ...
  // ... function then use this effect instead of the one above and modify ...
  // ... to work with your chosen auth service.
  /*
    useEffect(() => {
      yourAuthService.getUser().then(user => {
        setUser(user);
      });
    }, []);
    */

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset
  };
}

const getFromQueryString = key => {
  return queryString.parse(window.location.search)[key];
};
