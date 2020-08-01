import React, { Component } from "react";
// import PropTypes from "prop-types";
import { reduxForm, Field, propTypes } from "redux-form";
import { required } from "redux-form-validators";
import { renderField, renderError } from "../../utils/renderUtils";
import { signupUser } from "../../actions/authActions";

class Signup extends Component {
  static propTypes = {
    ...propTypes,
  };

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <div className="row justify-content-center">
        <form className="col col-sm-5 card mt-5 p-2" onSubmit={handleSubmit}>
          <h4 className="text-md-center">Register</h4>
          <hr />

          <fieldset className="form-group">
            <Field
              name="name"
              label="Name"
              component={renderField}
              type="text"
              validate={[required({ message: "This field is required." })]}
            />
          </fieldset>

          <fieldset className="form-group">
            <Field
              name="aadhaar"
              label="Aadhaar Number"
              component={renderField}
              type="text"
              validate={[required({ message: "This field is required." })]}
            />
          </fieldset>

          <fieldset className="form-group">
            <Field
              name="mobNo"
              label="Mobile Number"
              component={renderField}
              type="text"
              validate={[required({ message: "This field is required." })]}
            />
          </fieldset>

          <fieldset className="form-group">
            <Field
              name="email"
              label="Email"
              component={renderField}
              type="text"
              validate={[required({ message: "This field is required." })]}
            />
          </fieldset>

          <fieldset className="form-group">
            <label>Gender</label>
            <br />
            <label>
              <Field
                name="sex"
                component={renderField}
                type="radio"
                value="male"
              />
              Male
            </label>
            &nbsp;&nbsp;
            <label>
              <Field
                name="sex"
                component={renderField}
                type="radio"
                value="female"
              />
              Female
            </label>
            &nbsp;&nbsp;
            <label>
              <Field
                name="sex"
                component={renderField}
                type="radio"
                value="other"
              />
              Other
            </label>
          </fieldset>

          <fieldset>
            <label>State</label><br/>
            <Field name="state" component="select">
              <option />
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
            </Field>
          </fieldset>

          <fieldset>
            <label>District</label><br/>
            <Field name="district" component="select">
              <option />
              <option value="Dindigul">Dindigul</option>
              <option value="Kancheepuram">Kancheepuram</option>
              <option value="Belagavi">Belagavi</option>
              <option value="Bengaluru">Bengaluru</option>
            </Field>
          </fieldset>

          <fieldset>
            <label>Panchayat Union</label><br/>
            <Field name="panchayatUnion" component="select">
              <option />
              <option value="Dindigul">Dindigul</option>
              <option value="Athoor">Athoor</option>
              <option value="Kancheepuram">Kancheepuram</option>
              <option value="Walajabad">Walajabad</option>
              <option value="Athni">Athni</option>
              <option value="Bailahongal">Bailahongal</option>
              <option value="Kasaba">Kasaba</option>
              <option value="Sompura">Sompura</option>
            </Field>
          </fieldset>

          <fieldset>
            <label>Panchayat</label><br/>
            <Field name="panchayat" component="select">
              <option />
              <option value="Anaipatti">Anaipatti</option>
              <option value="Adiyanuthu">Adiyanuthu</option>
              <option value="Akkaraipatti">Akkaraipatti</option>
              <option value="Alamarathupatti">Alamarathupatti</option>
              <option value="Angambakkam">Angambakkam</option>
              <option value="Arapakkam">Arapakkam</option>
              <option value="Agaram">Agaram</option>
              <option value="Alapakkam">Alapakkam</option>
              <option value="Adahalatti">Adahalatti</option>
              <option value="Adahalli">Adahalli</option>
              <option value="Avaradi">Avaradi</option>
              <option value="Bassapur">Bassapur</option>
              <option value="Arishinakunte">Arishinakunte</option>
              <option value="Bairasandra">Bairasandra</option>
              <option value="Agalakuppe">Agalakuppe</option>
              <option value="Baraguru">Baraguru</option>
            </Field>
          </fieldset>

          <fieldset className="form-group">
            <Field
              name="password1"
              label="Password"
              component={renderField}
              type="password"
              validate={[required({ message: "This field is required." })]}
            />
          </fieldset>

          <fieldset className="form-group">
            <Field
              name="password2"
              label="Confirm Password"
              component={renderField}
              type="password"
              validate={[required({ message: "This field is required." })]}
            />
          </fieldset>

          {renderError(error)}

          <fieldset className="form-group">
            <button action="submit" className="btn btn-primary">
              Sign Up
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

// Sync field level validation for password match
const validateForm = (values) => {
  const errors = {};
  const { password1, password2 } = values;
  if (password1 !== password2) {
    errors.password2 = "Password does not match.";
  }
  return errors;
};

export default reduxForm({
  form: "signup",
  validate: validateForm,
  onSubmit: signupUser,
})(Signup);
