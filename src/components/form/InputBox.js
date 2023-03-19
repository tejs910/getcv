import React, { useState } from "react";
import { formAction } from "../../store/formStore";
import { useSelector, useDispatch } from "react-redux";

function InputBox(props) {
  const formData = useSelector((state) => state.formStore);
  const dispatch = useDispatch();
  const [endDateStatus, changeEndDateStatus] = useState(true);
  const inputChanged = (e) => {
    if (props?.category === "dynamic") {
      if (props.field === "emp") {
        dispatch(
          formAction.empUpdate({
            notNull: true,
            fieldId: props.fieldId,
            key: props.id,
            value: e.target.value,
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
      if (props.field === "language") {
        dispatch(
          formAction.lanUpdate({
            notNull: true,
            fieldId: props.fieldId,
            key: props.id,
            value: e.target.value,
          })
        );
      }
      if (props.field === "skills") {
        dispatch(
          formAction.skUpdate({
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
  const checkBoxChanged = (e) => {
    // console.log();
    changeEndDateStatus((status) => !status);
    if (e.target.checked)
      dispatch(
        formAction.empUpdate({
          notNull: true,
          fieldId: props.fieldId,
          key: props.id,
          value: "Present",
        })
      );
    else
      dispatch(
        formAction.empUpdate({
          notNull: true,
          fieldId: props.fieldId,
          key: props.id,
          value: "",
        })
      );
  };
  return (
    <>
      {props.includeCheckBox ? (
        <div className="checkBoxInput">
          <label class="inputTitle">
            <input onChange={checkBoxChanged} type="checkbox" />
            Currently Working?
          </label>
        </div>
      ) : (
        ""
      )}
      {endDateStatus ? (
        <div className="simpleInput">
          <label className="inputTitle">{props.label}</label>
          <input
            type={props.type}
            placeholder={props.placeholder}
            onChange={inputChanged}
            // value={formData[props.id]}
          />
          <span className="border"></span>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default InputBox;
