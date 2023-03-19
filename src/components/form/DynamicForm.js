import React, { useState } from "react";
import InputBox from "./InputBox";
import TextArea from "./TextArea";
import { formAction } from "../../store/formStore";
import { useSelector, useDispatch } from "react-redux";
function DynamicForm(props) {
  const [panelStatus, togglePanel] = useState(true);
  const changePanelStatus = () => {
    togglePanel((status) => !status);
  };
  const formData = useSelector((state) => state.formStore);
  const dispatch = useDispatch();
  console.log("redux store is ", formData);
  console.log("field id is ", props.fieldId);
  return (
    <div class="panel">
      <div class="panelHeading">
        <span class="panelTitle"> school</span>
        <span class="panelSubtitle"> started - finished</span>
        <img
          onClick={changePanelStatus}
          alt="more"
          class={`panelToggler  ${panelStatus ? "panelToggler-opened" : ""}`}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAALCAYAAACgR9dcAAAABHNCSVQICAgIfAhkiAAAAVJJREFUKFOFkb1LQmEUh58jZkUkQQ1NNTTWElSaWuhtaYigwbHNrSFob2tpKPoHWqIl3BqChtTIe/1AaAscWhqEhiBqKMU84b1X0zQ60/v+zvt73vMhoB5iuSTCIalQkf8iau0gOkg6fCwY1gmwi+oraJB0pPyn37DiKBdO3rMhxMwjRPYcQStUdREzUukBGKaBco2IF2igsiWggpFr0uKOX8vUbMB7G7BqzePlDhixtQYJMqFTsS/RtBfxpRGJuIAsz2NrPMzWMMwZkAIw7sDkgNTyvn1q08PZUXxiITLnAi6pDycY+CiBTLltnZMKb7c8P2a7guIknnoemHYfvAF+F3bFRGiTpHz1NzfVZplKCZGxjqHd06iGyMQ+OwfZ/XMrY1hLqN4iMoTqIx5vgJvAy+8N9DfbLVjriJ5Rayxgrjz1rK5rYP2ygbyfQrDZd9/4BpPxa7XreRolAAAAAElFTkSuQmCC"
        />
      </div>
      <div class={`panelBody  ${panelStatus ? "" : "hidden"}`}>
        <div class="grid2col">
          <InputBox
            label="Job Title"
            type="input"
            id="jobTitle"
            category="dynamic"
            field="emp"
            fieldId={props.fieldId}
          />
          <InputBox
            label="Employer"
            type="input"
            id="employer"
            category="dynamic"
            field="emp"
            fieldId={props.fieldId}
          />
          <InputBox
            label="Begin"
            type="date"
            id="begin"
            category="dynamic"
            field="emp"
            fieldId={props.fieldId}
          />
          <InputBox
            label="End"
            type="date"
            id="end"
            category="dynamic"
            field="emp"
            fieldId={props.fieldId}
          />
          <TextArea
            label="Description"
            id="description"
            category="dynamic"
            field="emp"
            fieldId={props.fieldId}
          />
        </div>
      </div>
    </div>
  );
}

export default DynamicForm;
