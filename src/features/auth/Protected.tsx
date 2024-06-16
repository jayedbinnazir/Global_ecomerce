import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, loggedinUser } = useAppSelector((state) => state.users);
  if (!loggedinUser) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  if (isLoading) {
    return (
      <img
        src="/spinner.svg"
        alt="Icon"
        width="100"
        height="100"
        className="motion-safe:animate-spin mx-auto "
      />
    );
  }

  return children;
};

export default Protected;
