import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export const withWrapper = (Component) => {
  const Wrapper = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const { user, login, register } = useContext(AuthContext);

    return (
      <Component
        {...props}
        {...params}
        navigate={navigate}
        user={user}
        login={login}
        register={register}
        />
    );
  };
  
  return Wrapper;
};