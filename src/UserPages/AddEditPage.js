import React, { useEffect, useState } from "react";
import TopbarPage from "../Components/TopbarPage";
import app from "../firebase";
import { useHistory, useParams, Link } from "react-router-dom";
import { isEmpty } from "lodash";

const AddEditPage = () => {
  const values = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
    address: "",
    city: "",
    phone: "",
    skills: "",
    avatar: "",
  };

  const [initialState, setState] = useState(values);
  const {
    first_name,
    last_name,
    email,
    password,
    age,
    address,
    city,
    phone,
    skills,
    avatar,
  } = initialState;

  const [data, setData] = useState({});

  const history = useHistory();

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

  useEffect(() => {
    if (isEmpty(id)) {
      setState({ ...values });
    } else {
      setState({ ...data[id] });
    }
  }, [id, data]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...initialState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(id)) {
      app.child("usersDB").push(initialState, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      app.child(`/usersDB/${id}`).set(initialState, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    history.push("/");
  };

  return (
    <>
      <TopbarPage />
      <div className="add-edit col-sm-6 mx-auto">
        <form className="form-group" onSubmit={handleSubmit}>
          <div>
            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                defaultValue={first_name}
                name="first_name"
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="last_name"
                defaultValue={last_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="email"
                defaultValue={email}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Password"
                name="password"
                defaultValue={password}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Age"
                name="age"
                defaultValue={age}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                name="address"
                defaultValue={address}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                defaultValue={city}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                name="phone"
                defaultValue={phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Skills"
                name="skills"
                defaultValue={skills}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group-sm">
              <div className="custom-file">
                <label className="form-control" htmlFor="inputGroupFile02">
                  Choose image for your avatar
                </label>
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile02"
                  name="avatar"
                  defaultValue={avatar}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <Link
            to={"/"}
            type="button"
            className="btn btn-sm btn-secondary w-100"
          >
            Cancel
          </Link>

          <button type="submit" className="btn btn-sm btn-primary mt-3 w-100">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEditPage;
