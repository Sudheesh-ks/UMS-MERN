import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { validation } from "../../utils/validation";
import { registerUser } from "../../redux/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Register=()=>{

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    usernameErr: "",
    emailErr: "",
    passwordErr: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user.user);

  useEffect(() => {
    if (state) {
      navigate("/");
    }
  }, [state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const isFilled = Object.values(formData).every((field) => field !== "");
      const isValidated = Object.values(errorMsg).every((err) => err === "");
      if (!isFilled || !isValidated) {
        toast.error("Please fill all fields correctly!");
        setIsLoading(false);
        return;
      }
      const success = await dispatch(registerUser(formData));
      if (success) {
        toast.success("Registration successful!");
        setIsLoading(false);
        navigate("/");
      } else {
        toast.error("Registration failed!");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message || "An Unexpected Error Occurred");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = validation(e.target);
    setErrorMsg((prev) => ({
      ...prev,
      [`${name}Err`]: val || "",
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                name="username"
                type="text"
                onChange={handleChange}
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </div>
            {errorMsg.usernameErr && (
              <p className="flex items-center gap-2 text-red-500 text-sm font-medium mt-2 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <span>{errorMsg.usernameErr}</span>
              </p>
            )}

            <div>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            {errorMsg.emailErr && (
              <p className="flex items-center gap-2 text-red-500 text-sm font-medium mt-2 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <span>{errorMsg.emailErr}</span>
              </p>
            )}

            <div>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            {errorMsg.passwordErr && (
              <p className="flex items-center gap-2 text-red-500 text-sm font-medium mt-2 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <span>{errorMsg.passwordErr}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Create account"}
          </button>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account? {" "}
          <button onClick={() => navigate("/login")} className="font-medium text-blue-600 hover:text-blue-500">
            Sign in here
          </button>
        </p>
      </div>
      <Toaster position="top-right" />
    </div>
  )
}

export default Register
