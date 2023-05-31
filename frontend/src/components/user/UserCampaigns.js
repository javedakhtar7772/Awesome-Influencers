import React, { useEffect } from 'react';
import { useState } from 'react';
import app_config from '../../config';

const UserCampaigns = () => {
  const [jobList, setJobList] = useState([]);
  const { apiUrl } = app_config;
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const [selJob, setSelJob] = useState(null);

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

              <button className="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#jobModal" onClick={() => setSelJob(job)}>
                Upload Proof
              </button>
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

  const addProof = async (e) => {
    const file = e.target.files[0];
    // setSelImage(file.name);
    const fd = new FormData();
    fd.append('myfile', file);
    fetch(apiUrl + '/util/uploadfile', {
      method: 'POST',
      body: fd
    }).then(async (res) => {
      if (res.status === 200) {
        console.log('file uploaded');
        const res2 = await fetch(apiUrl + '/enroll/addproof/' + selJob._id, {
          method: 'PUT',
          body: JSON.stringify({ proof: file.name }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(res2.status);
        if (res2.status === 200) {
          const data = await res2.json();
          // toast.success('Proof Added');
          console.log(data);
          getJobs();
        }
      }
    });
  };

  const showProof = () => {
    if (selJob.proof.length)
      return (
        <>
          <div className="row">
            {selJob.proof.map((proof, index) => (
              <div className="col-4">
                <img className='img-fluid' src={apiUrl + '/' + proof} alt="" />
              </div>
            ))}
          </div>
          <input onChange={addProof} type='file' />
        </>
      );
    else
      return (
        <div className="text-center">
          <p className="m-0 h3">No Proof Found</p>
          <input onChange={addProof} type='file' />
        </div>
      );
  };

  return (
    <div>
      <div className="modal fade" id="jobModal" tabIndex={-1} aria-labelledby="exampleModalLabel1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel1">
                Add New Job
              </h5>
              <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">{selJob !== null && showProof()}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
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
