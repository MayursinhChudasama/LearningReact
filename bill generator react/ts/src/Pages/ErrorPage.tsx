import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();
  return (
    <div className='p-4 text-red-600'>
      <h1>Error</h1>
      <p>{error.message || "Something went wrong."}</p>
    </div>
  );
};

export default ErrorPage;
