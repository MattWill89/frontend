import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useStateInitializer from '../custom_hooks/useStateInitializer';

const LoginForm = ({auth, setUser}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [email, setEmail] = useStateInitializer('');
    const [password, setPassword] = useStateInitializer('');
    const [errorMessage, setErrorMessage] = useStateInitializer('');

    const navigate = useNavigate();

    const onSubmit = () => {
        handleLogin(email, password);
    }

    const handleLogin = async (email, password) => {
        try {
          await auth.signInWithEmailAndPassword(email, password);
          console.log("Sign In Successful!");
          navigate('/');
        } catch(error) {
          console.error('Error signing in', error);
          setErrorMessage("Wrong Username / Password");
        }
    }

    return (
        <>  
            <br />
            <h1>LoginForm</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Email</p>
                <input value={email} type="text" {...register("email")}  onChange={(e) => setEmail(e.target.value)} />
                <p>Password</p>
                <input value={password} type="password" {...register("password")} onChange={(e) => setPassword(e.target.value)}/>
                <br />
                <br />
                <button type="submit" class="btn btn-primary">Log In</button>
            </form>
            <br />
            <p style={{color: 'red'}}>{errorMessage}</p>
        </>
    )
}

export default LoginForm;