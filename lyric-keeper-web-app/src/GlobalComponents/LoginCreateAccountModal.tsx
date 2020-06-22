import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@material-ui/core/Modal";
import {
  StyledTextField,
  Error,
  StyledContainer,
  LoginHeader,
  StyledButton,
  ModalStyleSwitcher,
} from "./elements";
import { firebase } from "firebaseApp";
import { UseCurrentUser } from "Hooks";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  setUser: React.Dispatch<any>;
}

interface EmailAndPassword {
  email: string;
  password: string;
  setError: React.Dispatch<any>;
}

export const LoginCreateAccountModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  setUser,
}) => {
  const [modalType, setModalType] = useState<"login" | "create-account">(
    "login"
  );
  const [authError, setAuthError] = useState("");

  const isLoginType = modalType === "login";
  const isCreateAccountType = modalType === "create-account";

  // \\\\\\ CREATE ACCOUNT LOGIC //////

  const createNewUser = ({ email, password, setError }: EmailAndPassword) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
      })
      .then((r: any) => {
        if (r && r.user) {
          setUser({ uid: r.user.uid });
        }
      });
  };

  // \\\\\\ LOGIN LOGIC //////

  const signInUser = ({ email, password, setError }: EmailAndPassword) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
      })
      .then((r: any) => {
        if (r && r.user) {
          setUser({ uid: r.user.uid });
        }
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("You must enter an email address"),
    password: Yup.string()
      .required("You must enter a password")
      .min(8, "Password must at least 8 characters long"),
  });

  const {
    handleChange,
    values: { email, password },
    errors,
    validateForm,
    handleBlur,
    touched,
    setTouched,
  } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: () => undefined,
  });

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <StyledContainer maxWidth="xs">
        <LoginHeader>{isLoginType ? "Login" : "Create Account"}</LoginHeader>
        <StyledTextField
          type="email"
          onBlur={handleBlur}
          placeholder="Email"
          name="email"
          value={email}
          variant="standard"
          onChange={handleChange}
        />
        <Error>{errors.email && touched.email && errors.email}</Error>
        <StyledTextField
          type="password"
          onBlur={handleBlur}
          placeholder={`Password ${
            isCreateAccountType ? "must be minimum of 8 characters" : ""
          }`}
          name="password"
          value={password}
          variant="standard"
          onChange={handleChange}
        />
        <Error>{errors.password && touched.password && errors.password}</Error>
        <StyledButton
          onClick={() => {
            (async () => {
              const errors = await validateForm();
              if (!errors.email && !errors.password) {
                isCreateAccountType
                  ? createNewUser({ email, password, setError: setAuthError })
                  : signInUser({ email, password, setError: setAuthError });
              } else {
                setTouched({ email: true, password: true });
              }
            })();
          }}
          variant="contained"
        >
          {isLoginType ? "Login" : "Create Account"}
        </StyledButton>
        <Error>{authError}</Error>
        <ModalStyleSwitcher
          onClick={() => {
            setModalType(t => (t === "login" ? "create-account" : "login"));
            setAuthError("");
          }}
        >
          {isLoginType ? "Create Account" : "Login"}
        </ModalStyleSwitcher>
      </StyledContainer>
    </Modal>
  );
};
