import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const url = "http://localhost:3000/users/tokens";
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [resources_owner, setResource_owner] = useState();
  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChangeLogin = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
    const res = await axios.post(`${url}/sign_up`, formData);
    console.log(
      `Sign up successful -> ${{ status: "success", data: res.data }}`
    );
    // You can perform further actions here, such as sending data to a server.
  };
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    console.log("Login data submitted:", loginData);
    const res = await axios.post(`${url}/sign_in`, loginData);
    console.log({ data: res.data, status: res.status });
    if (res.status == 200) {
      setResource_owner(res.data.resource_owner);
      setAccessToken(res.data.token);
      setRefreshToken(res.data.refresh_token);
      setIsLogin(true);
    }
    // You can perform further actions here, such as sending data to a server.
  };
  return (
    <>
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {!isLogin ? (
        <div>
          <h2>Sign In</h2>
          <form onSubmit={handleSubmitLogin}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleInputChangeLogin}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChangeLogin}
                required
              />
            </div>

            <button type="submit">Sign In</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Login Success</h1>
        </div>
      )}
    </>
  );
}

export default App;
