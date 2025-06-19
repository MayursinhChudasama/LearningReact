import { useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className='p-4 text-red-600'>
      <h1>Error</h1>
      <p>{error.message || "Something went wrong."}</p>
    </div>
  );
}
