<<<<<<< HEAD
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
=======
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
<<<<<<< HEAD
  profile: { profile }
=======
  profile: { profile },
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
<<<<<<< HEAD
  profile: PropTypes.object.isRequired
=======
  profile: PropTypes.object.isRequired,
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
};

const mapStateToProps = (state) => ({
  auth: state.auth,
<<<<<<< HEAD
  profile: state.profile
=======
  profile: state.profile,
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
