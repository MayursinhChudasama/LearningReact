import { useActionState } from "react";
import {
  isEmail,
  isEqualToOtherValue,
  hasMinLength,
  isNotEmpty,
} from "../util/validation";
function signupAction(prevFormState, formData) {
  const data = Object.fromEntries(formData.entries());
  const acquisition = formData.getAll("acquisition");
  data.acquisition = acquisition;
  const { email, password, confirmPassword, firstName, lastName, role, terms } =
    data;
  console.log(data);

  let errors = [];
  if (!isEmail(email)) {
    errors.push("Invalid email");
  }
  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push("You must provide a password with at least six characters");
  }
  if (!isEqualToOtherValue(password, confirmPassword)) {
    errors.push("passwords do not match");
  }
  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    errors.push("Please provide both your first and last name");
  }
  if (!isNotEmpty(role)) {
    errors.push("Please select a role");
  }
  if (!terms) {
    errors.push("You must agree to the terms and coonditions");
  }
  if (acquisition.length === 0) {
    errors.push("Please select at least one acquisition channel");
  }
  if (errors.length > 0) {
    return { errors, data: data };
  }
  return { errors: null };
}
export default function Signup() {
  const [formState, formAction] = useActionState(signupAction, {
    errors: null,
  });
  console.log(formState);

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className='control'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
          defaultValue={formState.data?.email}
        />
      </div>

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            defaultValue={formState.data?.password}
          />
        </div>

        <div className='control'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            defaultValue={formState.data?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            defaultValue={formState.data?.firstName}
          />
        </div>

        <div className='control'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            defaultValue={formState.data?.lastName}
          />
        </div>
      </div>

      <div className='control'>
        <label htmlFor='phone'>What best describes your role?</label>
        <select
          id='role'
          name='role'
          defaultValue={formState.data?.role}>
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
          <option value='employee'>Employee</option>
          <option value='founder'>Founder</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className='control'>
          <input
            type='checkbox'
            id='google'
            name='acquisition'
            value='google'
            defaultChecked={formState.data?.acquisition.includes("google")}
          />
          <label htmlFor='google'>Google</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='friend'
            name='acquisition'
            value='friend'
            defaultChecked={formState.data?.acquisition.includes("friend")}
          />
          <label htmlFor='friend'>Referred by friend</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='other'
            name='acquisition'
            value='other'
            defaultChecked={formState.data?.acquisition.includes("other")}
          />
          <label htmlFor='other'>Other</label>
        </div>
      </fieldset>

      <div className='control'>
        <label htmlFor='terms-and-conditions'>
          <input
            type='checkbox'
            id='terms-and-conditions'
            name='terms'
            defaultChecked={formState.data?.terms}
          />
          I agree to the terms and conditions
        </label>
      </div>
      {formState.errors && (
        <ul className='error'>
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <p className='form-actions'>
        <button
          type='reset'
          className='button button-flat'>
          Reset
        </button>
        <button className='button'>Sign up</button>
      </p>
    </form>
  );
}
