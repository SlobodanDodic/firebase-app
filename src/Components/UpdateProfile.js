import React, { useRef, useState } from "react";
import { db } from "../firebase";
import TopbarPage from "../Components/TopbarPage";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const userPhotoRef = useRef();
  const [userAvatar, setUserAvatar] = useState(null);

  const {
    currentUser,
    updatePassword,
    updateEmail,
    updateUserName,
    updateUserPhoto,
  } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    if (userNameRef.current.value) {
      promises.push(updateUserName(userNameRef.current.value));
    }
    if (userAvatar) {
      promises.push(updateUserPhoto(userAvatar));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

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
            setUserAvatar(url);
          });
      });
  };

  return (
    <>
      <TopbarPage />

      <Card className="update-profile col-sm-6 mx-auto">
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>

            <Form.Group id="displayName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                ref={userNameRef}
                defaultValue={currentUser.displayName}
              />
            </Form.Group>

            <Form.Group id="avatar">
              <Form.Label>Choose Your Avatar</Form.Label>
              <Form.Control
                className={
                  !userAvatar
                    ? "loggedAvatarLabelRed"
                    : "loggedAvatarLabelGreen"
                }
                type="file"
                // ref={userPhotoRef}
                // defaultValue={currentUser.photoURL}
                name="avatar"
                defaultValue={userAvatar}
                onChange={handleUpload}
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>

        <Link
          to="/"
          className="w-100 text-center mb-2"
          style={{ textDecoration: "none", color: "#2c337c" }}
        >
          Cancel
        </Link>
      </Card>
    </>
  );
}
