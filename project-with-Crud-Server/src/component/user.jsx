import { useEffect, useState } from "react";
import { Link } from "react-router-dom";





const User = () => {
const [datas,setDatas]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/users')
        .then(res=>res.json())
        .then(data=>setDatas(data))
    },[])



    const handeldeleteUser=(_id)=>{
        console.log(_id);
        fetch(`http://localhost:3000/users/${_id}`, {
            method: "DELETE", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
           
          })
          .then(res=>res.json())
          .then(data=>{
            console.log(data);
            if(data.deletedCount>0){

                alert('Deleted Successfully');
                const remaining =datas.filter(data=> data._id!==_id)
                setDatas(remaining)
            }
          
          })


    }

    const handelUpdate=(_id)=>{

        
    }

    return (
        <div>
total User : {datas.length}
{
    datas.map((data,idx)=><p key={idx}>{data._id}-----{data?.name} 
   <Link to={`/user/${data._id}`}> <button onClick={()=>handelUpdate(data._id)}>Update</button> </Link>
    <button onClick={()=>handeldeleteUser(data._id)}>X</button></p>)
}
            
        </div>
    );
};

export default User;