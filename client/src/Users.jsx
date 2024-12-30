import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Users() {
    const [users, setUsers] = useState([{
    }])

    const handleDelete = (id) => {
        axios.delete('https://udm-server.vercel.app/deleteUser/' + id).then((res) => {
            console.log(res);

        }).catch((err) => {
            console.log(err);

        })
    }

    useEffect(() => {
        axios.get("https://udm-server.vercel.app").then((result) => {
            setUsers(result.data)
        }).catch((err) => {
            console.log(err)
        })
    })

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="bg-white rounded p-3">
                <Link to="/create" className="btn btn-success">Add +</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user._id}</td>
                                <td>{user.Name}</td>
                                <td>{user.Email}</td>
                                <td>{user.Age}</td>
                                <td>
                                    <Link className="btn btn-success" to={`/update/${user._id}`}>Edit</Link>
                                    <button onClick={() => {
                                        handleDelete(user._id)
                                    }} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
