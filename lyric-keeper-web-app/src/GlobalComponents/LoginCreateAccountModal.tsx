import React, { useState } from "react";
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

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
}

export const LoginCreateAccountModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
}) => {
  const [modalType, setModalType] = useState<"login" | "create-account">(
    "login"
  );

  const isLoginType = modalType === "login";
  const isCreateAccountType = modalType === "create-account";

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
          placeholder="Email"
          name="email"
          value={email}
          variant="standard"
          onChange={handleChange}
        />
        <Error>{errors.email && errors.email}</Error>
        <StyledTextField
          placeholder={`Password ${
            isCreateAccountType ? "must be minimum of 8 characters" : ""
          }`}
          name="password"
          value={password}
          variant="standard"
          onChange={handleChange}
        />
        <Error>{errors.password && errors.password}</Error>
        <StyledButton variant="contained">
          {isLoginType ? "Login" : "Create Account"}
        </StyledButton>
        <ModalStyleSwitcher
          onClick={() =>
            setModalType(t => (t === "login" ? "create-account" : "login"))
          }
        >
          {isLoginType ? "Create Account" : "Login"}
        </ModalStyleSwitcher>
      </StyledContainer>
    </Modal>
  );
};
