import React, { useState } from "react";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../../features/Auth/SignUpSlice";
import backGround from "../../images/—Pngtree—e-learning education online illustration_6548963.png";

export default function Register() {
  const navigate = useNavigate();
  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confPass, setConfPass] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [errors1, setErrors1] = useState({});
  const [errors2, setErrors2] = useState({});

  const validate1 = () => {
    const errors = {};

    if (!username) {
      errors.username = "Username is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!confPass) {
      errors.confPass = "Confirm Password is required";
    } else if (confPass !== password) {
      errors.confPass = "Passwords do not match";
    }

    setErrors1(errors);

    return Object.keys(errors).length === 0;
  };



  const validate2 = () => {
    const errors = {};
    if (!phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    }

    if (!date) {
      errors.date = "Date is required";
    }
    if(!gender){
      errors.gender = "Gender is required"
    }
    if(!country){
      errors.country = "Country is required"
    }
    setErrors2(errors);

    return Object.keys(errors).length === 0;
    }
  
  // configure another form
  const [firstPart, setFirstPart] = useState(false);
  function onNextClick() {
    if(validate1()){
      setFirstPart(true);   
    }
  }

  // redux logic
  const dispatch = useDispatch();

  function handleSubmittedClick(e) {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      email: email,
      confPass: confPass,
      phoneNumber: phoneNumber,
      date: date,
      gender: gender,
      country: country,
    };
    // console.log(data);
    if (validate2()) {
      console.log('he')
      dispatch(signupUser(data));
      navigate('/verify',{replace: true});
    }
  }

  return (
    <>
      <div className="signUp">
        <div className="flex flex-wrap ">
          <div className="w-1/2">
            <div className="container mx-auto sm:px-4">
              <div className="login-form text-center">
                <h2 className="font-semibold text-3xl mb-4">Register</h2>
                <form onSubmit={handleSubmittedClick}>
                  {!firstPart && (
                    <>
                      <div className="mb-4 mb-3">
                        <input
                          type="text"
                          id="username"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className={`w-full px-3 py-2 border ${
                            errors1.username
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded focus:outline-none`}
                        />
                        {errors1.username && (
                          <div className="text-red-500 text-sm   font-semibold">{errors1.username}</div>
                        )}
                      </div>
                      <div className="mb-4 mb-3">
                        <input
                          type="email"
                          id="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full px-3 py-2 border ${
                            errors1.email ? "border-red-500" : "border-gray-300"
                          } rounded focus:outline-none`}
                        />
                        {errors1.email && (
                          <div className="text-red-500 text-sm  font-semibold">{errors1.email}</div>
                        )}
                      </div>
                      <div className="mb-4 mb-3">
                        <input
                          type="password"
                          id="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`w-full px-3 py-2 border ${
                            errors1.password
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded focus:outline-none`}
                        />
                        {errors1.password && (
                          <div className="text-red-500 text-sm  font-semibold">{errors1.password}</div>
                        )}
                      </div>
                      <div className="mb-4 mb-3">
                        <input
                          type="password"
                          id="password"
                          placeholder="Confirm Password"
                          value={confPass}
                          onChange={(e) => setConfPass(e.target.value)}
                          className={`w-full px-3 py-2 border ${
                            errors1.confPass
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded focus:outline-none`}
                        />
                        {errors1.confPass && (
                          <div className="text-red-500 text-sm  font-semibold">{errors1.confPass}</div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={onNextClick}
                        className="inline-block text-white font-semibold align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-gray-100 text-gray-800 hover:bg-gray-200 fw-bold text-gray-100">
                        NEXT
                      </button>
                    </>
                  )}
                  {firstPart && (
                    <>
                      <div className="mb-4 mb-3">
                        <input
                          type="number"
                          id="phone"
                          placeholder="Phone Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className={`w-full px-3 py-2 border ${
                            errors2.phoneNumber
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded focus:outline-none`}
                        />
                        {errors2.phoneNumber && (
                          <div className="text-red-500 text-sm  font-semibold">
                            {errors2.phoneNumber}
                          </div>
                        )}
                      </div>
                      <div className="mb-4 mb-3">
                        <input
                          type="date"
                          id="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className={`w-full px-3 py-2 border ${
                            errors2.date ? "border-red-500" : "border-gray-300"
                          } rounded focus:outline-none`}
                        />
                        {errors2.date && (
                          <div className="text-red-500 text-sm  font-semibold">{errors2.date}</div>
                        )}
                      </div>
                      <div className="mb-4 mb-3">
                        <select
                          name="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className={`w-full px-3 py-2 border ${
                            errors2.gender ? "border-red-500" : "border-gray-300"
                          } rounded focus:outline-none`}>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        {errors2.gender && (
                          <div className="text-red-500 text-sm  font-semibold">{errors2.gender}</div>
                        )}
                      </div>
                      <div className="mb-4 mb-3">
                        <div className="wrapper">
                          <select
                            name="country"
                            id="select-box"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className={`w-full px-3 py-2 border ${
                              errors2.country
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded focus:outline-none`}>
                            <option value="USA">USA</option>
                            <option value="Three">Three</option>
                            <option value="Four">Four</option>
                            <option value="Five">Five</option>
                            <option value="Six">Six</option>
                            <option value="Seven">Seven</option>
                            <option value="Eight">Eight</option>
                            <option value="Nine">Nine</option>
                            <option value="Ten">Ten</option>
                          </select>
                          {errors2.country && (
                            <div className="text-red-500 text-sm  font-semibold">{errors2.country}</div>
                          )}
                        </div>
                      </div>
                      <button
                        // to="/verify"
                        type="submit"
                        className="inline-block text-white button  font-semibold align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-gray-100 text-gray-800 hover:bg-gray-200 fw-bold text-gray-100">
                        Register
                      </button>
                    </>
                  )}
                </form>
                <div className="sign-up mt-3">
                  <p className="font-semibold mb-3">- Already have an account? -</p>
                  <NavLink
                    to={"/"}
                    className="inline-block pt-5 font-semibold text-white align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline pt-3 bg-gray-100 text-gray-800 hover:bg-gray-200 button fw-bold text-gray-100">
                    LOGIN
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 loginBackGround">
            <div>
              <img
                src={backGround}
                className="mx-auto"
                alt="error"
                width={"500px"}
                height={"500px"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
