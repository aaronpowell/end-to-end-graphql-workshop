import { useClientPrincipal } from "@aaronpowell/react-static-web-apps-auth";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useClientPrincipal();
  const location = useLocation();

  if (!user.loaded) {
    return <div>Loading...</div>;
  }

  if (!user.clientPrincipal) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
