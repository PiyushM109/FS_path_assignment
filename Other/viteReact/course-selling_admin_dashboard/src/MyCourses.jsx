import { useEffect, useState } from "react";
export default function MyCourses(){
    const [courses,setCourses] = useState([]);

    useEffect(()=>{
        function callback2(data){
            setCourses(data.courses);  
        }
        function callback1(res){
            res.json().then(callback2)
        }
        fetch("http://localhost:3000/admin/courses",{
            method:"GET",
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("token")
            }
        }).then(callback1)
      },[]);
    return (
        <div>
            <div>{JSON.stringify(courses)}</div>
        </div>
    );
}