import React, {useContext, useState} from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import {useNavigate} from "react-router-dom";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import AuthInput from "../../components/input/AuthInput";
import {Link} from "react-router-dom";
import {validateEmail} from "../../utils/helper";
import {UserContext} from "../../context/UserContext.jsx";
import axiosinstance from "../../utils/axiosinstance.js";
import {API_PATHS} from "../../utils/apiPath.js";
import uploadImage from "../../utils/uploadImage.js";

const SignUpForm = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const {updateUser} = useContext(UserContext);
    const navigate = useNavigate();

    //Handle Sign Up Form Submit
    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

        if (!fullName) {
            setError("Please enter the full name.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!userName) {
            setError("Please enter the user name.");
            return;
        }

        if (!password) {
            setError("Please enter the password.");
            return;
        }

        setError("");

        //Sign Up API
        try {

            // Upload image if present
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosinstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                username: userName,
                email,
                password,
                profileImageUrl,
            });

            const {token, user} = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    };

    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSignUp}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <AuthInput
                            value={fullName}
                            onChange={({target}) => setFullName(target.value)}
                            label="Full Name"
                            placeholder="Jhon"
                            type="text"
                        />

                        <AuthInput
                            value={email}
                            onChange={({target}) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="Jhon@example.com"
                            type="text"
                        />

                        <AuthInput
                            value={userName}
                            onChange={({target}) => setUserName(target.value)}
                            label="Username"
                            placeholder="@"
                            type="text"
                        />

                        <AuthInput
                            value={password}
                            onChange={({target}) => setPassword(target.value)}
                            label="Password"
                            placeholder="Min 8 Characters"
                            type="password"
                        />
                    </div>

                    {error && <p className="text-xs text-red-500 pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        CREATE ACCOUNT
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Already have an account?{" "}
                        <Link className="font-medium underline text-primary" to="/login">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignUpForm;
