import { useState, useEffect } from "react";
import axios from "axios";
import Edit from "../Edit";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";


const Admin = () => {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    

    const getUsers = async () => {
        try {
            const url = "http://localhost:8080/api/admin"
            const { data } = await axios.get(url)
            console.log(data);
            setUsers(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        getUsers()
    }, [])


    async function deleteUser(Id) { 
        
        try {
            const response = await axios.get('http://localhost:8080/api/admin/delete-user/' + Id)
            console.log(response)
            if (response.status === 200) {
                console.log(response.status)
                getUsers()
            }
        }
        catch (error) {
            console.log(error) 
        }

    }
    const handleLogout = ()=> {
        localStorage.removeItem('admintoken')
        window.location.reload()
    }
    
    return (    
        <div>

        <button className="btn" style={{float:'right',marginRight:'55px',marginTop:"15px",backgroundColor:"darkcyan",color:'white'}}
        onClick={handleLogout}
        >
            Logout</button><br/>

        <table className="container table mt-5  table-sm table-striped table-responsive table-hover">
            <input type="text" placeholder="Search" style={{marginRight:"10px",marginTop:'20px',marginBottom:'10px'}}
            onChange={(event)=>{
                setSearch(event.target.value)
                
            }}/>
            <thead className="table-dark">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>

                {users.filter((user)=>{
                    if(setSearch == ""){
                        return user
                    }
                    else if(user.firstName.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.lastName.toLowerCase().includes(search.toLowerCase())){
                        return user
                    }
                }).map((user) => {
                    return (

                        <tr>
                            <td>{user._id}</td>
                            <td>{user.firstName}{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/edit/${user._id}`}>
                                    <button className="btn btn-primary btn-sm" style={{marginLeft:'.5rem',backgroundColor:'#191970'}}>Edit</button>
                                </Link>
                                <button className="btn btn-danger btn-sm" style={{marginLeft:'.5rem',backgroundColor:'#FF0000'}} onClick={() => deleteUser(user._id)
                                }>Delete</button>
                            </td>


                        </tr>
                    )
                })

                }
            </tbody>
        </table>
        </div>
    )
}

export default Admin;