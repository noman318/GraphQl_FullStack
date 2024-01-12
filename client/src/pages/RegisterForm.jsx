import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../mutations/clientMutations";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [registerClient, { loading }] = useMutation(REGISTER_USER, {
    variables: { name, email, password, phone },
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("submitted");
  //   if (
  //     email === "" ||
  //     password === "" ||
  //     name === "" ||
  //     phone === "" ||
  //     confirmPassword === "" ||
  //     password === confirmPassword
  //   ) {
  //     return alert(
  //       "Please fill all the required details to Register into the Portal"
  //     );
  //   }
  //   let { data } = await registerClient(email, password);
  //   // console.log("data", data.registerClient);

  //   alert("Registered User Successfully");
  //   setEmail("");
  //   setName("");
  //   setPhone("");
  //   setConfirmPassword("");
  //   setPassword("");
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 2000);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");

    if (
      email === "" ||
      password === "" ||
      name === "" ||
      phone === "" ||
      confirmPassword === "" ||
      password !== confirmPassword
    ) {
      return alert(
        "Please fill all the required details and ensure that passwords match to register into the Portal"
      );
    }

    try {
      let { data } = await registerClient(email, password);
      // console.log("data", data.registerClient);
      alert("Registered User Successfully");
      setEmail("");
      setName("");
      setPhone("");
      setConfirmPassword("");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.message === "Client with this email already exist") {
        alert("Client with this email already exist");
      } else {
        console.error("An error occurred:", error.message);
        alert("An error occurred during registration");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-50">
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPhone" className="col-sm-2 col-form-label">
          Phone
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            name="phone"
            className="form-control"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label
          htmlFor="inputConfirmPassword"
          className="col-sm-2 col-form-label"
        >
          Confirm Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            name="confirm-password"
            className="form-control"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button type="submit" disabled={loading} className="btn btn-primary">
          Register
        </button>
        <h6>
          Already Have an Account ? <Link to={"/login"}>Sign In</Link>
        </h6>
      </div>
    </form>
  );
};

export default RegisterForm;
