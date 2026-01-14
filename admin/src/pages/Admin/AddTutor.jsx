import React from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";


const AddTutor = () => {

    const [TutorImg, setTutorImg] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [feePerHour, setFeePerHour] = React.useState("");
    const [specialty, setSpecialty] = React.useState("Select specialty");
    const [qualification, setQualification] = React.useState("");
    const [address1, setAddress1] = React.useState("");
    const [address2, setAddress2] = React.useState("");
    const [about, setAbout] = React.useState("");

    const { backendUrl, aToken } = React.useContext(AdminContext); 

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            
            if(!TutorImg){
                return toast.error("Please upload a tutor image");
            }

            const formData = new FormData();
            formData.append("image", TutorImg);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("feePerHour", Number(feePerHour));
            formData.append("specialty", specialty);
            formData.append("qualification", qualification);
            formData.append("address", JSON.stringify({line1: address1, line2: address2}));
            formData.append("about", about);
        //     console.log(formData.get("image"));
            formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
            });

            const { data } = await axios.post(`${backendUrl}/api/admin/add-tutor`, formData, {headers: {aToken}});
            
            if(data.success){
                toast.success(data.message);
                setTutorImg(false);
                setName("");
                setEmail("");
                setPassword("");
                setFeePerHour("");
                setSpecialty("Select specialty");
                setQualification("");
                setAddress1("");
                setAddress2("");
                setAbout("");
            }else{
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.log(error);
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium"> Add Tutor</p>

      <div className="bg-white px-6 py-6 border rounded w-full max-w-3xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="tutor-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={TutorImg ? URL.createObjectURL(TutorImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setTutorImg(e.target.files[0])}
            type="file"
            id="tutor-img"
            hidden
          />
          <p>Upload Tutor Picture</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
          {/* LEFT COLUMN */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Tutor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter tutor name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Tutor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Enter tutor email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Tutor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fee Per Hour</p>
              <input
                onChange={(e) => setFeePerHour(e.target.value)}
                value={feePerHour}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Enter fee per hour"
                required
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Specialty</p>
              <select
                onChange={(e) => setSpecialty(e.target.value)}
                value={specialty}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="Select specialty">Select specialty</option>
                <option value="Physics">Physics</option>
                <option value="Math">Math</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Quran">Quran</option>
                <option value="Writing">Writing</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Educational Qualification</p>
              <input
                onChange={(e) => setQualification(e.target.value)}
                value={qualification}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter educational qualification"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter address 1"
                required
              />
              <input onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter address 2"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Tutor</p>
          <textarea onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            placeholder="write about tutor"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white text-sm px-10 py-3 rounded-full mt-6 hover:bg-primary/90 transition duration-300"
        >
          Add Tutor
        </button>
      </div>
    </form>
  );
};

export default AddTutor;
