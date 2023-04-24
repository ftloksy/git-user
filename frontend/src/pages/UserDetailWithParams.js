import { useParams } from 'react-router-dom';
import UserDetail from './UserDetail';

function UserDetailWithParams() {
  
  // Get the URL parameters using useParams() hook
  const params = useParams();
  
  // Render the UserDetail component with params prop
  return <UserDetail params={params} />;
}

export default UserDetailWithParams;
