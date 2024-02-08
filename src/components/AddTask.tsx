
    import React, { useState } from 'react';
    import "../style-sheets/AddTask.css";
    import { FiChevronRight } from "react-icons/fi";

    const AddTask = () => {
      const [showOptions, setShowOptions] = useState(false);

      const toggleOpciones = () => {
        setShowOptions(!showOptions);
      };
      
      const handleOpcionClick = (option: string) => {
        console.log(`selected option: ${option}`);
      };

      return (
        <div className='select-options'>
          <button className='etc-button-addTask' onClick={toggleOpciones}><div className='color-text-addTask'>+ Añadir hora</div></button>
          {showOptions && (
            <div className='etc-options'>
              <button className='button-addTask' onClick={() => handleOpcionClick('label')}><div className='text-a'>Hora</div><input className='input-addTask' type='text' placeholder='ej. 2pm' onClick={() => handleOpcionClick('label')}></input></button>
              <button className='button-addTask' onClick={() => handleOpcionClick('add-extension')}>&nbsp;Zona horaria&nbsp;<FiChevronRight/></button>
              <button className='button-addTask-color' onClick={() => handleOpcionClick('edit-task-actions')}>&nbsp;Cancelar<div>Cambiar</div></button>
            </div>
          )}
        </div>
      );
    };
    
    export default AddTask;


/*

import React, { useState } from 'react';
import "../style-sheets/AddTask.css";
import { FiChevronRight } from "react-icons/fi";

const AddTask = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOpciones = () => {
    setShowOptions(!showOptions);
  };

  const handleOpcionClick = (option: string) => {
    console.log(`selected option: ${option}`);
  };

  return (
    <div className='select-options'>
      <button className='etc-button-addTask' onClick={toggleOpciones}><div className='color-text'>+ Añadir hora</div></button>
      {showOptions && (
        <div className='etc-options'>
          <button className='button-addTask' onClick={() => handleOpcionClick('label')}><div className='text-a'>Hora</div><input className='input-addTask' type='text' placeholder='ej. 2pm' onClick={() => handleOpcionClick('label')}></input></button>
          <button className='button-addTask' onClick={() => handleOpcionClick('add-extension')}>&nbsp;Zona horaria&nbsp;<FiChevronRight/></button>
          <button className='button-addTask-color' onClick={() => handleOpcionClick('edit-task-actions')}>&nbsp;Cancelar<div>Cambiar</div></button>
        </div>
      )}
    </div>
  );
};

export default AddTask;

*/