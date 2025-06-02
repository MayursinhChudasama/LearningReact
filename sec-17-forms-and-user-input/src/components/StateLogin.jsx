import { useState } from "react";
function handleSubmit(event) {
  event.preventDefault();
  console.log(values);
}
export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isEdit, setIsEdit] = useState({
    email: false,
    password: false,
  });
  const isInvalid =
    isEdit.email && !values.email.includes("@") && values.email !== "";
  console.log(isInvalid);

  function handleValues(identifier, value) {
    setValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setIsEdit((prevValue) => ({
      ...prevValue,
      [identifier]: false,
    }));
  }
  function handleBlur(identifier) {
    setIsEdit((prevValue) => ({
      ...prevValue,
      [identifier]: true,
    }));
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            onBlur={(event) => handleBlur("email")}
            onChange={(event) => handleValues("email", event.target.value)}
            value={values.email}
          />
          {isInvalid && (
            <p className='control-error'>Please Enter a valid input</p>
          )}
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            onChange={(event) => handleValues("password", event.target.value)}
            value={values.password}
          />
        </div>
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
