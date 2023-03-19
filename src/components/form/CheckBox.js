import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formAction } from "../../store/formStore";

function CheckBox(props) {
  const formData = useSelector((state) => state.formStore);
  const dispatch = useDispatch();
  const checkBoxChecked = (e) => {
    dispatch(
      formAction.staticFieldUpdate({ key: props.id, value: e.target.value })
    );
  };
  return (
    <div className="simpleInput">
      <label className="inputTitle">{props.label}</label>
      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
      <span className="border"></span>
    </div>
  );
}

export default CheckBox;
