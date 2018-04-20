import decode from 'jwt-decode';

class Auth {
  static loggedIn() {
    const notAuth = false
    const authenticated = true;
    const token = localStorage.getItem('jwt');

    if(!token) return notAuth;
    try {
      const { exp } = decode(token);
      const date = new Date();

      if(exp < date.getTime() / 1000) {
        localStorage.removeItem('jwt');
        return notAuth;
      }

    } catch(err) {
      localStorage.removeItem('jwt');
      return notAuth;
    }

    return authenticated;
  }

  static logOut() {
    localStorage.removeItem('jwt');
  }
}

export default Auth;