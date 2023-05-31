import React, { useState } from 'react';
import app_config from '../../config';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';

const BrandProfile = () => {
  const [currentBrand, setCurrentBrand] = useState(JSON.parse(sessionStorage.getItem('brand')));

  const url = app_config.apiUrl;
  const { themeColorLight } = app_config;
  const [passwordHidden, setPasswordHidden] = useState(true);

  const [fb, setFb] = useState(currentBrand.facebookFollowers);
  const [insta, setInsta] = useState(currentBrand.InstagramFollowers);
  const [youtube, setYoutube] = useState(currentBrand.youtubeSubscribes);

  const updateProfile = async (data) => {
    console.log(data);
    const res = await fetch(url + '/brand/update/' + currentBrand._id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res.status);
    const branddata = (await res.json()).result;
    console.log(branddata);
    setCurrentBrand(branddata);
    sessionStorage.setItem('brand', JSON.stringify(branddata));
  };

  const uploadProfileImage = (e) => {
    const file = e.target.files[0];
    // setSelImage(file.name);
    const fd = new FormData();
    fd.append('myfile', file);
    fetch(url + '/util/uploadfile', {
      method: 'POST',
      body: fd
    }).then((res) => {
      if (res.status === 200) {
        console.log('file uploaded');
        updateProfile({ avatar: file.name });
      }
    });
  };

  const deleteAccount = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
    return;
    const res = await fetch(url + '/brand/delete/' + currentBrand._id, {
      method: 'DELETE'
    });
    if (res.status === 200) {
      sessionStorage.removeItem('brand');
      window.location.href = '/';
    }
  };

  const profileForm = useFormik({
    initialValues: currentBrand,
    onSubmit: updateProfile
  });

  return (
    <div style={{ backgroundColor: themeColorLight, minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <img height={200} className="border-rounded d-block m-auto" src={currentBrand.avatar ? `${url}/${currentBrand.avatar}` : '/avatar.png'} alt="" />
                <label className="btn btn-outline-secondary w-100 mt-3" htmlFor="upload-image">
                  {' '}
                  <i class="fas fa-pen"></i>&nbsp;Edit{' '}
                </label>
                <input type="file" hidden onChange={uploadProfileImage} id="upload-image" />
                <p className="text-center">Welcome Back</p>
                <p className="text-center">
                  <span className="h4">{currentBrand.name}</span>
                </p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Email
                    <span className="fw-bold">{currentBrand.email}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Password
                    {passwordHidden ? <span className="fw-bold">********</span> : <span className="fw-bold">{currentBrand.password}</span>}
                    <button className="btn btn-outline-secondary" onClick={() => setPasswordHidden(!passwordHidden)}>
                      {passwordHidden ? 'Show' : 'Hide'}
                    </button>
                  </li>
                </ul>
                <button type="button" className="btn btn-danger btn-block" onClick={deleteAccount}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-8 mb-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">
                  {' '}
                  <i class="fas fa-pen-alt    "></i> Edit Profile
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={profileForm.handleSubmit}>
                  {/* 2 column grid layout with text inputs for the first and last names */}
                  <div className=" mb-4">
                    <div className="col">
                      <div className="">
                        <label className="form-label" htmlFor="form7Example1">
                          Full Name
                        </label>
                        <input type="text" id="name" value={profileForm.values.name} onChange={profileForm.handleChange} className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="">
                      <label className="form-label" htmlFor="form7Example2">
                        Email
                      </label>
                      <input type="email" id="email" value={profileForm.values.email} onChange={profileForm.handleChange} className="form-control" />
                    </div>
                  </div>
                  {/* Text input */}
                  <div className=" mb-4">
                    <label className="form-label" htmlFor="form7Example3">
                      Password
                    </label>
                    <input type="password" id="password" value={profileForm.values.password} onChange={profileForm.handleChange} className="form-control" />
                  </div>

                  <button className="btn btn-primary">
                    {' '}
                    <i class="fa-solid fa-arrows-rotate"></i> Update Profile
                  </button>
                </form>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mt-4">
                <div className="card">
                  <div className="card-header">
                    
                    <img style={{height: 30}} src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png" alt="" />
                    <span>Facebook Followers</span>
                  </div>
                  <div className="card-body">
                    <div className="input-group">
                    <input type="text" value={fb} className='form-control' onChange={e => setFb(e.target.value)} />
                        <button className='btn btn-primary' onClick={e => updateProfile({facebookFollowers: fb})}>
                          <i class="fas fa-pen"></i>
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mt-4">
                <div className="card">
                  <div className="card-header">
                    
                    <img style={{height: 30}} src="https://w7.pngwing.com/pngs/477/609/png-transparent-logo-computer-icons-instagram-logo-instagram-logo-miscellaneous-text-trademark.png" alt="" />
                    <span>Instagram Followers</span>
                  </div>
                  <div className="card-body">
                    <div className="input-group">
                    <input type="text" value={insta} className='form-control' onChange={e => setInsta(e.target.value)} />
                        <button className='btn btn-primary' onClick={e => updateProfile({instagramFollowers: insta})}>
                          <i class="fas fa-pen"></i>
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mt-4">
                <div className="card">
                  <div className="card-header">
                    
                    <img style={{height: 30}} src="https://w7.pngwing.com/pngs/1009/93/png-transparent-youtube-computer-icons-logo-youtube-angle-social-media-share-icon.png" alt="" />
                    <span>Youtube subscribers</span>
                  </div>
                  <div className="card-body">
                    <div className="input-group">
                    <input type="text" value={youtube} className='form-control' onChange={e => setYoutube(e.target.value)} />
                        <button className='btn btn-primary' onClick={e => updateProfile({youtubeSubscribes: youtube})}>
                          <i class="fas fa-pen"></i>
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandProfile;
