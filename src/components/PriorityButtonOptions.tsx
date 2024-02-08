import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style-sheets/PriorityButtonOptions.css";
import { BsFlagFill, BsFlag, BsCheck } from "react-icons/bs";

// Defining component properties
interface PriorityButtonOptions{
  onChange?: (priority: string)=>void,
  value?:string
}

// PriorityButtonOptions functional component
const PriorityButtonOptions = (props:PriorityButtonOptions) => {

  // Status to control the visibility of the options menu
  const [priorityButton, setPriorityButton] = useState(false);
  // Status to store the selected priority option
  const [selectedOption, setSelectedOption] = useState<string>(props.value?props.value:"");
  
  // Effect to update 'selectedOption' state when 'props.value' changes
  React.useEffect(() => {
    setSelectedOption(props.value?props.value:"");
  }, [props.value]);
  
  // Reference to the main container of the component
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Feature to show/hide options menu when clicking main button
  const toggleOpciones = () => {
    setPriorityButton(!priorityButton);
  };

  // Function to handle clicking on a priority option
  const handleOpcionClick = (option: string) => {
    setSelectedOption(option); // Sets the selected option
    if(props.onChange){
      props.onChange(option); // Call the onChange function if it is defined
    }
    setPriorityButton(false); // Hide the options menu
  };

  // Effect to close menu if clicked outside of component
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
      <button className="priority-button-main" onClick={toggleOpciones}>
        {selectedOption ? (
          <>
            {selectedOption === "P1" && (
              <>
                <BsFlagFill className="flag-red" />&nbsp; P1
              </>
            )}
            {selectedOption === "P2" && (
             <>
                <BsFlagFill className="flag-orange" />&nbsp; P2
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
          "Prioridad"
        )}
      </button>
      {priorityButton && (
        <div className="etc-options-priority">
          <button
            onClick={() => handleOpcionClick("P1")}
            className="priority-option"
          >
            <BsFlagFill className="flag-red" />
            Prioridad 1
            {selectedOption === "P1" && <BsCheck className="nike" />}
          </button>
          <button
            onClick={() => handleOpcionClick("P2")}
            className="priority-option"
          >
            <BsFlagFill className="flag-orange" />
            Prioridad 2
            {selectedOption === "P2" && <BsCheck className="nike" />}
          </button>
          <button
            onClick={() => handleOpcionClick("P3")}
            className="priority-option"
          >
            <BsFlagFill className="flag-blue" />
            Prioridad 3
            {selectedOption === "P3" && <BsCheck className="nike" />}
          </button>
          <button
            onClick={() => handleOpcionClick("P4")}
            className="priority-option"
          >
            <BsFlag />
            Prioridad 4
            {selectedOption === "P4" && <BsCheck className="nike" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default PriorityButtonOptions;


/* ---> SEGUNDA SOLUCION <---


    import React, { useState } from "react";
    import "bootstrap/dist/css/bootstrap.min.css";
    import "../style-sheets/PriorityButtonOptions.css";
    import { BsFlagFill, BsFlag, BsCheck } from "react-icons/bs";

    const PriorityButtonOptions = () => {

      const [priorityButton, setPriorityButton] = useState(false);
      const [selectedOption, setSelectedOption] = useState("");

      const toggleOpciones = () => {
        setPriorityButton(!priorityButton);
      };

      const handleOpcionClick = (option: React.SetStateAction<string>) => {
        setSelectedOption(option);
        setPriorityButton(false);
        console.log(`selected option: ${option}`);
      };

      return (
        <div className="priority-options">
          <button className="priority-button-main" onClick={toggleOpciones}>
            {selectedOption ? (
              <>
                {selectedOption === "P1" && (
                  <>
                    <BsFlagFill className="flag-red" />&nbsp; P1
                  </>
                )}
                {selectedOption === "P2" && (
                 <>

                    <BsFlagFill className="flag-orange" />&nbsp; P2

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
              "Prioridad"
            )}
          </button>
          {priorityButton && (
            <div className="etc-options-priority">
              <button
                onClick={() => handleOpcionClick("P1")}
                className="priority-option"
              >
                <BsFlagFill className="flag-red" />
                Prioridad 1
                {selectedOption === "P1" && <BsCheck className="nike" />}
              </button>
              <button
                onClick={() => handleOpcionClick("P2")}
                className="priority-option"
              >
                <BsFlagFill className="flag-orange" />
                Prioridad 2
                {selectedOption === "P2" && <BsCheck className="nike" />}
              </button>
              <button
                onClick={() => handleOpcionClick("P3")}
                className="priority-option"
              >
                <BsFlagFill className="flag-blue" />
                Prioridad 3
                {selectedOption === "P3" && <BsCheck className="nike" />}
              </button>
              <button
                onClick={() => handleOpcionClick("P4")}
                className="priority-option"
              >
                <BsFlag />
                Prioridad 4
                {selectedOption === "P4" && <BsCheck className="nike" />}
              </button>
            </div>
          )}
        </div>
      );
    };

    export default PriorityButtonOptions;


*/


/*  ---> PRIMERA SOLUCION <----



function PriorityButtonOptions() {
  const [type, setType] = useState("1");
  return (
    <div className="button-priority">
      <Form.Group controlId="formBasicSelect">
        <Form.Control
          as="select"
          value={type}
          onChange={e => {
            console.log("e.target.value", e.target.value);
            setType(e.target.value);
          }}
        >
          <option value="1"><BsFlagFill/>Prioridad 1</option> 
          <option value="2"><BsFlagFill/>Prioridad 2</option>
          <option value="3"><BsFlagFill/>Prioridad 3</option> 
          <option value="4"><BsFlag/>Prioridad 4</option> 
        </Form.Control> 
      </Form.Group> 
    </div> 
  ); 
}
  
  export default PriorityButtonOptions;*/


