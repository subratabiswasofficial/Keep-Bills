import React from 'react';
import UserImg1 from '../images/profile/Nancy Momo.png';
// import UserImg2 from '../images/profile/avatar.png';
import EditImg from '../images/profile/pencil.png';

const StudentProfile = () => {
    return (
        <>
            <section>
                <div className="banner">
                    <div className="content">
                        <div className="profile-frame">
                            <div className="profile-form">
                                <div className="avatar-holder">
                                    <div className="avatar">
                                        <img className="avatar-img" src={UserImg1} alt="Profile Icon" />
                                        <div className="avatar-edit">
                                            <input type="file" className="avatar-input" />
                                            <img className="avatar-edit-icon" src={EditImg} alt="Edit Icon" />
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-input-field">
                                    <p>Name*</p>
                                    <input type="text" placeholder="Real Shroud" />
                                </div>
                                <div className="profile-input-field">
                                    <p>Roll no*</p>
                                    <input type="text" placeholder="Real Shroud" />
                                </div>
                                <div className="profile-input-two-col">
                                    <div className="profile-input-field">
                                        <p>Department*</p>
                                        <input type="text" placeholder="Real Shroud" />
                                    </div>
                                    <div className="profile-input-field">
                                        <p>Semester*</p>
                                        <input type="text" placeholder="Real Shroud" />
                                    </div>
                                </div>
                                <div className="profile-save">
                                    <button>SAVE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StudentProfile;
