import React, { useState, useEffect, useRef } from 'react';
import { GoKebabHorizontal } from "react-icons/go";
import { CiChat1, CiExport } from "react-icons/ci";
import "../style-sheets/EtcButtonOptions.css";

const EtcButtonOptions = () => {
  const [showOptions, setShowOptions] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleOpciones = () => {
    setShowOptions(!showOptions);
  };

  const handleOpcionClick = (option: string) => {
    console.log(`selected option: ${option}`);
    setShowOptions(false); // Cerrar las opciones al seleccionar una opción
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
    <div className='select-options' ref={containerRef}>
      <button className='etc-button-last' onClick={toggleOpciones}><GoKebabHorizontal/></button>
      {showOptions && (
        <div className='etc-options'>
          <button onClick={() => handleOpcionClick('label')}>
            <div className='bstag-out'>
              <div className='bstag-in'><CiChat1 className='icon-etc'/></div>
               <div className='text-a'>Etiquetas</div>
            </div>
            <div className='text-a'>@&nbsp;</div>
         </button>
          <button className='button-start' onClick={() => handleOpcionClick('add-extension')}>
            <div className='tbpuzzle'>&nbsp;<CiExport className='icon-etc'/></div>
            Añadir extensión
          </button>
           <button className='color-text' onClick={() => handleOpcionClick('edit-task-actions')}>
            &nbsp;Editar acciones de tarea
          </button>
        </div>
      )}
    </div>
  );
};

export default EtcButtonOptions;



/* ---> PRIMERA SOLUCION <---


import React, { useState } from 'react';
import { GoKebabHorizontal } from "react-icons/go";
import { CiChat1, CiExport } from "react-icons/ci";
import "../style-sheets/EtcButtonOptions.css";

const EtcButtonOptions = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOpciones = () => {
    setShowOptions(!showOptions);
  };

  const handleOpcionClick = (option: string) => {
    console.log(`selected option: ${option}`);
  };
  
  return (
    <div className='select-options'>
      <button className='etc-button-last' onClick={toggleOpciones}><GoKebabHorizontal/></button>
      {showOptions && (
        <div className='etc-options'>
          <button  onClick={() => handleOpcionClick('label')}><div className='bstag-out'><div className='bstag-in'><CiChat1 className='icon-etc'/></div><div className='text-a'>Etiquetas</div></div><div className='text-a'>@&nbsp;</div></button>
          <button className='button-start' onClick={() => handleOpcionClick('add-extension')}><div className='tbpuzzle'>&nbsp;<CiExport className='icon-etc'/></div>Añadir extensión</button>
          <button className='color-text' onClick={() => ('edit-task-actions')}>&nbsp;Editar acciones de tarea</button>
        </div>
      )}
    </div>
  );
};

export default EtcButtonOptions;


*/