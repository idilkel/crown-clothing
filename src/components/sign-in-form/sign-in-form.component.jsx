//import { signInWithEmailAndPassword } from "firebase/auth";
//useContext is not needed: We have the onAuthStateChangedListener instead
import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

//import { UserContext } from "../../contexts/user.context";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  //console.log(formFields);

  //We have the onAuthStateChangedListener instead
  //const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();

    //We have the onAuthStateChangedListener instead
    //No need to destructure the user
    //const { user } = await signInWithGooglePopup();
    //setCurrentUser(user);
    //createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const response = await signInAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      // console.log(response);
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      //We have the onAuthStateChangedListener instead
      //setCurrentUser(user);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email. Please try again.");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
