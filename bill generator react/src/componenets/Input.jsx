export default function Input({ label, id, width, type, ...props }) {
  return (
    <>
      <label
        className='p-1 m-1'
        htmlFor={id}>
        {label}:
      </label>
      <input
        className={`bg-blue-100 border-1 p-1 m-1 w-${width}`}
        type={type || "text"}
        id={id}
        name={id}
        {...props}
      />
    </>
  );
}
