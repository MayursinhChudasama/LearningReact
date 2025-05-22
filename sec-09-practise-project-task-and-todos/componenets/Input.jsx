export default function Input({ ref, label, height, type }) {
  return (
    <div className='flex flex-col gap-2 px-3 py-2'>
      <label className='font-medium'>{label}</label>
      <input
        className={`w-2rem ${height} p-1 border-b-1 rounded-sm border-stone-300 bg-blue-100 focus:outline-none focus:border-blue-500`}
        type={type}
        ref={ref}
        required
      />
    </div>
  );
}
