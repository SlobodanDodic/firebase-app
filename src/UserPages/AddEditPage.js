import React, { useEffect, useState } from "react";
import TopbarPage from "../Components/TopbarPage";
import { db } from "../firebase";
import { useHistory, useParams, Link } from "react-router-dom";

const AddEditPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [avatar, setAvatar] = useState(null);

  const history = useHistory();

  let currentId = useParams();
  const { id } = currentId;

  useEffect(() => {
    if (id) {
      db.database()
        .ref()
        .child("usersDB")
        .child(id)
        .on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            const user = snapshot.val();
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPassword(user.password);
            setAge(user.age);
            setAddress(user.address);
            setCity(user.city);
            setPhone(user.phone);
            setSkills(user.skills);
            setAvatar(user.avatar);
          }
        });
    }
  }, [id]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    db.storage()
      .ref(`images/${file.name}`)
      .put(file)
      .then(() => {
        db.storage()
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setAvatar(url);
          });
      });
  };

  const body = {
    firstName,
    lastName,
    email,
    password,
    age,
    address,
    city,
    phone,
    skills,
    avatar,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      // Create user
      db.database()
        .ref()
        .child("usersDB")
        .push(body, (err) => {
          if (err) {
            console.log(err);
          }
        });
    } else {
      // Update user
      db.database()
        .ref()
        .child(`/usersDB/${id}`)
        .set(body, (err) => {
          if (err) {
            console.log(err);
          }
        });
    }

    history.push("/");
  };

  useEffect(() => {
    if (id) {
      db.database()
        .ref()
        .child("usersDB")
        .child(id)
        .on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            const user = snapshot.val();
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPassword(user.password);
            setAge(user.age);
            setAddress(user.address);
            setCity(user.city);
            setPhone(user.phone);
            setSkills(user.skills);
            setAvatar(user.avatar);
          }
        });
    }
  }, [id]);

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
                defaultValue={firstName}
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                defaultValue={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Password"
                name="password"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Age"
                name="age"
                defaultValue={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                name="address"
                defaultValue={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                defaultValue={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                name="phone"
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Skills"
                name="skills"
                defaultValue={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div className="input-group-sm">
              <div className="custom-file">
                <label className="form-control" htmlFor="inputGroupFile02">
                  Click to choose image for your avatar
                </label>
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile02"
                  name="avatar"
                  defaultValue={avatar}
                  onChange={handleUpload}
                />
                <img
                  src={avatar || "https://via.placeholder.com/100x100"}
                  alt="Uploaded Images"
                  height="100"
                  width="100"
                  className="uploadImg"
                />
              </div>
            </div>
          </div>

          <Link
            to={"/"}
            type="button"
            className="btn btn-sm btn-secondary w-100 mt-2"
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
