import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "../components/ui/input";
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "@/redux/authSlice";
import { setBlog } from "@/redux/blogSlice";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {blog, loading} = useSelector (store=>store.blog)

  console.log(blog);

  const getSelectedCategory = (value) => {
    setCategory(value)
  }

  const createBlogHandler = async() => {
    console.log('create button clicked')
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`http://localhost:8000/api/v1/blog`, {title, category}, {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
    })
    if(res.data.success) {
      if(!blog){
        dispatch(setBlog([res.data.blog]));
        navigate(`/dashboard/write-blog/${res.data.blog._id}`);
        toast.success(res.data.message)
      }
      dispatch(setBlog([...blog, res.data.blog]));
      navigate(`/dashboard/write-blog/${res.data.blog._id}`);
      toast.success(res.data.message)
    }else{
      toast.error("Something went Wrong")
    }
    } catch (error) {
      console.log("ERROR", error);
      console.log(error.response)
    } finally{
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="p-4 pt-20 md:ml-80 md:pr-20 md:h-screen min-h-screen mt-5">
      <Card className="md:p-10 p-4 dark:bg-gray-800 -space-y-3">
        <h1 className="text-2xl font-bold">Let's create blog</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
          provident, rem, laborum tempore, facilis nesciunt velit quod officia
          assumenda in beatae incidunt? Ratione aspernatur temporibus mollitia
          odit nobis vitae perferendis?
        </p>
        <div className="mt-5">
          <div>
            <Label className='mb-2'>Title</Label>
            <Input
              type="text"
              placeholder="Your blog name"
              value={title} onChange={(event)=> setTitle(event.target.value)}
              className="bg-white dark:bg-gray-700"
            />
          </div>
          <div className="mt-4 mb-5">
            <Label className='mb-2'>Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a category"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button disabled={loading} onClick={createBlogHandler}>
              {
                loading ? <><Loader2/>Please Wait</> : "Create"
              }
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateBlog;
