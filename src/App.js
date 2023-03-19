import "./styles/globals.scss";
import Canvas1 from "./components/cv/Canvas1";
import FormLayout from "./components/layout/FormLayout";
import magnitudeImg from "./assets/magnitude.png";
import { useState } from "react";
function App() {
  const [resumeStatus, toggleResumeStatus] = useState(false);
  const toggleResume = () => {
    toggleResumeStatus((status) => !status);
  };
  return (
    <div className="wrapper">
      <div className="actions">
        <FormLayout></FormLayout>
      </div>
      <Canvas1 status={resumeStatus} />
      <div
        className="previewButton previewfade-appear-done previewfade-enter-done"
        onClick={toggleResume}
      >
        <img className="previewImg" src={magnitudeImg} alt="Preview" />
      </div>
    </div>
  );
}

export default App;
