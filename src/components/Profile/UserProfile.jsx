import React, { useActionState, useEffect, useState } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  FileText,
  MapPin,
  Calendar,
  Award,
} from "lucide-react";
import axios from "axios";

const InputFields = ({
  labelFor,
  labelName,
  inputType,
  inputName,
  inputId,
  icon: Icon,
  placeholder,
  value,
  disabled,
  onChange,
  required = false,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={labelFor}
        className="flex items-center gap-2 text-sm font-medium text-gray-700"
      >
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        {labelName}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={inputType}
          name={inputName}
          id={inputId}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 hover:border-gray-400"
        />
      </div>
    </div>
  );
};

const UserProfile = () => {
  //   const [formData, setFormData] = useState({});
  const [activeSection, setActiveSection] = useState("experience");
  const [state, action, pending] = useActionState(handleSubmit, null);
  const [profileData, setProfileData] = useState();
  const [userProfileId, setUserProfileId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  //
  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const url = isDevelopment
    ? "http://localhost:7000/api/userprofile"
    : import.meta.env.VITE_BACKEND_URL + "api/userprofile";

  // get the userProfile
  useEffect(() => {
    async function getUserProfile(url) {
      const profileResponse = await axios.get(url, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      const data = profileResponse.data;
      setProfileData(data.data);

      setUserProfileId(data.data._id);
    }

    getUserProfile(url);
  }, []);

  // hanlde change for editing
  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  // handle Update Profile
  async function handleUpdateProfile(userProfileId) {
    const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
    const url = isDevelopment
      ? `http://localhost:7000/api/userprofile/${userProfileId}`
      : import.meta.env.VITE_BACKEND_URL + `api/userprofile/${userProfileId}`;

    try {
      setError("");
      const response = await axios.patch(
        url,
        { profileData },
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      setMessage(data.message);
    } catch (error) {
      setMessage("");
      setError(error.response.data.message);
    }
  }

  // create a userProfile
  async function handleSubmit(preData, formData) {
    const companyName = formData.get("companyName");
    const jobTitle = formData.get("jobTitle");
    const address = formData.get("address");
    const yearsOfExperience = formData.get("yearsOfExperience");
    const jobPrefrence = formData.get("jobPrefrence");
    const name = formData.get("name");
    const place = formData.get("place");
    const score = formData.get("score");
    const joiningDate = formData.get("joiningDate");
    const endingDate = formData.get("endingDate");
    let skills = formData.get("skills");
    const resumeFile = formData.get("resumeFile");

    // conver skills into array
    skills = skills.split(",");

    try {
      setError("");
      const userProfileReponse = await axios.post(
        url,
        {
          experience: [
            {
              companyName,
              jobTitle,
              address,
              yearsOfExperience,
            },
          ],
          education: [
            {
              name,
              place,
              score,
              joiningDate,
              endingDate,
            },
          ],
          jobPrefrence,
          skills,
          resumeFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setMessage(userProfileReponse.data.message);
    } catch (error) {
      setMessage("");
      setError(error.response.data.message);
    }
  }

  const sections = [
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills & Resume", icon: FileText },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12z">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <User className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Profile
          </h1>
          <p className="text-gray-600">
            Build your professional profile to get better job matches
          </p>
        </div>

        {/* Progress Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-full p-2 shadow-lg">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="mr-5 px-4 py-2 flex flex-row-reverse">
            {isEditing ? (
              <button
                className="px-4 py-1 bg-green-800 text-white rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            ) : (
              <button
                className="px-4 py-1 bg-red-800 text-white rounded"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
          <div className="p-8">
            {/* Experience Section */}
            <form action={action}>
              <div
                className={`transition-all duration-500 ${
                  activeSection === "experience" ? "block" : "hidden"
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Work Experience
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputFields
                    labelFor="companyName"
                    labelName="Company Name"
                    inputType="text"
                    inputName="companyName"
                    inputId="companyName"
                    placeholder="e.g. Google Inc."
                    value={profileData?.experience[0]?.companyName || ""}
                    onChange={(e) => {
                      const newObj = [...profileData.experience];
                      newObj[0] = {
                        ...newObj[0],
                        companyName: e.target.value,
                      };
                      setProfileData({ ...profileData, experience: newObj });
                    }}
                    disabled={!isEditing}
                    required={true}
                  />

                  <InputFields
                    labelFor="jobTitle"
                    labelName="Job Title"
                    inputType="text"
                    inputName="jobTitle"
                    inputId="jobTitle"
                    placeholder="e.g. Senior Software Engineer"
                    value={profileData?.experience[0]?.jobTitle || ""}
                    onChange={(e) => {
                      const newObj = [...profileData.experience];
                      newObj[0] = {
                        ...newObj[0],
                        jobTitle: e.target.value,
                      };
                      setProfileData({ ...profileData, experience: newObj });
                    }}
                    disabled={!isEditing}
                    required={true}
                  />

                  <InputFields
                    labelFor="address"
                    labelName="Company Address"
                    inputType="text"
                    inputName="address"
                    inputId="address"
                    icon={MapPin}
                    placeholder="e.g. San Francisco, CA"
                    value={profileData?.experience[0]?.address || ""}
                    onChange={(e) => {
                      const newObj = [...profileData.experience];
                      newObj[0] = {
                        ...newObj[0],
                        address: e.target.value,
                      };
                      setProfileData({ ...profileData, experience: newObj });
                    }}
                    disabled={!isEditing}
                  />

                  <InputFields
                    labelFor="yearsOfExperience"
                    labelName="Years of Experience"
                    inputType="number"
                    inputName="yearsOfExperience"
                    inputId="yearsOfExperience"
                    placeholder="e.g. 3"
                    value={profileData?.experience[0]?.yearsOfExperience || ""}
                    onChange={(e) => {
                      const newObj = [...profileData.experience];
                      newObj[0] = {
                        ...newObj[0],
                        yearsOfExperience: e.target.value,
                      };
                      setProfileData({ ...profileData, experience: newObj });
                    }}
                    disabled={!isEditing}
                    required={true}
                  />
                </div>

                {/* Job Preference */}
                <div className="mt-8">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <Award className="w-4 h-4 text-blue-600" />
                    Job Preference
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jobPrefrence"
                    id="jobPrefrence"
                    required
                    defaultValue={profileData?.jobPrefrence}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900"
                  >
                    <option value="">Select your preference</option>
                    <option value="remote">Remote Work</option>
                    <option value="hybrid">Hybrid Work</option>
                    <option value="location">On-site Work</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                  </select>
                </div>
              </div>

              {/* Education Section */}
              <div
                className={`transition-all duration-500 ${
                  activeSection === "education" ? "block" : "hidden"
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Education
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputFields
                    labelFor="degreeName"
                    labelName="Degree/Course Name"
                    inputType="text"
                    inputName="name"
                    inputId="degreeName"
                    placeholder="e.g. Bachelor of Computer Science"
                    value={profileData?.education[0]?.name || ""}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const newObj = [...profileData.education];
                      newObj[0] = {
                        ...newObj[0],
                        name: e.target.value,
                      };
                      setProfileData({ ...profileData, education: newObj });
                    }}
                    required={true}
                  />

                  <InputFields
                    labelFor="instituteName"
                    labelName="Institute Name"
                    inputType="text"
                    inputName="place"
                    inputId="instituteName"
                    icon={MapPin}
                    placeholder="e.g. Stanford University"
                    value={profileData?.education[0]?.place || ""}
                    onChange={(e) => {
                      const newObj = [...profileData.education];
                      newObj[0] = {
                        ...newObj[0],
                        place: e.target.value,
                      };
                      setProfileData({ ...profileData, education: newObj });
                    }}
                    disabled={!isEditing}
                    required={true}
                  />

                  <InputFields
                    labelFor="score"
                    labelName="Score/GPA"
                    inputType="text"
                    inputName="score"
                    inputId="score"
                    placeholder="e.g. 3.8/4.0 or 85%"
                    value={profileData?.education[0]?.score || ""}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const newObj = [...profileData.education];
                      newObj[0] = {
                        ...newObj[0],
                        score: e.target.value,
                      };
                      setProfileData({ ...profileData, education: newObj });
                    }}
                  />

                  <InputFields
                    labelFor="joiningDate"
                    labelName="Start Date"
                    inputType="date"
                    inputName="joiningDate"
                    inputId="joiningDate"
                    value={
                      profileData?.education[0].joiningDate?.split("T")[0] || ""
                    }
                    disabled={!isEditing}
                    onChange={(e) => {
                      const newObj = [...profileData.education];
                      newObj[0] = {
                        ...newObj[0],
                        joiningDate: e.target.value,
                      };
                      setProfileData({ ...profileData, education: newObj });
                    }}
                    icon={Calendar}
                    required={true}
                  />

                  <InputFields
                    labelFor="endingDate"
                    labelName="End Date"
                    inputType="date"
                    inputName="endingDate"
                    inputId="endingDate"
                    value={
                      profileData?.education[0]?.endingDate?.split("T")[0] || ""
                    }
                    onChange={(e) => {
                      const newObj = [...profileData.education];
                      newObj[0] = {
                        ...newObj[0],
                        endingDate: e.target.value,
                      };
                      setProfileData({ ...profileData, education: newObj });
                    }}
                    disabled={!isEditing}
                    icon={Calendar}
                  />
                </div>
              </div>

              {/* Skills Section */}
              <div
                className={`transition-all duration-500 ${
                  activeSection === "skills" ? "block" : "hidden"
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Skills & Resume
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                      <Award className="w-4 h-4 text-blue-600" />
                      Your Skills
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="skills"
                      id="skills"
                      rows={4}
                      placeholder="e.g. JavaScript, React, Node.js, Python, AWS, Docker..."
                      required
                      onChange={handleChange}
                      value={profileData?.skills}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate skills with commas
                    </p>
                  </div>

                  <InputFields
                    labelFor="resumeFile"
                    labelName="Upload Resume"
                    inputType="file"
                    inputName="resumeFile"
                    inputId="resumeFile"
                    onChange={handleChange}
                    disabled={true}
                    icon={FileText}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = sections.findIndex(
                      (s) => s.id === activeSection
                    );
                    if (currentIndex > 0) {
                      setActiveSection(sections[currentIndex - 1].id);
                    }
                  }}
                  className={`px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 ${
                    activeSection === "experience" ? "invisible" : ""
                  }`}
                >
                  Previous
                </button>

                <div className="flex gap-4">
                  {activeSection !== "skills" ? (
                    <button
                      type="button"
                      onClick={() => {
                        const currentIndex = sections.findIndex(
                          (s) => s.id === activeSection
                        );
                        if (currentIndex < sections.length - 1) {
                          setActiveSection(sections[currentIndex + 1].id);
                        }
                      }}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Next Section
                    </button>
                  ) : (
                    <div>
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={profileData ? true : false}
                        className={`${
                          isEditing
                            ? "hidden"
                            : "px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                        }`}
                      >
                        Create Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateProfile(userProfileId)}
                        className={`${
                          isEditing
                            ? "block  px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                            : "hidden"
                        }`}
                      >
                        Update changes
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {message && (
                <div className="w-full mt-3 px-3 py-1 bg-green-800 text-white rounded">
                  {message}
                </div>
              )}
              {error && (
                <div className="w-full mt-3 px-3 py-1 bg-red-800 text-white  rounded">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Your information is secure and will only be used for job matching
            purposes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
