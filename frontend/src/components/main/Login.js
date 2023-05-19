import { Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {

  const navigate = useNavigate()

  const loginSubmit = async (formdata, { resetForm, setSubmitting }) => {
    console.log(formdata)
    resetForm()
    setSubmitting(true)

    const res = await fetch('http://localhost:5000/user/auth', {
      method: 'POST',
      body: JSON.stringify(formdata),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res.status)

    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Login Successful'
      })
      const data = (await res.json());
      console.log(data);
      sessionStorage.setItem('user', JSON.stringify(data.result));

      navigate('/main/browsejobs');
    }
    else if (res.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Email or Password is incorrect'
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong'
      })
    }

    setTimeout(() => {
      setSubmitting(false)
    }, 2000)
  }





  return (
    <div >
      <section>
        <div className="container-fluid h-custom" >
          <div className="row d-flex justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={loginSubmit}>
                {({ values, handleSubmit, handleChange, isSubmitting }) => (<form onSubmit={handleSubmit}>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                    <button type="button" className="btn btn-primary btn-floating mx-1">
                      <i className="fab fa-facebook-f" />
                    </button>
                    <button type="button" className="btn btn-primary btn-floating mx-1">
                      <i className="fab fa-twitter" />
                    </button>
                    <button type="button" className="btn btn-primary btn-floating mx-1">
                      <i className="fab fa-linkedin-in" />
                    </button>
                  </div>
                  <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                  </div>
                  {/* Email input */}
                  <div className=" mb-4">
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="Enter a valid email address"
                      onChange={handleChange}
                      value={values.email}
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                  </div>
                  {/* Password input */}
                  <div className=" mb-3">
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                      onChange={handleChange}
                      value={values.password}
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Checkbox */}
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        defaultValue=""
                        id="form2Example3"
                      />
                      <label className="form-check-label" htmlFor="form2Example3">
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-body">
                      Forgot password?
                    </a>
                  </div>
                  <div className="text-center text-lg-start mt-4 pt-2">
                    {/* <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    >
                      Login
                    </button> */}
                    <button type="submit" className="btn btn-success w-100 my-2">
                      {isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "LOGIN"}
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account?{" "}
                      <a href="#!" className="link-danger">
                        Register
                      </a>
                    </p>
                  </div>
                </form>)}</Formik>


            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          {/* Copyright */}
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>
          {/* Copyright */}
          {/* Right */}
          <div>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-twitter" />
            </a>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-google" />
            </a>
            <a href="#!" className="text-white">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
          {/* Right */}
        </div>
      </section>

    </div>
  )
}

export default Login;