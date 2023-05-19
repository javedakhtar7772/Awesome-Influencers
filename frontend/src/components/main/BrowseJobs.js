import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BrowseJobs = () => {
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    "Promotion",
    "Photography",
    "Videography",
    "Designing",
    "Content Writing",
    "Others",
  ];
  const [selCategory, setSelCategory] = useState(null);

  const navigate = useNavigate();

  const fetchAllSpaceData = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/job/getall");
    console.log(res.status);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setJobList(data.result);
      setLoading(false);
    }
  };

  const filterBar = () => {
    return (
      <div className="card">
        <div className="card-header">
          <h4 className="m-0">Filter Spaces</h4>
        </div>
        <div className="card-body"></div>
        <div className="card-footer"></div>
      </div>
    );
  };

  const displayCategoryData = () => {
    return categories.map((cat, index) => (
      <div className="mx-2" key={index}>
        <button
          className={`btn ${
            selCategory === index ? "btn-secondary" : "btn-primary"
          } btn-rounded`}
        >
          {cat}
        </button>
      </div>
    ));
  };

  useEffect(() => {
    fetchAllSpaceData();
  }, []);

  const checkApplicationOpen = (job) => {
    return job.endDate > Date.now();
  };

  const displaySpaceData = () => {
    if (!loading) {
      return jobList.toReversed().map((job, index) => (
        <div className="card shadow-0 border rounded-3 mb-3" key={job._id}>
            <div className="card-body">
            <div className="row justify-content-center mb-3" >
              <div className="col-md-8">
                <div className="">
                  {checkApplicationOpen(job) ? (
                    <span className="badge bg-success">Registration Open</span>
                  ) : (
                    <span className="badge bg-danger">Registration Closed</span>
                  )}
                  <div className="col-md-6 col-lg-6 col-xl-6">
                    <h3 className="mt-3">{job.title}</h3>
                    <h5>By : {job.brand.name}</h5>
                    <p className="text-muted small fw-bold">Description</p>
                    <p>{job.description}</p>
                    <hr className="mb-3" />
                    <p className="text-muted small fw-bold m-0">Duration</p>
                    <p className="fw-bold m-0">
                      {new Date(job.startDate).toLocaleDateString()} -{" "}
                      {new Date(job.endDate).toLocaleDateString()}
                    </p>
                    <hr className="mb-3" />
                    <p className="text-muted small fw-bold m-0">
                      Payment Details
                    </p>
                    <p className="fw-bold m-0">Incentive : {job.incentive}</p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                    <div className="d-flex flex-row align-items-center mb-1">
                      <h4 className="mb-1 me-1">₹{job.incentive}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <Link
                  to={`/user/enroll/${job._id}`}
                  className="btn btn-primary btn-sm w-100"
                  type="button"
                >
                  Enroll Now
                </Link>
                <Link
                  to={`/main/jobdetails/${job._id}`}
                  className="btn btn-outline-primary btn-sm mt-2 w-100"
                  type="button"
                >
                  More Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ));
    } else {
      return <div>Loading...</div>;
    }
  };

  return (
    <div>
      <header className="page-header">
        <div className="container"></div>
      </header>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">{filterBar()}</div>
          <div className="col-md-9">
            {/* <div className="d-flex">{displayCategoryData()}</div> */}
            {/* <hr /> */}
            {displaySpaceData()}
            <nav aria-label="..." className="my-3">
              <ul className="pagination pagination-circle">
                <li className="page-item">
                  <a className="page-link">Previous</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item active" aria-current="page">
                  <a className="page-link" href="#">
                    2 <span className="visually-hidden">(current)</span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;