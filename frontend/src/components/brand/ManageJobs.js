import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import app_config from '../../config';
import AddJob from './AddJob';
import ManageEnrolledUsers from './ManageEnrolledUsers';

const ManageJobs = () => {
  //   const { tour_id } = useParams();
  const url = app_config.apiUrl;

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('brand')));

  const [selUser, setSelUser] = useState(null);

  const { apiUrl, themeColorLight } = app_config;

  const [jobList, setJobList] = useState([]);
  // const [activeJobs, setActiveJobs] = useState([]);
  // const [expiredJobs, setExpiredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [isTeam, setIsTeam] = useState(false);

  const [selJob, setSelJob] = useState(null);
  const [selJobDetails, setSelJobDetails] = useState(null);

  useEffect(() => {
    if (selJob !== null) {
      const job = jobList.find((job) => job._id === selJob);
      setSelJobDetails(job);
    }
  }, [selJob, jobList]);

  const getUserJobs = async () => {
    setLoading(true);
    const res = await fetch(`${url}/job/getbybrand/${currentUser._id}`);
    console.log(res.status);
    setLoading(false);

    if (res.status === 200) {
      const data = (await res.json()).result;
      setJobList(data);
      // setActiveJobs(data.filter((job) => new Date(job.endDate) > new Date()));
      // setExpiredJobs(data.filter((job) => new Date(job.endDate) < new Date()));
      console.log(data);
    }
  };

  useEffect(() => {
    getUserJobs();
  }, []);

  const displayStatus = (job) => {
    if (new Date(job.endDate) < new Date()) {
      return <span className="badge bg-danger rounded-pill">Expired</span>;
    } else {
      return <span className="badge bg-success rounded-pill">Active</span>;
    }
  };

  const displayApplicants = (job) => {
    if (job.enrolled.length) {
      return job.enrolled.map((user, index) => (
        <>
          <ul className='list-group'>
            <li className='list-group-item d-flex align-items-center justify-content-between'>
              <p className='h5'>{user.name}</p>
              <div><button data-mdb-toggle="modal" data-mdb-target="#exampleModal" className="btn btn-primary" onClick={(e) => setSelUser(user)}>
                View Profile
              </button></div>
            </li>
          </ul>
          
        </>
      ));
    } else {
      return (
        <div className="card">
          <div className="card-body">
            <ManageEnrolledUsers jobId={selJob} />
            <h2>No Applicants</h2>
          </div>
        </div>
      );
    }
  };

  const displaySelJob = () => {
    if (selJob !== null && selJobDetails !== null) {
      return (
        <div className="card">
          <div className="card-header">
            <h3>{selJobDetails.title}</h3>
          </div>
          <div className="card-body">
            <p className="h5">Status : {displayStatus(selJobDetails)}</p>
            <p className="text-muted mt-3 mb-0">Type</p>
            <p className="m-0 h5">{selJobDetails.type}</p>
            <p className="text-muted mt-3 mb-0">Description</p>
            <p className="m-0 h5">{selJobDetails.description}</p>
            <p className="text-muted mt-3 mb-0">Start Date</p>
            <p className="m-0 h5">{new Date(selJobDetails.startDate).toLocaleDateString()}</p>
            <p className="text-muted mt-3 mb-0">Last Date</p>
            <p className="m-0 h5">{new Date(selJobDetails.endDate).toLocaleDateString()}</p>
            <p className="text-muted mt-3 mb-0">Incentive</p>
            <p className="m-0 h1">₹{selJobDetails.incentive}</p>
            <p className="text-muted mt-3 mb-0">Applicants</p>
            <p className="m-0 h5">{displayApplicants(selJobDetails)}</p>
          </div>
        </div>
      );
    } else {
      return <p className="display-3 text-center text-muted">Select a Job to View Details</p>;
    }
  };

  const displayJobs = () => {
    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    } else {
      return jobList.map((job, index) => (
        <div className="card">
          <div className="card-header">
            <p className="m-0 h3">{job.title}</p>
          </div>
          <div className="card-body"></div>
        </div>
      ));
    }
  };

  const displayJobCardsActive = () => {
    return (
      <div className="row mt-4">
        {jobList
          .filter((job) => new Date(job.endDate) <= new Date())
          .map((job) => (
            <div className="col-md-3 mb-4">
              <div className="card">
                <img className='card-img-top' src={apiUrl + '/' + job.image} alt="" />
                <div className="card-body">
                  <h5>{job.title.slice(0, 20)}...</h5>
                  <p className='fw-bold m-0'>Added On</p>
                  <h5>{new Date(job.created_at).toLocaleDateString()}</h5>
                  <button className='btn btn-danger float-end' onClick={(e) => setSelJob(job._id)}> View Details</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  };

  const displayJobCardsExpired = () => {
    return (
      <div className="row mt-4">
        {jobList
          .filter((job) => new Date(job.endDate) > new Date())
          .map((job) => (
            <div className="col-md-3 mb-4">
              <div className="card">
                <img className='card-img-top' src={apiUrl + '/' + job.image} alt="" />
                <div className="card-body">
                  <h5>{job.title.slice(0, 20)}...</h5>
                  <p className='fw-bold m-0'>Added On</p>
                  <h5>{new Date(job.created_at).toLocaleDateString()}</h5>
                  <button className='btn btn-danger float-end' onClick={(e) => setSelJob(job._id)}> View Details</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: themeColorLight, minHeight: '100vh' }}>
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              {/* influencer card */}
              {selUser && (
                <div className="card" style={{ borderRadius: 15 }}>
                  <div className="card-body text-center">
                    <div className="mt-3 mb-4">
                      <img
                        src={selUser.avatar ? apiUrl + '/' + selUser.avatar : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'}
                        className="rounded-circle img-fluid"
                        style={{ width: 100 }}
                      />
                    </div>
                    <h4 className="mb-2">{selUser.name}</h4>
                    <p className="text-muted mb-4">
                      @Programmer <span className="mx-2">|</span> <a href="#!">mdbootstrap.com</a>
                    </p>
                    <div className="mb-4 pb-2">
                      <a type="button" className="btn btn-outline-primary btn-floating" href={selUser.facebookLink} target="_blank">
                        <i className="fab fa-facebook-f fa-lg" />
                      </a>
                      <button type="button" className="btn btn-outline-primary btn-floating">
                        <i className="fab fa-twitter fa-lg" />
                      </button>
                      <button type="button" className="btn btn-outline-primary btn-floating">
                        <i className="fab fa-skype fa-lg" />
                      </button>
                    </div>
                    <div>
                      <p className="mb-2 h5">{selUser.instagramFollowers}</p>
                      <p className="text-muted mb-0">Instagram Followers</p>
                    </div>
                    <div>
                      <p className="mb-2 h5">{selUser.facebookFollowers}</p>
                      <p className="text-muted mb-0">Facebook Followers</p>
                    </div>
                    <div>
                      <p className="mb-2 h5">{selUser.youtubeSubscribres}</p>
                      <p className="text-muted mb-0">Youtube Subscriber</p>
                    </div>
                    
                    
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="jobModal" tabIndex={-1} aria-labelledby="exampleModalLabel1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel1">
                Add New Job
              </h5>
              <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <AddJob refreshData={getUserJobs} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <h1 className="display-4">Manage Jobs</h1>
        <hr />
        <div className="row">
          {/* <div className="col-md-2">
            
            <div className="card mt-2">
              <div className="card-header">
                <h3>Active Campaigns</h3>
              </div>
              <div className="card-body">
                {jobList.length ? (
                  jobList
                    .filter((job) => new Date(job.endDate) > new Date())
                    .map((job, index) => (
                      <button onClick={(e) => setSelJob(job._id)} className={`btn btn-danger mt-3 w-100`} disabled={selJob === job._id}>
                        {job.title}
                      </button>
                    ))
                ) : (
                  <p className="text-center text-muted h5">No Active Jobs</p>
                )}
              </div>
            </div>
            <div className="card mt-5">
              <div className="card-header">
                <h3>Expired Campaigns</h3>
              </div>
              <div className="card-body">
                {jobList.length ? (
                  jobList
                    .filter((job) => new Date(job.endDate) < new Date())
                    .map((job, index) => (
                      <button onClick={(e) => setSelJob(job._id)} className="btn btn-danger mt-3 w-100" disabled={selJob === job._id}>
                        {job.title}
                      </button>
                    ))
                ) : (
                  <p className="text-center text-muted h5">No Expired Jobs</p>
                )}
              </div>
            </div>
          </div> */}
          <div className="col-md-10">
            <button type="button" className="btn btn-success btn-lg my-3 w-100" data-mdb-toggle="modal" data-mdb-target="#jobModal">
              <i class="fa fa-plus-circle" aria-hidden="true"></i> Add New Job
            </button>
            <h3 className='mt-3'>Active Task Campaigns</h3>
            <div className="p-5">{displayJobCardsActive()}</div>

            <h3 className='mt-3'>Expired Task Campaigns</h3>
            <div className="p-5">{displayJobCardsExpired()}</div>
            <div className="p-5">{displaySelJob()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
