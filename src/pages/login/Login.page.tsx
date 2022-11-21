import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { signInWithGoogle } from "../../services/sercurity.service";
import { localStorageKeys } from "../../constants/app.constants";
import { useDispatch } from "react-redux";
import { appActions } from "../../redux/app/app.reducer";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSuccess = (user: any) => {
    localStorage.setItem(localStorageKeys.User, JSON.stringify(user));
    navigate('/home/matches');
    dispatch(appActions.setUser(user));
  }

  const loginWithGG = async () => {
    try {
      const response = await signInWithGoogle();
      loginSuccess(response);
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <div className="login">
      <form className="login__form">
        <Button onClick={loginWithGG} variant="contained">Login with Google</Button>
      </form>
    </div>
  )
}

export default LoginPage;