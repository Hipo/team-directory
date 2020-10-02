import {parseCookies} from "nookies";

import NetworkManager from "./NetworkManager";

function withUser(WrappedComponent) {
  function WithUser(props) {
    if (props.token) {
      NetworkManager.defaults.headers['Authorization'] = 'Token '+props.token;
    } else {
      NetworkManager.defaults.headers['Authorization'] = null;
    }

    return (
      <WrappedComponent {...props}/>
    )
  }

  WithUser.getInitialProps = async (context) => {
    const {token} = parseCookies(context);

    if (token) {
      NetworkManager.defaults.headers['Authorization'] = 'Token '+token;
    } else {
      NetworkManager.defaults.headers['Authorization'] = null;
    }

    const wrappedComponentProps = (
      WrappedComponent.getInitialProps ?
        await WrappedComponent.getInitialProps(context) :
        null
    );

    return {
      token,
      ...wrappedComponentProps
    };
  };

  return WithUser;
}

export default withUser;