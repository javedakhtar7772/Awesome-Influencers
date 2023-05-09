import { useFormik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Name is Required'),
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().required('Password is Required'),
});

const Signup = () => {

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      cpassword: '',
    },

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      // setTimeout(() => {
      console.log(values);

      const res = await fetch('http://localhost:5000/user/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
      });

      console.log(res.status);

      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: 'Success',
          text: 'User Registered Successfully'
        })
      }

      setSubmitting(false);

      resetForm();
      // },3000);
    },
    validationSchema: SignupSchema
  })

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")'
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>
                  <form onSubmit={signupForm.handleSubmit}>
                    <div className=" mb-4">
                      <label className="form-label" htmlFor="form3Example1cg">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="form-control form-control-lg"
                        onChange={signupForm.handleChange}
                        value={signupForm.values.name}
                      />
                    </div>
                    <div className=" mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        onChange={signupForm.handleChange}
                        value={signupForm.values.email}
                      />

                    </div>
                    <div className=" mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        onChange={signupForm.handleChange}
                        value={signupForm.values.password}
                      />

                    </div>
                    <div className=" mb-4">
                      <label className="form-label" htmlFor="form3Example4cdg">
                        Repeat your password
                      </label>

                      <input
                        type="password"
                        id="cpassword"
                        className="form-control form-control-lg"
                        onChange={signupForm.handleChange}
                        value={signupForm.values.cpassword}
                      />

                    </div>
                    {/* <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        defaultValue=""

                      />
                      <label className="form-check-label" htmlFor="form2Example3g">
                        I agree all statements in{" "}
                        <a href="#!" className="text-body">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div> */}
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary btn-lg" disabled={signupForm.isSubmitting} >
                        {signupForm.isSubmitting ? <span className="spinner-border spinner-border-sm"></span> : null}
                        &nbsp;&nbsp;REGISTER
                      </button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <a href="#!" className="fw-bold text-body">
                        <u>Login here</u>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Signup;
