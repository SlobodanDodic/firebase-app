import React, { useState, useEffect } from "react";
import TopbarPage from "../Components/TopbarPage";
import app from "../firebase";
import { Link, useParams } from "react-router-dom";
import avatarV from "../Assets/avatarV.png";

const ProfilePage = () => {
  const [data, setData] = useState({});

  let currentId = useParams();
  const { id } = currentId;

  useEffect(() => {
    app.child("usersDB").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    });
  }, [id]);

  return (
    <>
      <TopbarPage />

      <div className="profile col-sm-6 mx-auto">
        <h2 className="mb-4">Profile Page</h2>
        {Object.keys(data).map((userId) => {
          if (userId === id) {
            return (
              <div
                key={id}
                className="card mb-3"
                style={{
                  maxWidth: "500px",
                  boxShadow: "0px 0px 40px 10px lightgrey",
                }}
              >
                <img className="card-img-top" src={avatarV} alt="Card cap" />
                <div
                  className="card-body"
                  style={{
                    backgroundColor: "whitesmoke",
                    boxShadow:
                      "rgb(159 159 159) -10px 0px 13px -7px, rgb(159 159 159) 10px 0px 13px -7px, rgb(0 0 0 / 0%) 5px 5px 15px 5px",
                  }}
                >
                  <h5 className="card-title">
                    <strong>
                      {data[id].first_name} {data[id].last_name}
                    </strong>
                  </h5>
                  <p
                    className="card-text"
                    style={{ fontFamily: "monospace", color: "blue" }}
                  >
                    {data[id].email}
                  </p>
                </div>

                <hr style={{ margin: "0" }} />

                <div className="card-body">
                  <small className="text-muted">Address: </small>
                  {data[id].address}
                </div>

                <hr style={{ margin: "0" }} />

                <div className="card-body">
                  <small className="text-muted">City: </small>
                  {data[id].city}
                </div>

                <hr style={{ margin: "0" }} />

                <div className="card-body">
                  <small className="text-muted">Phone number: </small>
                  {data[id].phone}
                </div>

                <hr style={{ margin: "0" }} />

                <div className="card-body">
                  <small className="text-muted">Age: </small>
                  {data[id].age}
                </div>

                <hr style={{ margin: "0" }} />

                <div className="card-body">
                  <small className="text-muted">Password: </small>
                  {data[id].password}
                </div>

                <hr style={{ margin: "0" }} />

                <div className="card-body">
                  <small className="text-muted">Skills: </small>
                  {data[id].skills}
                </div>

                <hr style={{ margin: "0" }} />

                <div
                  className="card-body"
                  style={{
                    backgroundColor: "whitesmoke",
                    boxShadow:
                      "rgb(159 159 159) -10px 0px 13px -7px, rgb(159 159 159) 10px 0px 13px -7px, rgb(0 0 0 / 0%) 5px 5px 15px 5px",
                  }}
                >
                  <Link
                    to={"/"}
                    type="button"
                    className="btn btn-sm btn-primary w-100"
                  >
                    Back to Users Page
                  </Link>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};

export default ProfilePage;
