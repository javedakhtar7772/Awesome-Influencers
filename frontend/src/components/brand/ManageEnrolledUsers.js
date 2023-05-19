import React, { useEffect, useState } from 'react'
import app_config from '../../config';

const ManageEnrolledUsers = ({jobId}) => {
  
    const {apiUrl} = app_config;
    const [enrolledList, setEnrolledList] = useState([]);


    const getEnrolledUsers = async () => {
        const res = await fetch(apiUrl+'/enroll/getbyjob/'+jobId);

        console.log(res.status());

        if(res.status === 200){
            const data = await res.json();
            setEnrolledList(data);
            console.log(data);
        }
    }

    useEffect(() => {
      getEnrolledUsers();
    }, [])
    

    const displayEnrollments = () => {
        return enrolledList.map(enroll => (
            <div>
                <p>User Name : {enroll._id}</p>
            </div>
        ))
    }

    return (
    <div>{displayEnrollments()}</div>
  )
}

export default ManageEnrolledUsers