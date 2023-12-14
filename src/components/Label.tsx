
import React, { useState, useEffect, useRef } from 'react';
import { FiTag } from "react-icons/fi";
import "../style-sheets/Label.css" 
  
const Label = () => {
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
      <button className='etc-button-last' onClick={toggleOpciones}>Etiqueta&nbsp;&nbsp;@
      </button>
      {showOptions && (
        <div className='etc-options'>
          <button onClick={() => handleOpcionClick('gym')}>
            <div className='bstag-in'><FiTag className='icon-etc'/></div>
            <div className='text-a'>Gym</div>
         </button>
          <button className='button-start' onClick={() => handleOpcionClick('home')}>
            <div className='tbpuzzle'>&nbsp;<FiTag className='icon-etc'/></div>
            Hogar
          </button>
           <button className='color-text' onClick={() => handleOpcionClick('job')}>
           <div className='tbpuzzle'>&nbsp;<FiTag className='icon-etc'/></div>
            Trabajo
          </button>
        </div>
      )}
    </div>
  );
};

export default Label;
    