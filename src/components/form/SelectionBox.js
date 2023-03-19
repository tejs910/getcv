import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formAction } from "../../store/formStore";

function SelectionBox(props) {
  const formData = useSelector((state) => state.formStore);
  const dispatch = useDispatch();
  const inputChanged = (e) => {
    dispatch(
      formAction.staticFieldUpdate({ key: props.id, value: +e.target.value })
    );
    console.log(formData);
  };
  return (
    <div className="simpleInput">
      <label className="inputTitle">{props.label}</label>
      <select onChange={inputChanged} value={formData[props.id]}>
        {props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.show}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectionBox;
