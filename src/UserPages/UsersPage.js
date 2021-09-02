import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import avatarImg from "../Assets/avatar.png";

const UsersPage = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    db.database()
      .ref()
      .child("usersDB")
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          setData({
            ...snapshot.val(),
          });
        } else {
          snapshot({}); // something`s not right
        }
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("You will delete this user. Are you sure?")) {
      db.database()
        .ref()
        .child(`usersDB/${id}`)
        .remove((err) => {
          if (err) {
            console.log(err);
          }
        });
    }
  };

  return (
    <div className="users">
      <Link to="/add-edit" type="button" className="btn btn-primary mb-4">
        Add New User
      </Link>

      {Object.keys(data).map((id) => {
        return (
          <div key={id} className="card">
            <div className="row mt-2">
              <div className="col-md-4">
                <img
                  src={data[id].avatar ? data[id].avatar : avatarImg}
                  alt="avatar"
                  className="rounded-circle"
                />
              </div>

              <div className="col-md-8">
                <div className="card-body">
                  <h6 className="card-title">
                    {data[id].firstName} {data[id].lastName}
                  </h6>
                  <p className="card-text email">{data[id].email}</p>
                  <p className="card-text phone">{data[id].phone}</p>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <small className="text-muted">
                  <Link
                    to={`/update/${id}`}
                    type="button"
                    className="btn btn-sm btn-outline mt-2"
                    style={{ color: "#2c337c" }}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(id)}
                    type="button"
                    className="btn btn-sm btn-outline text-danger mt-2"
                  >
                    Delete
                  </button>
                </small>
              </div>

              <div className="col-md-8 mt-2">
                <Link
                  to={`/profile/${id}`}
                  type="button"
                  className="btn btn-sm btn-outline-dark"
                >
                  Full Profile View
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UsersPage;
