import { useContext } from 'react';
import { UserContext } from '../providers/user/UserProvider';

export const useUser = () => {
   const { userData, saveUserData } = useContext(UserContext);

    return {
        userData,
        saveUserData
    };
}

