import { useParams } from 'react-router-dom';
import UserDetail from './UserDetail';

function UserDetailWithParams() {
  const params = useParams();
  console.log("Params: ");
  console.log(params.userId);
  return <UserDetail params={params} />;
}

export default UserDetailWithParams;
