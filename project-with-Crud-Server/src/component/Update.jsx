import { useLoaderData } from "react-router-dom";


const Update = () => {

    const user =useLoaderData();
    console.log(user);

const userUpdate =(e)=>{
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email= form.email.value;
    const updateUser ={name,email}
    console.log(name,email);

    fetch(`http://localhost:3000/user/${user._id}`, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(updateUser)
       
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        if(data.modifiedCount>0){
            alert('updated successfully')
            form.reset();
        }
      })


}


    return (
        <div>
        <h1>    Update User---:  {user.name}</h1>
        <form onSubmit={userUpdate} >

            <input type="text" name="name" defaultValue={user.name} id="" />
            <br />
            <input type="text" name="email" defaultValue={user.email} id="" />
            <br />
            <input type="submit" value="Update " />
        
        </form>


            
        </div>
    );
};

export default Update;