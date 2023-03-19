import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formAction } from "../../store/formStore";

function TextArea(props) {
  const formData = useSelector((state) => state.formStore);
  const dispatch = useDispatch();
  const inputChanged = (e) => {
    if (props?.category === "dynamic") {
      if (props.field === "emp") {
        dispatch(
          formAction.empUpdate({
            fieldId: props.fieldId,
            key: props.id,
            value: e.target.value,
            notNull: true,
          })
        );
      }
      if (props.field === "edu") {
        dispatch(
          formAction.eduUpdate({
            notNull: true,
            fieldId: props.fieldId,
            key: props.id,
            value: e.target.value,
          })
        );
      }
    } else {
      dispatch(
        formAction.staticFieldUpdate({ key: props.id, value: e.target.value })
      );
    }
    dispatch(formAction.profileCompleteStatus());
  };
  return (
    <div className="simpleTextArea">
      <label className="inputTitle">{props.label}</label>
      <textarea
        style={{ overflow: "auto" }}
        type={props.type}
        placeholder={props.placeholder}
        onChange={inputChanged}
        value={formData[props.id]}
      />
      <span className="border"></span>
    </div>
  );
}

export default TextArea;
