import React, { useState, useEffect, useRef } from 'react';
import "../style-sheets/ReminderButton.css"
import { CiClock1 } from "react-icons/ci";

function ReminderButton() {
  const [showOptions, setShowOptions] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleOpciones = () => {
    setShowOptions(!showOptions);
  };
 
  useEffect(() => {
   
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="reminder-main" ref={containerRef}>
      <button className='button-reminder' onClick={toggleOpciones}>        
      <CiClock1 className='icon-lok' />&nbsp;&nbsp;Recordatorios&nbsp;
        <div className='pro'>PRO</div>
      </button>
        {showOptions && (
          <div className='reminder-options'>
            {/* opciones del botón */}
          </div>
        )}
    </div>
  ); 
}

export default ReminderButton;

