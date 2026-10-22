import { Card } from '@/components/ui/card'
import {  Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import { Eye } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Comments = () => {
  const [allComments, setAllComments] = useState([])
  const navigate = useNavigate()


  const getTotalComments = async ()=> {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/comment/my-blogs/comments`, {withCredentials:true})
      if(res.data.success){
        console.log(res.data);
        setAllComments(res.data.comments)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getTotalComments()
  },[])
  console.log(allComments);
  
  return (
    <div className='pb-10 pt-20 md:ml-80 h-screen'>
      <div className='max-w-6xl mx-auto mt-8'>
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
          <Table>
            <TableCaption>A List of your recent comments.</TableCaption>
            <TableHeader>
              <TableRow>
                
                <TableHead>Blog Title</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
             </TableHeader>
             <TableBody>
              {allComments?.map((comment, index)=>(
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <h1 className='w-15 truncate md:w-full'>{comment.postId.title}</h1>
                  </TableCell>
                  <TableCell><h1 className='w-15 truncate md:w-full'>{comment.content}</h1></TableCell>
                  <TableCell>{comment.userId.firstName}</TableCell>
                  <TableCell className="text-right flex items-center justify-center">
                    <Eye className='cursor-pointer' onClick={()=>navigate(`/blogs/${comment.postId._id}`)}/>  
                  </TableCell>
                </TableRow>
              ))}
             </TableBody>
             
          </Table>
        </Card>
      </div>
    </div>
  )
}

export default Comments