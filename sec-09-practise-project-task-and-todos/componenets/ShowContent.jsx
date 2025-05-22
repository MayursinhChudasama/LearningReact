import Input from "./Input";
import projects from "../src/utils/projects.js";
import { useRef } from "react";
import { useState } from "react";
//
export default function ShowContent({ handleIsAdd, isAdd, handleClick }) {
  const titleRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();
  const [error, setError] = useState(false);
  // let isRequired = false;
  const errorMsg = (
    <p className='text-red-500 mx-auto'>!! Please fill all the fields !!</p>
  );
  function handleSave(event) {
    event.preventDefault();
    const obj = {
      id: "",
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
  const noProject = (
    <div className='flex flex-col items-center gap-5 p-3'>
      <h1>No project selected</h1>
      <h4>Select a project or get started with a new one.</h4>
      <button
        onClick={handleClick}
        className='px-6 py-2 rounded-md bg-blue-200 text-black-50 hover:bg-blue-300 hover:cursor-pointer'>
        Create New Project
      </button>
    </div>
  );
  const addProject = (
    <div className='flex flex-col'>
      <div className='flex gap-5 m-2 p-2 justify-end'>
        <button
          onClick={() => {
            handleClick();
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
  return (
    <>
      <main className='bg-white w-screen '>
        {isAdd ? noProject : addProject}
      </main>
    </>
  );
}
