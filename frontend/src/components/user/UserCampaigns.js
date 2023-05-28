import React, { useEffect } from 'react';
import { useState } from 'react';
import app_config from '../../config';

const UserCampaigns = () => {
  const [jobList, setJobList] = useState([]);
  const { apiUrl } = app_config;
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const getJobs = async () => {
    const res = await fetch(`${apiUrl}/enroll/getbyuser/${currentUser._id}`);
    console.log(res.status);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setJobList(data.result);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const displayJobs = () => {
    if (jobList.length) {
      return jobList.map((job, index) => (
        <div className="col-md-3" key={index}>
          <div className="card mb-3">
            <div className="card-header">
              <p className="m-0 h3">{job.job.title}</p>
            </div>
            <div className="card-body">
              <p className="card-text">{job.job.description}</p>
              <p className="card-text">Start Date: {new Date(job.job.startDate).toLocaleDateString()}</p>
              <p className="card-text">End Date: {new Date(job.job.endDate).toLocaleDateString()}</p>
              {/* <p className="card-text">Status: {displayStatus(job.job)}</p> */}
            </div>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="text-center">
          <p className="m-0 h3">No Jobs Found</p>
        </div>
      );
    }
  };

  return (
    <div>
      <header>
        <div className="container"></div>
      </header>

      <hr className="my-5" />

      <main>
        <div className="container">
          <div className="row">{displayJobs()}</div>
        </div>
      </main>
    </div>
  );
};

export default UserCampaigns;
