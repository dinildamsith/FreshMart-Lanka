import { useState } from "react";
import {Link, useNavigate} from "react-router";
import {EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import {signIn} from "../../services/auth/authServices.ts";
import toast from "react-hot-toast";

export default function SignInForm() {

  const navigation = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")


  const [error, setError] = useState({
    emailInput: false,
    passwordInput: false
  })


  //-------------------------handel sign in
  const signInData = {
    email,
    password
  }

  const signInHandel = async () => {
    if (!email || !password){
      setError({
        emailInput: !email,
        passwordInput: !password
      })
      toast.error("Please fill in all required fields.");
    } else {

     const res = await signIn(signInData)

      if (res.status == 'SUCCESS'){
        console.log(res.data.token)
        localStorage.setItem("token", res.data.token)
        navigation("/dashbord")
        setLoading(false)
      } else {
        setLoading(false)
      }
    }

  }

  return (
    <div className="flex flex-col flex-1">
      {loading && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[9999] bg-opacity-50 bg-gray-200">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3bd7f7] rounded-full animate-spin"></div>
          </div>
      )}
      <div className="w-full max-w-md pt-10 mx-auto">
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                      error={error.emailInput}
                      placeholder="info@gmail.com"
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                        error={error.passwordInput}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                      type={"button"}
                      onClick={() => signInHandel()}
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                    to="/signup"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
