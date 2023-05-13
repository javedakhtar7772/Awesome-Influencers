import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import app_config from "../../config";

const JobDetails = () => {
  const { jobid } = useParams();
  const { apiUrl } = app_config;
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [termsAccepted, setTermsAccepted] = useState(false);

  const getJobDetails = async () => {
    // console.log(id);

    const res = await fetch("http://localhost:5000/job/getbyid/" + jobid);
    console.log(res.status);
    if (res.status === 200) {
      const { result } = await res.json();
      setJobDetails(result);
      console.log(result);
    }
  };

  useEffect(() => {
    getJobDetails();
  }, []);

  const getStatusBadge = (status) => {
    if (status === "pending") {
      return <span className="badge bg-warning">{status}</span>;
    } else if (status === "completed") {
      return <span className="badge bg-success">{status}</span>;
    } else if (status === "rejected") {
      return <span className="badge bg-danger">{status}</span>;
    } else {
      return <span className="badge bg-info">{status}</span>;
    }
  };

  const isUserEnrolled = () => {
    return jobDetails.enrolled.includes(currentUser._id);
  };

  const enrollToJob = async () => {
    const res = await fetch(apiUrl + "/enroll/add/", {
      method: "POST",
      body: JSON.stringify({
        job: jobid,
        user: currentUser._id,
        created_at: new Date(),
        updated_at: new Date(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      const { result } = await res.json();
      setJobDetails(result);
    }
  };

  const processEnrollment = () => {
    if (currentUser !== null) {
      return isUserEnrolled() ? (
        <button className="btn btn-danger" disabled>
          Already Enrolled
        </button>
      ) : (
        <>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              I agree to the terms and conditions
            </label>
          </div>

          <button className="btn btn-primary" onClick={enrollToJob}>
            Enroll Now
          </button>
        </>
      );
    } else {
      return (
        <button className="btn btn-primary" disabled>
          Login to Enroll
        </button>
      );
    }
  };

  const displayDetails = () => {
    if (loading || jobDetails === null) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="card">
          <img
            className="card-img-top"
            src="https://cdn3.invitereferrals.com/blog/wp-content/uploads/2020/05/20102518/Affiliate-marketing-banner.jpg"
            alt=""
          />
          <div className="card-body">
            <div className="">
              <h3 className="mt-3">{jobDetails.title}</h3>
              <h5>By : {jobDetails.brand.name}</h5>
              <p className="text-muted small fw-bold">Description</p>
              <p>{jobDetails.description}</p>
              <hr className="mb-3" />
              <p className="text-muted small fw-bold m-0">Duration</p>
              <p className="fw-bold m-0">
                {new Date(jobDetails.startDate).toLocaleDateString()} -{" "}
                {new Date(jobDetails.endDate).toLocaleDateString()}
              </p>
              <hr className="mb-3" />
              <p className="text-muted small fw-bold m-0">Payment Details</p>
              <p className="fw-bold m-0">Incentive : {jobDetails.incentive}</p>
            </div>
            {processEnrollment()}
          </div>
        </div>
      );
    }
  };

  return <div className="container">{displayDetails()}</div>;
};

export default JobDetails;