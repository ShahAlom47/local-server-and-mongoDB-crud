
import './App.css'

function App() {
  const handelAddUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user);

    fetch("http://localhost:3000/user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.insertedId){
        alert('user added successfully')
        form.reset()
      }
    
    })
  
  }
  





return (
  <>

    <h1> Project With CRUD Server</h1>

    <form onSubmit={handelAddUser}>

      <input type="text" name="name" id="" />
      <br />
      <input type="email" name="email" id="" />
      <br />
      <input type="submit" value="Add User" />
    </form>

  </>
)
}

export default App
