import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import * as userService from "~/services/userService";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "~/components/Loading";
import routes from "~/config/routes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [role, setRole] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const login = (data) => {
    setIsLoading(true);
    userService
      .login({ data })
      .then((res) => {
        if (res.data) {
          navigate(routes.home);
          window.localStorage.setItem("token", res.data.token);
          setCurrentUser(res.data);
          setRole(res.data.role);
          setToken(res.data.token);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        err.response.status === 404
          ? alert(err.response.data.error)
          : alert(err.response.data.error);
      });
  };

  const register = (data) => {
    userService
      .Register({ data })
      .then((res) => {
        if (res.data) {
          login(data);
        } else if (res.response.data.error.keyPattern.username) {
          alert("Tài khoản đã tồn tại");
        } else if (res.response.data.error.keyPattern.email) {
          alert("Email đã tồn tại");
        }
      })
      .catch((err) => console.log(err));
  };

  const addActor = async (data) => {
    if (data.password !== data.rePassword) alert("Mật khẩu không trùng khớp");
    const formData = new FormData();
    
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("role", data.role);
    formData.append("province", data.province);
    formData.append("districts", data.districts);
    formData.append("phone", data.phone);
    formData.append("biography", data.biography);
    formData.append("education", data.education);
    formData.append("academic_degree", data.academic_degree);
    formData.append("dob", data.dob);
    formData.append("imageUrl", data.imageUrl);

    await userService
      .addActor({ data: formData })
      .then((res) => {
        if (res.data) {
          alert("Thay đổi thành công");
          setCurrentUser(res.data);
          navigate(routes.actorAdmin);
        } else if (res.response.data.error.keyPattern.email) {
          alert("Email đã tồn tại");
        }else if (res.response.data.error.keyPattern.username) {
          alert("Tài khoản đã tồn tại");
        }
      })
      .catch((err) => console.log(err));
  };

  const editProfile = async (data) => {
    if (data.password !== data.rePassword) alert("Mật khẩu không trùng khớp");
    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("role", data.role);
    formData.append("province", data.province);
    formData.append("districts", data.districts);
    formData.append("biography", data.biography);
    formData.append("education", data.education);
    formData.append("academic_degree", data.academic_degree);
    formData.append("dob", data.dob);
    {
      data.imageUrl && formData.append("imageUrl", data.imageUrl);
    }

    await userService
      .editUser({ id: data.id, data: formData })
      .then((res) => {
        if (res.data) {
          alert("Thay đổi thành công");
          setCurrentUser(res.data);
          navigate(-1);
        } else if (res.response.data.error.keyPattern.email) {
          alert("Email đã tồn tại");
        }
      })
      .catch((err) => console.log(err));
  };

  const logOut = () => {
    window.localStorage.removeItem("token");
    setCurrentUser({});
    setToken("");
    setRole(1);
    navigate(routes.home);
  };

  const isLogged = useCallback(async () => {
    try {
      setIsLoading(true);
      const Token = await window.localStorage.getItem("token");
      if (Token) {
        const res = await userService.getCurrentUser({});
        if (res.data) {
          setToken(Token);
          setCurrentUser(res.data);
          setRole(res.data.role);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      await window.localStorage.removeItem("token");
      setToken("");
      setCurrentUser({});
      setRole(0);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    isLogged();
  }, [isLogged]);

  useEffect(() => {
    if ((role === 0 || role === 3) && location.pathname === routes.home) {
      navigate(routes.dashboard);
    }
  }, [location, navigate, role]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider
      value={{
        token,
        currentUser,
        role,
        isLoading,
        login,
        logOut,
        register,
        editProfile,
        addActor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
