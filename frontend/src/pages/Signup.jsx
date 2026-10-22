import React, { use, useState } from "react";
import auth from "../assets/photo6.jpg";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import axios from 'axios';
import { setLoading } from "../redux/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {loading} = useSelector(store=>store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    Password: "",
  });
  //function
  const handleChange = (event) => {
    
    const { name, value } = event.target;
    setUser((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);

    try {
      dispatch(setLoading(true))
      const res = await axios.post('http://localhost:8000/api/v1/user/register', user, {
        headers: {
          "Content-Type":"application/json"
        },
        withCredentials : true
      })
      if(res.data.success){
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <div className="flex h-screen md:pt-14 md:h[750px]">
      <div className="hidden md:block w-1/2 h-full">
        <img src={auth} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex justify-center items-center flex-1 px-4 md:px-4">
        <Card className="w-full max-w-md p-7 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">
                Create Your Account
              </h1>
            </CardTitle>
            <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
              Enter Your details below to create your account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="dark:border-gray-600 dark:bg-gray-900"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="dark:border-gray-600 dark:bg-gray-900"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="yohan.libert@example.com"
                  name="email"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={user.password}
                  onChange={handleChange}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="absolute right-3 top-6 text-gray-500"
                >
                  {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
              </div>
              <Button type="submit" className="w-full">
                 {
                  loading ? (
                    <>
                    <Loader2 className='mr-2 w-4 h-4 animate-spin'/>
                    Please wait
                    </>
                  ) : ('Sign Up')
                }
              </Button>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Already have an account? &nbsp;
                <Link to={"/login"}>
                  <span className="underline cursor-pointer hover:text-gray-900 dark:hover:text-gray-300">
                    Sign in
                  </span>
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
