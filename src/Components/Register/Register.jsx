import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/Authprovider";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [userSuccess, setUserSuccess] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { createUser } =  useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const name = form.get('name')
        const email = form.get('email')
        const photo = form.get('photo')
        const password = form.get('password')


        setUserSuccess('');
        setPasswordError('');
        setEmailError('');


        if (password.length < 6) {
            setPasswordError('Password should be at least 6 characters or longer')
            return;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError('password should have minimum one character in upper case')
            return;
        }



        createUser(email, password)
            .then(result => {
                console.log(result.user)
                if (result.user) {
                    Swal.fire({
                        title: "Success!",
                        text: "Register successfully!",
                        icon: "success"
                    });
                }
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo
                })
                    .then()
                    .catch(error => {
                        console.log(error)
                    })

                setUserSuccess('user created successfully')
                // navigate('/')
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                console.error(error.message);
                setEmailError('email-already-in-used');

            })

    };
    

    return (
        <div className="min-h-screen lk p-2">
        <Helmet>
            <title>Register</title>
        </Helmet>
        
        <div   className="w-4/5 lg:w-1/3 md:w-2/3 bg-gradient-to-r from-violet-950 to-blue-900 mx-auto mt-36 shadow-xl p-5 rounded-lg my-20">
            
            
            <h2 className="text-2xl font-bold text-center my-3">Please Register </h2>

            {
                userSuccess && <p className="  text-green-500">{userSuccess}</p>
            }

            <form onSubmit={handleRegister}>

                <p>Name</p>
                <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="name" placeholder="Name" id="name" required />

                <p>Photo URL</p>
                <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="photo" placeholder="Photo URL" id="photo" />

                <p>Email</p>
                <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="email" name="email" placeholder="Email" id="email" required />
                {
                    emailError && <p className="  text-red-500">{emailError}</p>
                }

                <p>Password</p>
                <div className="relative">
                    <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" required />
                    <span className="absolute top-1/4 right-3" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                    </span>
                </div>


                {
                    passwordError && <p className="text-red-500">  {passwordError}</p>
                }

                <input className=" w-full px-4 py-2 text-center text-lg rounded-md from-blue-950 to-violet-900  hover:bg-violet-800 border hover:border-red-500 text-white font-bold my-3" type="submit" value="Register" />
            </form>

            <p className="text-white">Already have an account ? <Link to='/login' className="text-red-500 font-bold underline">please Login</Link></p>



        </div>
    </div>
    );
};

export default Register;