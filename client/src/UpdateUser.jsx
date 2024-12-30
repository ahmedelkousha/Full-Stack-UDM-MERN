import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";

export default function UpdateUser() {

    const { id } = useParams();
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({ Name: '', Email: '', Age: '' })

    useEffect(() => {
        axios.get("https://udm-server.vercel.app/getUser/" + id).then((result) => {
            console.log(result);
            setUserInfo({Name:result.data.Name, Email:result.data.Email, Age:result.data.Age})
        }).catch((err) => {
            console.log(err)
        })
    },[id])

    const Update = (e) => {
        e.preventDefault();
        axios.put("https://udm-server.vercel.app/updateUser/" + id, { ...userInfo }).then((result) => {
            console.log(result)
            navigate('/')
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>
                    <h2>Edit User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input required value={userInfo.Name} type="text" placeholder="Enter Name" className="form-control" onChange={
                            (e) => { setUserInfo({ ...userInfo, Name: e.target.value }) }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input required value={userInfo.Email} type="text" placeholder="Enter Email" className="form-control" onChange={
                            (e) => { setUserInfo({ ...userInfo, Email: e.target.value }) }
                        } />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input required value={userInfo.Age} type="text" placeholder="Enter Age" className="form-control" onChange={
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
