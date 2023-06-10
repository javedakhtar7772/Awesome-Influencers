
import { useFormik } from "formik";
import React from "react";
import app_config from "../../config";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const url = app_config.apiUrl;
  const { themeColor, themeColorLight } = app_config;
  const navigate = useNavigate();

  const signupform = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const res = await fetch(`${url}/user/auth`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User Loggedin Successfully!!",
        });
        const data = (await res.json()).result;
        sessionStorage.setItem("user", JSON.stringify(data));
        navigate("/main/browsejobs");
      }else if(res.status === 401){
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Email or Password is incorrect!!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Some Error Occured!!",
        });
      }
    },
  });

  return (
    // <div style={{ backgroundColor: themeColorLight }}>
    <div style={{ backgroundImage: 
      "url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
             height:'100vh',
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat', }}>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                       Login
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={signupform.handleSubmit}
                      >
                      
                       
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className=" flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              onChange={signupform.handleChange}
                              value={signupform.values.email}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className=" flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              onChange={signupform.handleChange}
                              value={signupform.values.password}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            defaultValue=""
                            id="form2Example3c"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            log in
                          </button>
                        </div>
                        <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link to="/main/Signup" className="fw-bold text-body">
                        <u>Sign up here</u>
                      </Link>
                    </p>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="
                        https://images.pexels.com/photos/8296973/pexels-photo-8296973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;