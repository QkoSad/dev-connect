import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    async function fetchData() {
      await dispatch(getProfiles());
    }
    fetchData();
  }, [dispatch]);
  
  const { profiles, loading } = useSelector((state) => state.profile);
  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Profiles;
