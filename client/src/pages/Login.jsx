import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../mutations/clientMutations";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [signInUser, { loading }] = useMutation(LOGIN_USER, {
    variables: { email, password },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    if (email === "" || password === "") {
      return alert("Fill all the Fields to Sign In");
    }
    let { data } = await signInUser(email, password);
    let token = { data: data.loginClient.token }.data;
    // console.log("token", token);
    localStorage.setItem("graphQl_token", JSON.stringify(token));
    setEmail("");
    setPassword("");
    alert("Signed In Successfully");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  //   console.log("email", typeof email);
  //   console.log("password", typeof password);
  return (
    <form onSubmit={handleSubmit} className="w-50">
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            name="password"
            className="form-control"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? "Signinig In" : "Sign IN"}
      </button>
      <Link to={`/register`} style={{ float: "right" }}>
        Register
      </Link>
    </form>
  );
};

export default Login;
