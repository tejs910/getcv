import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputBox from "../form/InputBox";
import FileUpload from "../form/FileUpload";
import TextArea from "../form/TextArea";
import { formAction } from "../../store/formStore";
import DynamicWrapper from "./DynamicWrapper";
import SelectionBox from "../form/SelectionBox";
function FormLayout() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formStore);
  const [additionalDetailStatus, toggleAdditionalDetails] = useState(true);
  // const [profileCompleteness, setProfileCompleteness] = useState(0);
  const additionalDetailsToggle = () => {
    toggleAdditionalDetails((currentStatus) => !currentStatus);
  };
  const [plusImg, minusImg] = [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAABHNCSVQICAgIfAhkiAAAAgxJREFUOE+tlMF52kAQhf/RKeESUkFEBcFHpAMSDdipwKKC4ApCKjCpwO4guAFJPiCO4AogFYQT5KTJtysEyJaIv8+Z4+7s25l5857QFEF2haOXqLgIgU1T1ghLclKQB9Leuu65vDg0YMItgovqEyIp6OaQp3QRuUR1gzgT8nc/SC+O90AVdJBNgK8oj6iMSXtpbSPBoo2zHYGMUF2hDEn9ZZl7BA2ze4Rr4IbYM+D/jmDWRbgHPqGtTllxAWrnx0+QIXHPJL0+grmLo0uUBYkXmoeCaUW2K5AnEq8g5HmUpMX+sP5+HuBoUhYlDOYR6B25dJrYZDAbg3wj9l4SW/4SZobQDyT+hRDOpoBL4ncbe34N6ElxwiBbg94T++M3gQb7EeQSGlAF/V4BHWQj4PYsW0YIidep5FgsbupBLaN5dLLwASJ9+/khnHVlU4otWGErLQa8IfGv/mf7E1SvSfyPbwIt1BgRe23BqMKRxVklFeyPzING2Ra7/kDiRcXeGYliHInwVMMHACMQtm7tnX0/myISkL93jVT3MjUGsVui+htthc9d5+wWlCZ0IvGjQooxpKgq6nxpdKjyB+tUuzvAEFwxoarsrA/spgh9lBQVYy6PFfkW5tNHNUJEyIlIPaPKQ9Rr2ahD8gkinxta/2VVmLcmdaNqNgiDZgn608XRLmib3Ekh3zQStq/gL2/L/Il1tvp9AAAAAElFTkSuQmCC",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAABHNCSVQICAgIfAhkiAAAAehJREFUOE+tlM1V21AQhb/RKvEmpoLIFcQsLS2Q3ACkAkQFMR2QClAqwB0ADViPBfLSpgI7FcQrnNWbnCchbIFkzCGzlObdufNzr9AWUX6Cp8eo+AhRkaYsEeZYDMgtZrBsei6vPjow4RLBR/UBEQO6es5T+ogco7pCvBT76RfmcPMfqIMO8xT4gXKHygVmYBobiWZdvMcRyAjVBcoZJpxXuRvQOB8jnALnTAIH/nZE932EMfAV7fQqxiVoMT+uQc6YDFzS/hFNfTydo8zIgtg9FFwr8rgAeSALyoW8N6JphKdZRUoYThPQK6z02ra5V404dwv9QhYeCvH9DeCThf29HrclbZEThvkSdMwkvPgQaDUCK7EDVdCfNdBhPgIudxZxQsiCXi2nwOK8GbTYqE12M/eWtUspr2BBwbQc8IosPPmf7aeonpKFBx8CLdWYMAm6glOFJ7N3Kell9c2t35IFSakoJ1GcIxFva3hv5u4sRSLsZ99J9UmmziDWc1T/oJ34pevsBK9MaEviG0Mpx2BQVdT73upQVYXCqdZXgFtwzYTq1lfMZn2DcIRiUHHmcleTb2k+R6gmiAiWBBM4VT7Ha5MuXGsaITZF5FtL678LFdpO2jSqZtDtFvnbx9M+aBfrGbCrt5b5D6Tb34mGSAFYAAAAAElFTkSuQmCC",
  ];
  // useEffect(() => {
  //   if (formData.firstName.length) {
  //     // setProfileCompleteness((percent) => percent + 2);
  //   }
  // });
  let backColor = "#CC3333";
  if (formData.profileCompleteness > 40 && formData.profileCompleteness < 80)
    backColor = "#CC6600";
  if (formData.profileCompleteness > 79) backColor = "#33CC66";
  return (
    <div id="introd" className="actionIntroWrapper filling">
      <div className="formHead">
        <div className="cvTitle">
          <span spellCheck="false"></span>
        </div>
      </div>
      <div>
        <div className="progressLabel">
          <span className="title">Profile Completness</span>
          <span className="value" style={{ color: backColor }}>
            {" "}
            {formData.profileCompleteness}%
          </span>
        </div>
        <div className="progressWrapper">
          <div className="progressPath">
            <div
              className="progressFill"
              style={{
                width: `${formData.profileCompleteness}%`,
                backgroundColor: backColor,
              }}
            ></div>
          </div>
        </div>
      </div>
      <form>
        <div className="sectionHeading">
          <span className="sectionTitle">Personal Details</span>
        </div>
        <div className="grid2col">
          <InputBox label="First Name" type="input" id="firstName" />
          <InputBox label="Last Name" type="input" id="lastName" />
          <InputBox label="Email" type="email" id="email" />
          <InputBox label="Phone" type="tel" id="phone" />
          <InputBox label="Occupation" type="text" id="occupation" />
          <FileUpload />
        </div>
        <div
          className={`additionalnfo grid2col ${
            additionalDetailStatus ? "" : "hidden"
          }`}
        >
          <InputBox label="Country" type="input" id="country" />
          <InputBox label="City" type="input" id="city" />
          <InputBox label="Address" type="input" id="address" />
          <InputBox label="Postal Code" type="input" id="postalCode" />
          <InputBox label="Date Of Birth" type="input" id="dateOfBirth" />
          <InputBox label="Driving Licence" type="input" id="DrivingLicence" />
          <InputBox label="Nationality" type="input" id="nationality" />
        </div>
        <div
          className="additionalDetailsToggle"
          onClick={additionalDetailsToggle}
        >
          <img src={additionalDetailStatus ? minusImg : plusImg} alt="icon" />
          <span>
            {additionalDetailStatus ? "Hide" : "Show"} additional details
          </span>
        </div>
        <div className="sectionHeading">
          <span className="sectionTitle">Professional Summary</span>
          <p className="sectionDescription">
            Quick summary about your overall experience.{" "}
          </p>
        </div>
        <TextArea label="Professional Summary" id="professionalSummary" />
        <div className="sectionHeading">
          <span className="sectionTitle">Formatting Options</span>
        </div>
        <div className="grid2col">
          <SelectionBox
            label="Date Format"
            id="dateFormat"
            options={[
              { value: "1", show: "MM DD YY" },
              { value: "2", show: "DD MM YY" },
              { value: "3", show: "DD MM YYYY" },
              { value: "4", show: "MM DD YYYY" },
            ]}
          />
          <SelectionBox
            label="Date Separator"
            id="dateseparator"
            options={[
              { value: "1", show: "-" },
              { value: "2", show: "/" },
            ]}
          />
        </div>
        <div className="componentsWrapper">
          <div className="sectionHeading">
            <span className="sectionTitle">Employment History</span>
            <p className="sectionDescription">
              Include you 10 last year relevant experience and dates in this
              section. List your most recent position first .{" "}
            </p>
          </div>
          <DynamicWrapper field="emp" title="Add Job" />
          <div className="sectionHeading">
            <span className="sectionTitle">Education </span>
            <p className="sectionDescription">
              Include you 10 last year relevant experience and dates in this
              section. List your most recent position first .{" "}
            </p>
          </div>
          <DynamicWrapper field="edu" title="Add Education" />
          <div className="sectionHeading">
            <span className="sectionTitle">Languages </span>
            <p className="sectionDescription">
              {" "}
              Please enter the languages you are able to work with.
            </p>
          </div>
          <DynamicWrapper field="language" title="Add Languages" />
          <div className="sectionHeading">
            <span className="sectionTitle">Skills </span>
            <p className="sectionDescription">
              {" "}
              Please enter your skills. and give each one a rating.
            </p>
          </div>
          <DynamicWrapper field="skills" title="Add Skills" />
        </div>
      </form>
    </div>
  );
}

export default FormLayout;
