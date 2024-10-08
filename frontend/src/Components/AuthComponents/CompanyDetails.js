import React, { useState } from "react";
import "./CompanyDetails.css";
import uploadImg from "../../images/add_photo_alternate_outlined.png";
import backGround from "../../images/—Pngtree—e-learning education online illustration_6548963.png";
import { useNavigate } from "react-router-dom";
import UseFetch from "./UseFetch";

const countries = [
  ["DZ", "Algeria"],
  ["BH", "Bahrain"],
  ["EG", "Egypt"],
  ["IQ", "Iraq"],
  ["JO", "Jordan"],
  ["KW", "Kuwait"],
  ["LB", "Lebanon"],
  ["LY", "Libya"],
  ["MR", "Mauritania"],
  ["MA", "Morocco"],
  ["OM", "Oman"],
  ["PS", "Palestine"],
  ["QA", "Qatar"],
  ["SA", "Saudi Arabia"],
  ["SD", "Sudan"],
  ["SY", "Syria"],
  ["TN", "Tunisia"],
  ["AE", "United Arab Emirates"],
  ["YE", "Yemen"],
];

export default function CompanyDetails() {
  const navigate = useNavigate();
  const { fetchData, resData, loading, error } = UseFetch();
  const [compName, setCompName] = useState("");
  const [compEmail, setCompEmail] = useState("");
  const [logo, setLogo] = useState();
  const [logoToAppear, setLogoToAppear] = useState();
  const [country, setCountry] = useState("SY");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("L");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState({});
  const [testPhoto, setTestPhoto] = useState(false);

  function handleLogo(e) {
    console.log(e.target.files);
    setLogo(e.target.files[0]); 
    setLogoToAppear(URL.createObjectURL(e.target.files[0]));
    setTestPhoto(true);
  }
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!compName) newErrors.compName = true;
    if (!compEmail) {
      newErrors.compEmail = true;
    } else if (!validateEmail(compEmail)) {
      newErrors.compEmail = true;
    }
    if (!country) newErrors.country = true;
    if (!location) newErrors.location = true;
    if (!desc) newErrors.desc = true;
    if (!size) newErrors.size = true;
    if (!phoneNumber) newErrors.phoneNumber = true;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreateNestClick = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    const formData = new FormData();
    formData.append("name", compName);
    formData.append("email", compEmail);
    formData.append("logo", logo);
    formData.append("country", country);
    formData.append("location", location);
    formData.append("size", size);
    formData.append("description", desc);
    formData.append("phone", phoneNumber);
    const formDataObj = Object.fromEntries(formData); 
    console.log(formDataObj);
  
    if (validateForm()) {
      const res = await fetchData({
        method: "post",
        url: "http://127.0.0.1:8000/api/create_company/",
        data: formData,
        params: {},
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
     if(res){
      navigate('/company',{replace: true});
     }
    }
  };

  const getInputClass = (field) =>
    errors[field] ? "border border-red-500" : "";

  return (
    <>
      <div className="companyDetails">
        <div className="flex flex-wrap ">
          <div className="w-full lg:w-1/2 ">
            <div className="container mx-auto sm:px-4">
              <div className="login-form text-center">
                <h4 className="font-semibold text-xl mb-4">
                  Please Enter Company Details
                </h4>
                <form onSubmit={handleCreateNestClick}>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="companyName"
                      placeholder="Company Name"
                      value={compName}
                      onChange={(e) => setCompName(e.target.value)}
                      className={` ${getInputClass("compName")}`}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      id="companyemail"
                      placeholder="Company Email"
                      value={compEmail}
                      onChange={(e) => setCompEmail(e.target.value)}
                      className={` ${getInputClass("compEmail")}`}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="file-upload">
                      {!testPhoto  
                      ?
                      <div>
                      <img src={uploadImg} alt="upload" className="mx-auto" />
                      <h6 className="fw-bold">Click box to upload LOGO</h6>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleLogo}
                      />
                      </div>
                      :
                      <div>
                        <img src={logoToAppear} alt="upload" className="w-44 h-44 mx-auto" />
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleLogo}
                      />
                      </div>
                      }
                    </div>
                  </div>
                  <div className="mb-4 size flex justify-center">
                    <select
                      name="country"
                      id="select-box"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className={` ${getInputClass("country")}`}
                    >
                      {countries.map(([code, name]) => (
                        <option key={code} value={code}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      id="location"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={` ${getInputClass("location")}`}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="description"
                      placeholder="Description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className={` ${getInputClass("desc")}`}
                    />
                  </div>
                  <div className="mb-4 size flex justify-center">
                    <select
                      name="size"
                      id="select-box"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className={` ${getInputClass("size")}`}
                    >
                      <option value="L">Large</option>
                      <option value="M">Medium</option>
                      <option value="S">Small</option>
                    </select>
                    <input
                      type="number"
                      id="number"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={` ${getInputClass("phoneNumber")}`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-block text-white font-bold align-middle  select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-gray-100 text-gray-800 hover:bg-gray-200 fw-bold text-gray-100"
                  >
                    Create NEST
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="min-h-screen w-full lg:w-1/2 loginBackGround hidden md:block">
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