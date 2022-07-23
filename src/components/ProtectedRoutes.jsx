import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {

  //  Redux
  const user = useSelector(state => state.user)

  if(user){
      return <Outlet />
  } else { 
      return <Navigate to='/' />
  }
};

export default ProtectedRoutes;