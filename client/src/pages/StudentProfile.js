import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// import UserImg1 from '../images/profile/Nancy Momo.png';
import UserImg2 from '../images/profile/avatar.png';
import EditImg from '../images/profile/pencil.png';

import { validNumber } from '../utils';
import { alert } from '../actions/alert';
import { showLoading, hideLoading } from '../actions/loading';

const StudentProfile = ({ alert, showLoading, hideLoading }) => {
    const [profileForm, setProfileForm] = useState({
        name: '',
        roll: '',
        department: '',
        semester: ''
    });

    const [avatar, setAvatar] = useState(null);
    /* ref https://stackoverflow.com/questions/38049966/get-image-preview-before-uploading-in-react */
    const [preview, setPreview] = useState();

    /* exixting form find */
    const retriveExistingProfile = async () => {
        try {
            showLoading('Loading...', 'please wait');
            const response = await axios.get('/api/student/profile');
            if (response.data !== null) {
                const { name, roll, department, semester, avatar } = response.data;
                setProfileForm({ name, roll, department, semester });
                setPreview(avatar);
            }
        } catch (error) {
            console.log('No Profile found');
        } finally {
            hideLoading(); // not important
        }
    };

    useEffect(() => {
        retriveExistingProfile();
    }, []);

    const fileOnChangeHandler = (e) => {
        setAvatar(e.target.files[0]);
    };

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!avatar) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(avatar);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [avatar]);

    const textOnChangeHandler = (e) => {
        /* only number input */
        if (e.target.name === 'roll') {
            if (!validNumber(e.target.value)) {
                return;
            }
            if (e.target.value.length > 12) return;
        }
        if (e.target.name === 'semester') {
            if (!validNumber(e.target.value)) {
                return;
            }
            if (e.target.value.length > 1) return;
        }
        /* text transform */
        if (e.target.name === 'department') {
            e.target.value = e.target.value.toUpperCase();
        }

        setProfileForm({
            ...profileForm,
            [e.target.name]: e.target.value
        });
    };

    const formSubmitRequest = async (formData) => {
        try {
            showLoading('Loading...', 'Please Wait');
            const body = formData;
            const response = await axios.post('/api/student/profile', body, {
                headers: {
                    'Content-Type': 'multipart/formdata'
                }
            });
            const { updated, created } = response.data;
            if (created) alert('success', 'Viola !', 'Your Profile Created');
            if (updated) alert('success', 'Viola !', 'Your Profile Updated');
        } catch (error) {
            console.log(error);
            alert('error', 'Oops !', 'Something went wrong');
        } finally {
            hideLoading();
        }
    };
    const formSubmitHandler = () => {
        /* varify */
        /* */
        const formData = new FormData();
        formData.append('name', profileForm.name);
        formData.append('roll', profileForm.roll);
        formData.append('department', profileForm.department);
        formData.append('semester', profileForm.semester);
        formData.append('avatar', avatar);
        formSubmitRequest(formData);
    };

    return (
        <section>
            <div className="banner">
                <div className="content">
                    <div className="profile-frame">
                        <div className="profile-form">
                            <div className="avatar-holder">
                                <div className="avatar">
                                    <img className="avatar-img" src={preview ? preview : UserImg2} alt="Profile Icon" />
                                    <div className="avatar-edit">
                                        <input onChange={fileOnChangeHandler} type="file" name="file" className="avatar-input" />
                                        <img className="avatar-edit-icon" src={EditImg} alt="Edit Icon" />
                                    </div>
                                </div>
                            </div>
                            <div className="profile-input-field">
                                <p>Name*</p>
                                <input onChange={textOnChangeHandler} value={profileForm.name} name="name" type="text" placeholder="Enter Your Name" />
                            </div>
                            <div className="profile-input-field">
                                <p>Roll no*</p>
                                <input onChange={textOnChangeHandler} value={profileForm.roll} name="roll" type="text" placeholder="Eg. 1810XXXXXXX" />
                            </div>
                            <div className="profile-input-two-col">
                                <div className="profile-input-field">
                                    <p>Department*</p>
                                    <input onChange={textOnChangeHandler} value={profileForm.department} name="department" type="text" placeholder="Eg. ECE" />
                                </div>
                                <div className="profile-input-field">
                                    <p>Semester*</p>
                                    <input onChange={textOnChangeHandler} value={profileForm.semester} name="semester" type="text" placeholder="Eg. 4" />
                                </div>
                            </div>
                            <div className="profile-save">
                                <button onClick={formSubmitHandler}>SAVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* Used states */
const mapStateToProps = (state) => ({});
/* used actions */
const mapDispatchAction = {
    alert,
    showLoading,
    hideLoading
};

export default connect(mapStateToProps, mapDispatchAction)(StudentProfile);
