import React, { useState } from "react";
import DynamicEmpForm from "../form/DynamicEmpForm";
import DynamicEduForm from "../form/DynamicEduForm";
import { formAction } from "../../store/formStore";
import { useSelector, useDispatch } from "react-redux";
import DynamicLanguageForm from "../form/DynamicLanguageForm";
import DynamicSkillForm from "../form/DynamicSkillForm";
function DynamicWrapper(props) {
  const formData = useSelector((state) => state.formStore);
  const dispatch = useDispatch();
  // console.log("length is");
  // console.log(formData.empHistory.length);
  const addNewData = () => {
    if (props.field === "emp")
      // adding new field
      dispatch(
        formAction.empHistoryUpdate({
          jobTitle: "",
          employer: "",
          begin: "",
          end: "",
          description: "",
        })
      );
    if (props.field === "edu")
      // adding new field
      dispatch(
        formAction.educationUpdate({
          school: "",
          degree: "",
          started: "",
          finished: "",
          courseDescription: "",
        })
      );
    if (props.field === "language") {
      // adding new field
      dispatch(
        formAction.languageUpdate({
          language: "",
          level: "",
        })
      );
    }
    if (props.field === "skills") {
      // adding new field
      dispatch(
        formAction.skillUpdate({
          language: "",
          level: "",
        })
      );
    }
  };
  const dynamicForm = () => {
    let data = "";
    if (props.field === "emp") {
      data = formData.empHistory.length
        ? formData.empHistory.map((data, index) => (
            <DynamicEmpForm
              type="dynamic"
              fieldId={data.id}
              key={data.id}
              index={index}
            />
          ))
        : "";
    }
    if (props.field === "edu") {
      data = formData.education.length
        ? formData.education.map((data) => (
            <DynamicEduForm type="dynamic" fieldId={data.id} key={data.id} />
          ))
        : "";
    }
    if (props.field === "language") {
      data = formData.language.length
        ? formData.language.map((data) => (
            <DynamicLanguageForm
              type="dynamic"
              fieldId={data.id}
              key={data.id}
            />
          ))
        : "";
    }
    if (props.field === "skills") {
      data = formData.skills.length
        ? formData.skills.map((data) => (
            <DynamicSkillForm type="dynamic" fieldId={data.id} key={data.id} />
          ))
        : "";
    }
    return data;
  };
  return (
    <>
      {dynamicForm()}
      <div className="additionalDetailsToggle" onClick={addNewData}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAABHNCSVQICAgIfAhkiAAAAgxJREFUOE+tlMF52kAQhf/RKeESUkFEBcFHpAMSDdipwKKC4ApCKjCpwO4guAFJPiCO4AogFYQT5KTJtysEyJaIv8+Z4+7s25l5857QFEF2haOXqLgIgU1T1ghLclKQB9Leuu65vDg0YMItgovqEyIp6OaQp3QRuUR1gzgT8nc/SC+O90AVdJBNgK8oj6iMSXtpbSPBoo2zHYGMUF2hDEn9ZZl7BA2ze4Rr4IbYM+D/jmDWRbgHPqGtTllxAWrnx0+QIXHPJL0+grmLo0uUBYkXmoeCaUW2K5AnEq8g5HmUpMX+sP5+HuBoUhYlDOYR6B25dJrYZDAbg3wj9l4SW/4SZobQDyT+hRDOpoBL4ncbe34N6ElxwiBbg94T++M3gQb7EeQSGlAF/V4BHWQj4PYsW0YIidep5FgsbupBLaN5dLLwASJ9+/khnHVlU4otWGErLQa8IfGv/mf7E1SvSfyPbwIt1BgRe23BqMKRxVklFeyPzING2Ra7/kDiRcXeGYliHInwVMMHACMQtm7tnX0/myISkL93jVT3MjUGsVui+htthc9d5+wWlCZ0IvGjQooxpKgq6nxpdKjyB+tUuzvAEFwxoarsrA/spgh9lBQVYy6PFfkW5tNHNUJEyIlIPaPKQ9Rr2ahD8gkinxta/2VVmLcmdaNqNgiDZgn608XRLmib3Ekh3zQStq/gL2/L/Il1tvp9AAAAAElFTkSuQmCC"
          alt="icon"
        />
        <span> {props.title} </span>
      </div>
    </>
  );
}

export default DynamicWrapper;
