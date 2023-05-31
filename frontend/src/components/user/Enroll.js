import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import app_config from "../../config";

const Enroll = () => {
  const { jobid } = useParams();

  const [jobDetails, setJobDetails] = useState(null);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [loading, setLoading] = useState(false);

  const { apiUrl } = app_config;

  const getJobData = async () => {
    setLoading(true);
    const res = await fetch(`${apiUrl}/job/getbyid/${jobid}`);
    console.log(res.status);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setJobDetails(data.result);
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobData();
  }, []);

  const displayJobDetails = () => {
    if (loading || jobDetails ===null) {
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card">
          <div className="card-header">
            <p className="m-0 h3">{jobDetails.title}</p>
          </div>
          <div className="card-body"></div>
        </div>
      );
    }
  };

  return <div>
    <header>
        <div className="container"></div>

    </header>
    <main>
        <div className="container">
            {displayJobDetails()}
            </div>
    </main>
  </div>;
};

export default Enroll;