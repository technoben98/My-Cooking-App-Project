import { useEffect, useState } from "react";

import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const Auth = (props) => {
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    try {
      console.log(token);
      const response = await axios.get("/users/verify", {
        headers: {
          x_access_token: token,
        },
      });
      // console.log("responce=>", response);
      if (response.status === 201) setRedirect(true);
    } catch (err) {
      console.log(err.response.data);
      setRedirect(false);
      navigate("/login");
    }
  };

  return redirect ? props.children : console.log(token);
};

export default Auth;
