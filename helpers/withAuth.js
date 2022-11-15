import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const withAuth = (WrappedComponent) => {
  return (props) => {
    const walletAddress = useSelector(
      (state) => state.walletSlice.walletAddress
    );
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      // If there is no walletaddress we redirect to "/" page.
      if (!walletAddress) {
        Router.replace("/");
        return null;
      }
      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
