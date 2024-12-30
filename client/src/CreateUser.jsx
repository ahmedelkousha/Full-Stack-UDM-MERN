import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function CreateUser() {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ Name: '', Email: '', Age: '' })
    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/createUser", { ...userInfo }).then((result) => {
            console.log(result);
            navigate('/')
        }).catch((err) => {
            console.log(err);
        })
    }
    
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input required type="text" placeholder="Enter Name" className="form-control" onChange={
                            (e) => { setUserInfo({ ...userInfo, Name: e.target.value }) }
                        } />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input required type="text" placeholder="Enter Email" className="form-control" onChange={
                            (e) => { setUserInfo({ ...userInfo, Email: e.target.value }) }
                        } />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input required type="text" placeholder="Enter Age" className="form-control" onChange={
                            (e) => { setUserInfo({ ...userInfo, Age: e.target.value }) }
                        } />
                    </div>
                    <button className="btn btn-success">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
