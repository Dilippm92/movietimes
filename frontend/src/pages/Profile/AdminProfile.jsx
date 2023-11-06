import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/AdminHeader';
import { Box, Button, FormLabel, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import { AdminProfiles, updateAdminProfile } from "../../api-helpers/api-helpers";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const AdminProfile = () => {
  const [state, setState] = useState({ admin: {} });
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await AdminProfiles();
       
        setState(res);
        setImageUrl(res.admin.image);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const resData = await updateAdminProfile(state.admin, imageFile);
      if (resData) {
        toast.success("Profile updated successfully");
        localStorage.removeItem("adminname");
        localStorage.setItem("adminname",resData.name)
        navigate('/admin/adminprofile');
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
      navigate('/admin/adminprofile');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      admin: {
        ...prevState.admin,
        [name]: value
      }
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImageUrl(null);
    }
  };

  return (
    <>
      <AdminHeader/>
      <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <Box
      sx={{
        width: 500,
        height: 800,
        backgroundColor: '#eeeeee',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.8)',
        border: '3px solid rgba(0, 0, 0, 0.8)',
      }}
    >
            <Typography variant='h4' textAlign='center' marginTop={3}>
              <b>PROFILE</b>
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box padding={6} display='flex' justifyContent='center' flexDirection='column' width={400} margin='auto'  >
              {imageUrl ? (
  <label htmlFor="imageInput">
    <img src={imageUrl} alt="Profile" style={{ width: '50%', height: '50%', marginTop: '10px', margin: 'auto', cursor: 'pointer', marginLeft: '90px' }} />
    <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
  </label>
) : (
  <label htmlFor="imageInput">
    <div style={{ width: '50%', height: '50%', margin: 'auto', cursor: 'pointer' }}>
      <AccountCircleIcon style={{ fontSize: '200px' }} />
    </div>
    <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
  </label>
)}

                <FormLabel sx={{ mt: 1, mb: 1 }}>Username</FormLabel>
                <TextField
                  value={state.admin.name}
                  onChange={handleChange}
                  margin='normal'
                  variant='standard'
                  type='text'
                  name='name'
                />

                <FormLabel sx={{ mt: 1, mb: 1 }}>Email</FormLabel>
                <TextField
                  value={state.admin.email}
                  onChange={handleChange}
                  margin='normal'
                  variant='standard'
                  type='email'
                  name='email'
                />

                <FormLabel sx={{ mt: 1, mb: 1 }}>Phone</FormLabel>
                <TextField
                  value={state.admin.phone}
                  onChange={handleChange}
                  margin='normal'
                  variant='standard'
                  type='number'
                  name='phone'
                />

                <Button sx={{ mt: 4, borderRadius: 10, bgcolor: '#800360' }} type='submit' fullWidth variant='contained'>
                  <b>Update</b>
                </Button>
              </Box>
            </form>
          </Box>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Box>
      </Box>
    </>
  );
}

export default AdminProfile;

