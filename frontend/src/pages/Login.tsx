import { StaticWebAuthLogins } from "@aaronpowell/react-static-web-apps-auth";

export const Login = () => {
  return (
    <StaticWebAuthLogins
      apple={false}
      google={false}
      azureAD={false}
      facebook={false}
      twitter={false}
    />
  );
};
