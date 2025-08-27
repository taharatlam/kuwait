'use client'
import React, { useState } from 'react';
import { ArrowRight } from '@/components/icons/ArrowRight';
import ArrowWhiteRight from '@/components/icons/ArrowWhiteRight';
const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('********');
  const [phone, setPhone] = useState('1234567890');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className='profile-page'>
      <h3 className='sec-head sm'>Profile</h3>
      <div className='profile-image'>
        <img src={profileImage || '/default-profile.png'} alt='Profile' width={100} height={100} />
        <input type='file' accept='image/*' onChange={handleImageChange} />
      </div>
      <div className='row row-gap-25'>
        <div className='col-lg-6 col-12'>
          <label>Name:</label>
          <div className='form-group'>
            <div className='inp-grp'>
              <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='col-lg-6 col-12'> 
          <label>Email:</label>
          <div className='form-group'>
            <div className='inp-grp'>
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='col-lg-6 col-12'> 
          <label>Phone Number:</label>
          <div className='form-group'>
            <div className='inp-grp'>
              <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
        </div>
       
      </div>
      <div className='row row-gap-25'>
        <div className='col-12'>
            <h4 className='sec-head xsm'>Change Password</h4>
        </div>
        <div className='col-lg-6 col-12'>
          <label>Password:</label>
          <div className='form-group'>
            <div className='inp-grp'>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='col-lg-6 col-12'>
          <label>Confirm Password:</label>
          <div className='form-group'>
            <div className='inp-grp'>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className='row row-gap-25'>
        <div className='col-12'>
            <button className='main-btn-2'><span>Save Changes</span> <ArrowWhiteRight /></button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;