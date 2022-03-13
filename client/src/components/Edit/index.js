import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from './styles.module.css'
import { useParams, Navigate, useNavigate } from 'react-router-dom'

function Edit() {

    const { id } = useParams()
    console.log({ id })
    const [Id, setId] = useState('')

    useEffect(() => {

        setId(id)
    })
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    })

    const getUser = async () => {
        try {
            console.log("Id", id)
            const url = "http://localhost:8080/api/admin/user/" + id;
            await axios.get(url).then((response) => {

                console.log(response.data)
                setData(response.data)
            })

            console.log(data)

        }

        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const Navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `http://localhost:8080/api/admin/user/edit/${data._id}`;
            await axios.post(url, data).then((res) => {
                Navigate('/admin')
            })
        } catch (error) {
            console.log(error)
        }

    }
    return (
       
               <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
            <div className={styles.right}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Edit User</h1>
                    <input type="text" placeholder='First Name'
                        name='firstName' onChange={handleChange}
                        value={data.firstName} required className={styles.input} />

                    <input type="text" placeholder='Last Name'
                        name='lastName' onChange={handleChange}
                        value={data.lastName} required className={styles.input} />

                    <input type="text" placeholder='Email'
                        name='email' onChange={handleChange}
                        value={data.email} required className={styles.input} />



                    <button type='submit' className={styles.green_btn}>Edit</button>
                </form>
            </div>
        </div>
        </div>
        
    )
}
export default Edit;

