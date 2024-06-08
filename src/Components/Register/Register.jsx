import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/Authprovider";
import { Helmet } from "react-helmet";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import userAxios from "../AxoisHook/userAxios";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', photo: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const [userSuccess, setUserSuccess] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = userAxios();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePassword = (password) => {
        if (password.length < 6) {
            return 'Password should be at least 6 characters or longer';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password should have at least one uppercase character';
        }
        return '';
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { name, email, photo, password } = formData;

        setUserSuccess('');
        setPasswordError('');
        setEmailError('');

        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        try {
            const result = await createUser(email, password);
            const user = result.user;
            await updateProfile(user, {
                displayName: name,
                photoURL: photo
            });

            const userInfo = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                badge: 'Bronze'
            };

            const res = await axiosPublic.post('/users', userInfo);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Registered successfully!",
                    icon: "success"
                }).then(() => {
                    navigate(location?.state?.from || '/Login');
                });
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setEmailError('Email is already in use');
            } else {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                });
            }
        }
    };

    return (
        <div className="min-h-screen lk p-2">
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className="w-4/5 lg:w-1/3 md:w-2/3 bg-gradient-to-r from-violet-950 to-blue-900 mx-auto mt-36 shadow-xl p-5 rounded-lg my-20">
                <h2 className="text-2xl font-bold text-center my-3">Please Register</h2>

                {userSuccess && <p className="text-green-500">{userSuccess}</p>}

                <form onSubmit={handleRegister}>
                    <p className="text-white">Name</p>
                    <input
                        className="border-2 rounded-md w-full px-4 py-2 mb-2"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />

                    <p className="text-white">Photo URL</p>
                    <input
                        className="border-2 rounded-md w-full px-4 py-2 mb-2"
                        type="text"
                        name="photo"
                        placeholder="Photo URL"
                        value={formData.photo}
                        onChange={handleInputChange}
                    />

                    <p className="text-white"> Email</p>
                    <input
                        className="border-2 rounded-md w-full px-4 py-2 mb-2"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {emailError && <p className="text-red-500">{emailError}</p>}

                    <p className="text-white">Password</p>
                    <div className="relative">
                        <input
                            className="border-2 rounded-md w-full px-4 py-2 mb-2"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <span className="absolute top-1/4 right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </span>
                    </div>
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                    <p className="text-white">Badge</p>
                    <input
                        className="border-2 rounded-md w-full px-4 py-2 mb-2"
                        type="text"
                        name="badge"
                        placeholder="Badge"
                        value="Bronze" // Set default value to "Bronze"
                        readOnly // Make it non-editable
                        required
                    />
                    <input
                        className="w-full px-4 py-2 text-center text-lg rounded-md bg-gradient-to-r from-blue-950 to-violet-900 hover:bg-violet-800 border hover:border-red-500 text-white font-bold my-3"
                        type="submit"
                        value="Register"
                    />
                </form>

                <p className="text-white">Already have an account? <Link to='/login' className="text-red-500 font-bold underline">Please Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
