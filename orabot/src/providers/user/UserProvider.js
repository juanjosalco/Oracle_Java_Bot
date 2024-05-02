import {
    useReducer,
    useMemo,
    createContext,
  } from 'react';
  import userReducer from './UserReducer';
  
  
  export const UserContext = createContext({
    userData: {
        token: '',
        UID: 0,
        team_id: 0,
        role: '',
    },
    saveUserData: () => {},
  });
  
  export const UserProvider = ({ children }) => {
    const initialState = {
      userData: {
        token: '',
        UID: 0,
        team_id: 0,
        role: '',
      },
      saveUserData: () => {},
    };
  
    const [state, dispatch] = useReducer(userReducer, initialState);
  
    const saveUserData = (userData) => {
      dispatch({ type: 'SAVE_USER_DATA', payload: userData });
    };
  
    const contextValue = useMemo(() => {
      return {
        userData: state.userData,
        saveUserData,
      };
    }, [state.userData]);
  
    return (
      <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
  };
  