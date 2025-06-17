import { Form } from "react-router";
import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  return (
    <Form
      method='post'
      action='/newsletter'
      className={classes.newsletter}>
      <input
        type='email'
        placeholder='Sign up for newsletter...'
        aria-label='Sign up for newsletter'
      />
      <button>Sign up</button>
    </Form>
  );
}

export default NewsletterSignup;
