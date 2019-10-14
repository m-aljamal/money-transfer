import React, { useState } from "react";
import firebase from "../components/firebase";

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import md5 from "md5";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState("");
  const [isloading, setLoading] = useState(false);

  const userRef = firebase.database().ref("users");
  // save new user in database function after create database in fierbase
  // here we only need to save user id, name, image
  const saveUser = createdUser => {
    return userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };

  // regester new user and add it to data base
  const handleSubmit = e => {
    e.preventDefault();
    if (password !== PasswordConfirmation) {
      setErrors("password are not the same try again");
      return;
    }

    setLoading(true);
    setErrors("");

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        console.log(createdUser);
        createdUser.user
          .updateProfile({
            displayName: username,
            photoURL: `http://gravatar.com/avatar/${md5(
              createdUser.user.email
            )}?d=identicon`
          })
          .then(() => {
            saveUser(createdUser).then(() => {
              console.log("user saved");
              setLoading(false);
              setUsername("");
              setEmail("");
              setPassword("");
              setPasswordConfirmation("");
            });
          })
          .catch(err => {
            setErrors(err.message);
            setLoading(false);
            console.log(err);
          });
      })
      .catch(err => {
        setErrors(err.message);
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div>
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" /> تسجيل حساب جديد
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                value={username}
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="اسم المستخدم"
                onChange={e => setUsername(e.target.value)}
                type="text"
                required
              />
              <Form.Input
                value={email}
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="الايميل"
                onChange={e => setEmail(e.target.value)}
                type="email"
                required
              />
              <Form.Input
                value={password}
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="كلمة السر"
                onChange={e => setPassword(e.target.value)}
                type="password"
                required
              />
              <Form.Input
                value={PasswordConfirmation}
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="تأكيد  كلمة السر"
                onChange={e => setPasswordConfirmation(e.target.value)}
                type="password"
                required
              />
              {/* loading */}
              <Button
                disabled={isloading}
                className={`${isloading && "loading"}`}
                color="orange"
                fluid
                size="large"
              >
                تسجيل
              </Button>
            </Segment>
          </Form>

          {/* !  masseges to dissplay is there is */}
          {errors && (
            <Message error>
              <h3>Error</h3>
              <p>{errors}</p>
            </Message>
          )}
          <Message>
            لدي حساب مسبق<Link to="/login"> صفحة الدخول</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}
export default Register;
