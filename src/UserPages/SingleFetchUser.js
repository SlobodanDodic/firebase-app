import React from "react";

const SingleFetchUser = (user) => {
  return (
    <div className="card">
      <div className="row m-2">
        <div className="col-md-4">
          <img
            src={user.result.avatar}
            alt="avatar"
            className="rounded-circle"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h6 className="card-title">
              {user.result.first_name} {user.result.last_name}
            </h6>
            <p className="card-text email">{user.result.email}</p>
            <p className="card-text">
              <small className="text-muted">
                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  style={{ color: "#2c337c" }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline text-danger"
                >
                  Delete
                </button>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFetchUser;
