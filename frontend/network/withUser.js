import {parseCookies} from "nookies";
import apiHandler from "./apiHandler";

function withUser(WrappedComponent) {
  function WithUser(props) {
    if (props.user) {
      apiHandler.defaults.headers['Authorization'] = props.user.token;
    } else {
      apiHandler.defaults.headers['Authorization'] = null;
    }

    return (
      <WrappedComponent {...props}/>
    )
  }

  WithUser.getInitialProps = async (context) => {
    const {user: currentProfile} = parseCookies(context);
    const user = currentProfile ? JSON.parse(currentProfile) : null;

    if (user) {
      apiHandler.defaults.headers['Authorization'] = user.token;
    } else {
      apiHandler.defaults.headers['Authorization'] = null;
    }

    console.log(apiHandler);

    const wrappedComponentProps = (
      WrappedComponent.getInitialProps ?
        await WrappedComponent.getInitialProps(context) :
        null
    );

    return {
      user,
      ...wrappedComponentProps
    };
  };

  return WithUser;
}

export default withUser;
