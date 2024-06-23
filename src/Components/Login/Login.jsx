import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/Authprovider";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2';
import app from "../firebase/firebase.config";
import userAxios from "../AxoisHook/userAxios";

const Login = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = userAxios();

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    badge: 'Bronze',
                };

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'You have successfully logged in',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                navigate(location.state?.from || '/');
                            });
                        }
                    });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Seems like you dont have an account. Please register.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    const googleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                const userInfo = {
                    name: loggedInUser.displayName,
                    email: loggedInUser.email,
                    photoURL: loggedInUser.photoURL,
                    badge: 'Bronze',
                };

              
                navigate(location.state?.from || '/');

               
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'You have successfully logged in with Google',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error saving user data:", error);
                    });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    const gitSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const loggedInUser = result.user;
            const userInfo = {
                name: loggedInUser.displayName,
                email: loggedInUser.email,
                photoURL: loggedInUser.photoURL,
                badge: 'Bronze',
            };

            // Navigate immediately after login
            navigate(location.state?.from || '/');

            // Send user data to the backend in the background
            axiosPublic.post('/users', userInfo)
                .then(res => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'You have successfully logged in with GitHub',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                })
                .catch(error => {
                    console.error("Error saving user data:", error);
                });
        })
        .catch(error => {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="min-h-screen flex justify-center items-center lk">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="con mt-24">
                {[...Array(50)].map((_, i) => <span style={{ '--i': i }} key={i}></span>)}
                <div className="login-box">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-box">
                            <input type="email" name="email" required />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <input type={showPassword ? "text" : "password"} name="password" required />
                            <label>Password</label>
                            <div className="eye-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </div>
                        </div>
                        <div className="flex mt-5 justify-center gap-5">
                            <button type="submit" className="btn">Login</button>
                            <div>
                                <button type="button" onClick={googleSignIn} className="text-2xl text-white p-3 rounded-2xl">
                                    <FcGoogle size={32} />
                                </button>
                                <p>Google</p>
                            </div>
                            <div>
                                <button type="button" onClick={gitSignIn} className="text-2xl text-white p-3 rounded-2xl">
                                    <FaGithub size={32} />
                                </button>
                                <p>GitHub</p>
                            </div>
                        </div>
                        <div className="signup-link">
                            <p className="text-white">Don't have an account?
                                <Link to='/register' className="text-red-500 font-bold underline">Please Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
