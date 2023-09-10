import jwt_decode from "jwt-decode";

const checkRole = (action) => {
  //loop through persmissions
  const auth = localStorage.getItem("_token");
  const decodedToken = jwt_decode(auth);
  const roles = decodedToken._roles;
  if (auth) {
    //check if the user is admin
    if (decodedToken._isAdmin) return true;
    const roleNames = roles.map(({ name }) => name);
    return roleNames.includes(action);
  }
};
export default checkRole;
