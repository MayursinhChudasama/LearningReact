import { use } from "react";
import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);
  async function shareOpinionAction(prevFormData, formData) {
    const data = Object.fromEntries(formData.entries());
    const { title, userName, body } = data;

    let errors = [];
    if (title.trim().length < 5) {
      errors.push("The title should be at least five characters long");
    }
    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinions must be between 10 and 300 characters");
    }
    if (!userName.trim()) {
      errors.push("Please provide a username.");
    }
    if (errors.length > 0) {
      return { errors, data: data };
    }

    await addOpinion({ title, body, userName });
    return { errors: null };
  }
  const [formState, formAction] = useActionState(shareOpinionAction, {});
  return (
    <div id='new-opinion'>
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className='control-row'>
          <p className='control'>
            <label htmlFor='userName'>Your Name</label>
            <input
              type='text'
              id='userName'
              name='userName'
              defaultValue={formState.data?.userName}
            />
          </p>

          <p className='control'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              name='title'
              defaultValue={formState.data?.title}
            />
          </p>
        </div>
        <p className='control'>
          <label htmlFor='body'>Your Opinion</label>
          <textarea
            id='body'
            name='body'
            rows={5}
            defaultValue={formState.data?.body}></textarea>
        </p>
        {/* {formState.errors && formState.errors.map((error) => {
          return <li key={error}>{error}</li>;
        })} */}
        {formState.errors && (
          <ul className='error'>
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <Submit />
      </form>
    </div>
  );
}
