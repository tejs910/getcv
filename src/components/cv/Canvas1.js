import React, { useRef, useState } from "react";
import KonvaCanvas from "./KonvaCanvas";
import { useDispatch, useSelector } from "react-redux";
function Canvas1(props) {
  const [currentLimit, setCurrentLimit] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const formData = useSelector((state) => state.formStore);
  const incPage = () => {
    if (currentPage === formData.totalPages) return;
    setCurrentLimit((currentLimit) => (currentLimit += 640));
    setCurrentPage((page) => page + 1);
  };
  const decPage = () => {
    if (currentPage === 1) return;
    if (currentLimit >= 640) {
      setCurrentLimit((currentLimit) => (currentLimit -= 640));
    }
    if (currentLimit > 1) {
      setCurrentPage((page) => page - 1);
    }
  };
  return (
    <div className={`right-panel ${props.status ? "boardShowed" : ""}`}>
      <div className="board">
        <div id="cv" className="cv">
          <div className="cvWrapper">
            <ul className="pagination">
              <li onClick={decPage}> previous </li>
              <li>
                {currentPage} / {formData.totalPages}
              </li>
              <li onClick={incPage}> next </li>
            </ul>

            <KonvaCanvas
              currentHeight={currentLimit}
              currentPage={currentPage}
            ></KonvaCanvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canvas1;
