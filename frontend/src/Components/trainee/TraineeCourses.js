import React, { useEffect, useState } from "react";
import TraineeCourse from "../TraineeCourse";
import useFetch from "../AuthComponents/UseFetch";
// import CourseCompletion from "./Congratulations";

export default function TraineeCourses() {
  const { fetchData , resData } = useFetch();
  const [courses,setCourses] = useState([]);
  const companyID = localStorage.getItem('companyId');

  useEffect(()=>{
      const getCourses = async () => {
        const res = await fetchData({url: 'http://127.0.0.1:8000/api/trainee/company/'+companyID+'/courses', method: 'get'}) 
        console.log(res);
        setCourses(res);
      }
        getCourses();
  },[])

  
  return (
    <>
      <div className='flex flex-wrap gap-3 '>
        {
          courses?.map((item)=>{
            return (
              <TraineeCourse key={item.id} id={item.id} data={item} />
            )
          })
        }
      </div>
    </>
  );
}
