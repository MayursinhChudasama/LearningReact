export default function Input({ label, id, isAddress, type, ...props }) {
  let width = " w-50";
  if (isAddress) {
    width = " w-175";
  }
  return (
    <>
      <label
        className='p-1 m-1'
        htmlFor={id}>
        {label}:
      </label>
      <input
        className={
          `bg-[#4A4A4A] text-[#F5F5F5] border-1 border-[#2F2F2F] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 p-1 m-1` +
          width
        }
        type={type || "text"}
        id={id}
        name={id}
        {...props}
      />
    </>
  );
}
