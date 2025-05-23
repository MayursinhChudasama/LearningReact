import projects from "../src/utils/projects.js";
import Input from "./Input";
import { useRef } from "react";
import { useState } from "react";
export default function AddProject({ handleIsAdd, noProject }) {
  const [error, setError] = useState(false);
  const titleRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();
  const errorMsg = (
    <p className='text-red-500 mx-auto'>!! Please fill all the fields !!</p>
  );
  function handleSave() {
    const obj = {
      id: Math.random(),
      title: titleRef.current.value,
      desc: descRef.current.value,
      dueDate: dateRef.current.value,
      tasks: [],
    };
    if (
      titleRef.current.value &&
      descRef.current.value &&
      dateRef.current.value
    ) {
      projects.push(obj);
      handleIsAdd(true);
      setError(false);
      console.log(projects);
    } else {
      setError(true);
    }
  }
  return (
    <div className='flex flex-col'>
      <div className='flex gap-5 m-2 p-2 justify-end'>
        <button
          onClick={() => {
            noProject();
            setError(false);
          }}
          className='p-3 text-lg bg-blue-200 rounded-xl shadow-l hover:bg-blue-300 hover:cursor-pointer'>
          Cancel
        </button>
        <button
          onClick={handleSave}
          type='Submit'
          className='p-3 text-lg bg-blue-200 rounded-xl shadow-l hover:bg-blue-300 hover:cursor-pointer'>
          Save
        </button>
      </div>

      <Input
        ref={titleRef}
        label='TITLE'
      />

      <Input
        ref={descRef}
        label='DESCRIPTION'
        height='h-15'
      />

      <Input
        ref={dateRef}
        label='DUE DATE'
        type='date'
      />
      {error ? errorMsg : ""}
    </div>
  );
}
