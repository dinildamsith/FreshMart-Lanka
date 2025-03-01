import {useState} from "react";
import {Link, useNavigate} from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Select from "../form/Select.tsx";
import {signUp} from "../../services/auth/authServices.ts";
import toast from "react-hot-toast";



export default function SignUpForm() {

    const navigation = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false)

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");

    const [error , setError] = useState({
      firstNameInput: false,
      lastNameInput: false,
      emailInput: false,
      passwordInput: false,
      roleSelector: false
    })


  //--------------------------Sing up Handel
    const signUpData = {
      firstName,
      lastName,
      email,
      role,
      password
    }

    const signUpHandel = async () => {

      console.log(!firstName)
      console.log(!!firstName)
      if (!firstName || !lastName || !email || !password || !role) {
        setError({
          firstNameInput: !firstName,
          lastNameInput: !lastName,
          emailInput: !email,
          passwordInput: !password,
          roleSelector: !role
        });

        toast.error("Please fill in all required fields.");
        return; // Stop the function if validation fails
      } else {
        setLoading(true)
        const res = await signUp(signUpData)

        if (res.status == 'SUCCESS'){
            setLoading(false)
            navigation("/signin")
        } else {
            setLoading(false)
        }

      }

    }

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">

      {loading && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[9999] bg-opacity-50 bg-gray-200">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3bd7f7] rounded-full animate-spin"></div>
          </div>
      )}

      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      First Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                        type="text"
                        id="fname"
                        name="fname"
                        error={error.firstNameInput}
                        placeholder="Enter your first name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Last Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                        type="text"
                        id="lname"
                        name="lname"
                        error={error.lastNameInput}
                        placeholder="Enter your last name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                      type="email"
                      id="email"
                      name="email"
                      error={error.emailInput}
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Select Role
                    <span className="text-error-500">*</span>
                  </Label>
                  <Select
                      options={[
                        { value: "ADMIN", label: "Admin" },
                        { value: "USER", label: "User" },
                      ]}
                      placeholder="Select Customer"
                      defaultValue={role}
                      onChange={setRole}
                      className="dark:bg-dark-900"
                    />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        error={error.passwordInput}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5"/>
                      ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5"/>
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Checkbox --> */}
                <div className="flex items-center gap-3">
                  <Checkbox
                      className="w-5 h-5"
                      checked={isChecked}
                      onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    By creating an account means you agree to the{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Terms and Conditions,
                    </span>{" "}
                    and our{" "}
                    <span className="text-gray-800 dark:text-white">
                      Privacy Policy
                    </span>
                  </p>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button
                      type={"button"}
                      onClick={() => signUpHandel()}
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?
                <Link
                    to="/signin"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
