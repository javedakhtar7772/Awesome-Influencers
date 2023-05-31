import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import app_config from "../../config";

const AddJob = ({ refreshData }) => {

  const [requirements, setRequirements] = useState({
    facebook: 0,
    instagram: 0,
    youtube: 0
  })

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("brand"))
  );

  const { apiUrl } = app_config;
  const jobForm = useFormik({
    initialValues: {
      brand: currentUser._id,
      title: "",
      description: "",
      type: "",
      data: {},
      incentive: 0,
      startDate: new Date(),
      endDate: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    },
    onSubmit: async (values) => {
      values.requirements = requirements;
      console.log(values);
      const res = await fetch(`${apiUrl}/job/add`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);
      if (res.status === 201) {
        const data = (await res.json()).result;
        console.log("Job Added");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Job Added!!",
        });
        refreshData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Job Not Added!!",
        });
      }
    },
  });

  const updateReq = (key, value) => {
    setRequirements({requirements, ...{key : value}});
  }

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={jobForm.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control mb-3"
                id="title"
                onChange={jobForm.handleChange}
                value={jobForm.values.title}
              />
              <label htmlFor="title">Description</label>
              <textarea
              rows={4}
                type="text"
                className="form-control mb-3"
                id="description"
                onChange={jobForm.handleChange}
                value={jobForm.values.description}
              ></textarea>
              <label htmlFor="type">Type</label>
              <input
                type="text"
                className="form-control mb-3"
                id="type"
                onChange={jobForm.handleChange}
                value={jobForm.values.type}
              />
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                className="form-control mb-3"
                id="startDate"
                onChange={jobForm.handleChange}
                value={jobForm.values.startDate}
              />

              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                className="form-control mb-3"
                id="endDate"
                onChange={jobForm.handleChange}
                value={jobForm.values.endDate}
              />
              <label htmlFor="incentive">Incentive</label>
              <input
                type="number"
                className="form-control mb-3"
                id="incentive"
                onChange={jobForm.handleChange}
                value={jobForm.values.incentive}
              />

              <h4>Requiements</h4>
              <hr />
              <div className="row">
                <div className="col-md-4">
                <label htmlFor="incentive">Facebook Followers</label>
              <input
                type="number"
                className="form-control mb-3"
                onChange={e => updateReq('facebook', e.target.value)}
                value={requirements.facebook}
              />
                </div>
                <div className="col-md-4">
                <label htmlFor="incentive">instagram Followers</label>
              <input
                type="number"
                className="form-control mb-3"
                onChange={e => updateReq('instagram', e.target.value)}
                value={requirements.instagram}
              />
                </div>
                <div className="col-md-4">
                <label htmlFor="incentive">youtube Followers</label>
              <input
                type="number"
                className="form-control mb-3"
                onChange={e => updateReq('youtube', e.target.value)}
                value={requirements.youtube}
              />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;