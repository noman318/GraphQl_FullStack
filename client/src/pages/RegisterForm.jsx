import React from "react";

const RegisterForm = () => {
  return (
    <form>
      <div className="row mb-3">
        <label for="inputEmail3" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input type="email" className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <label for="inputName" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <label for="inputPhone" className="col-sm-2 col-form-label">
          Phone
        </label>
        <div className="col-sm-10">
          <input type="text" name="phone" className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <label for="inputPassword3" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input type="password" name="password" className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <label for="inputPassword3" className="col-sm-2 col-form-label">
          Confirm Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            name="confirm-password"
            className="form-control"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Sign in
      </button>
    </form>
  );
};

export default RegisterForm;
