import React, { useState } from 'react'
import auth from "../assets/photo6.jpg";
import { Card, CardContent,  CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Eye, EyeOff, Loader, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/authSlice.js';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {loading} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const [input, setInput] = useState({
      email: "",
      Password: "",
    });

    //function
    const handleChange = (event) => {
      const { name, value } = event.target;
      setInput((previous) => ({
        ...previous,
        [name]: value,
      }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault()
      console.log(input);

      try {
        dispatch(setLoading(true))
        const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials:true
        })
        if(res.data.success){
           dispatch(setUser(res.data.user));
           toast.success(res.data.message);
            navigate('/');
        }
      } catch (error) {
        console.log(error);
        
      } finally{
        dispatch(setLoading(false))
      }
    }

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
                Login into your account
              </h1>
            </CardTitle>
            <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
              Enter Your details below to login your account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label className="mb-1">Email</Label>
                <Input
                  type="email"
                  placeholder="Email ID"
                  name="email"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={input.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Label className="mb-1">Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  name="password"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={input.password}
                  onChange={handleChange}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="absolute right-3 top-7 text-gray-500"
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
                  ) : ('Login')
                }
              </Button>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Don't have an account?&nbsp;&nbsp;
                <Link to={"/signup"}>
                  <span className="underline cursor-pointer hover:text-gray-900 dark:hover:text-gray-300">
                    Sign up
                  </span>
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login