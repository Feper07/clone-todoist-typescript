
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style-sheets/LastButton.css";
import { BsFlagFill, BsFlag, BsCheck } from "react-icons/bs";
import { TfiLayoutSliderAlt } from "react-icons/tfi";

const LastButton = () => {
  const [priorityButton, setPriorityButton] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleOpciones = () => {
    setPriorityButton(!priorityButton);
  };

  const handleOpcionClick = (option: string) => {
    setSelectedOption(option);
    setPriorityButton(false);
    console.log(`selected option: ${option}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setPriorityButton(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="priority-options" ref={containerRef}>
      <button className="last-container-button-main" onClick={toggleOpciones}>
        {selectedOption ? (
          <>
            {selectedOption === "P1" && (
              <>
                <BsFlagFill className="flag-red" />&nbsp; Rutinas
              </>
            )}
            {selectedOption === "P2" && (
             <>
                <BsFlagFill className="flag-orange" />&nbsp; Inspiración
              </>
            )}
            {selectedOption === "P3" && (
              <>
                <BsFlagFill className="flag-blue" />&nbsp; P3
              </>
            )}
            {selectedOption === "P4" && (
              <>
                <BsFlag />&nbsp; P4
              </>
            )}
            {selectedOption !== "P4"}
          </>
        ) : (
          "Bandeja de entrada"
        )}
      </button>
      {priorityButton && (
        <div className="etc-options-last-container">
          <button
            onClick={() => handleOpcionClick("P1")}
            className="last-container-opcontainertion"
          >
            &nbsp;&nbsp;&nbsp;<TfiLayoutSliderAlt className="flag-red" />
            &nbsp;&nbsp;&nbsp;Rutinas&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {selectedOption === "P1" && <BsCheck className="nike" />}
          </button>
          <button
            onClick={() => handleOpcionClick("P2")}
            className="priority-option"
          >
            &nbsp;&nbsp;&nbsp;<TfiLayoutSliderAlt className="flag-orange" />
            &nbsp;&nbsp;&nbsp;Inspiración&nbsp;&nbsp;&nbsp;&nbsp;
            {selectedOption === "P2" && <BsCheck className="nike" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default LastButton;