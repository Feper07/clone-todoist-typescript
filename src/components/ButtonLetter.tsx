
import React, { useState } from 'react';
import '../style-sheets/ButtonLetter.css';
import CalendarD from './CalendarD';
import PriorityButtonOptions from './PriorityButtonOptions';
import ReminderButton from './ReminderButton';
import EtcButtonOptions from './EtcButtonOptions';
import LastButton from './LastButton';
import { HiOutlineCheckCircle } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";


const ButtonLetter = () => {
  const [nameTask, setNameTask] = useState('');
  const [descriptionTask, setDescriptionTask] = useState('');
  const [textAdd, setTextAdd] = useState<string[]>([]);

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNameTask(event.target.value);
  };
  
  const handleAddTask = () => {
    if (nameTask.trim() !== '') {
      const task = `${nameTask}${descriptionTask.trim() !== '' ? ` - ${descriptionTask}` : ''}`;
      setTextAdd([...textAdd, task]);
      setNameTask('');
      setDescriptionTask('');
    }
  };

  const handleRemoveTask = (index: number) => {
    const updatedTextAdd = textAdd.filter((_, i) => i !== index);
    setTextAdd(updatedTextAdd);
  };

  const isButtonActive = nameTask.trim() !== '';

  return (
    <div className="ButtonLetter-main">
      <div className="text-task-buttonletter">
        {textAdd.map((text, index) => (
          <div key={index} className="task-item">
              <button className="remove-button" onClick={() => handleRemoveTask(index)}><HiCheck className='remove-icon'/></button>
              &nbsp;&nbsp;{text}
              <div className='Description-task-item'></div>
          </div>
        ))}
      </div>
      <div>
        <input
          className="input-calendar-a"
          type="text"
          placeholder="  Nombre de la tarea"
          onChange={handleInputChange}
          value={nameTask}
        />
      </div>
      <div>
        <input className="input-calendar-b" type="text" placeholder="  Descripción" />
      </div>
      <div className="description-new-task">
        <div className="one-calendar"><CalendarD/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="one-priority"><PriorityButtonOptions/></div> &nbsp;
        <div className="one-reminder"><ReminderButton/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="one-etc"><EtcButtonOptions/></div>
      </div>
      <div className="last-part-description">
        <div><LastButton/></div>
        <div className="last-part-tow-button">
          <button className="last-button-a">Cancelar</button>&nbsp;&nbsp;
          <button
            disabled={!isButtonActive}
            className={isButtonActive ? "last-button-b" : "last-button-b-disabled"}
            onClick={handleAddTask}
          >
            Añadir Tarea
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonLetter;


/*  ---> CUARTA SOLUCION <----

- Debo crear un objeto para que se pueda mostrar tambien la descripcion, fecha seleccionada...


import React, { useState } from 'react';
import '../style-sheets/ButtonLetter.css';
import CalendarD from './CalendarD';
import PriorityButtonOptions from './PriorityButtonOptions';
import ReminderButton from './ReminderButton';
import EtcButtonOptions from './EtcButtonOptions';
import LastButton from './LastButton';
import { HiOutlineCheckCircle } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";


const ButtonLetter = () => {
  const [nameTask, setNameTask] = useState('');
  const [descriptionTask, setDescriptionTask] = useState('');
  const [textAdd, setTextAdd] = useState<string[]>([]);

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNameTask(event.target.value);
  };
  
  const handleAddTask = () => {
    if (nameTask.trim() !== '') {
      const task = `${nameTask}${descriptionTask.trim() !== '' ? ` - ${descriptionTask}` : ''}`;
      setTextAdd([...textAdd, task]);
      setNameTask('');
      setDescriptionTask('');
    }
  };

  const handleRemoveTask = (index: number) => {
    const updatedTextAdd = textAdd.filter((_, i) => i !== index);
    setTextAdd(updatedTextAdd);
  };

  const isButtonActive = nameTask.trim() !== '';

  return (
    <div className="ButtonLetter-main">
      <div className="text-task-buttonletter">
        {textAdd.map((text, index) => (
          <div key={index} className="task-item">
              <button className="remove-button" onClick={() => handleRemoveTask(index)}><HiCheck className='remove-icon'/></button>
              &nbsp;&nbsp;{text}
          </div>
        ))}
      </div>
      <div>
        <input
          className="input-calendar-a"
          type="text"
          placeholder="  Nombre de la tarea"
          onChange={handleInputChange}
          value={nameTask}
        />
      </div>
      <div>
        <input className="input-calendar-b" type="text" placeholder="  Descripción" />
      </div>
      <div className="description-new-task">
        <div className="one-calendar"><CalendarD/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="one-priority"><PriorityButtonOptions/></div> &nbsp;
        <div className="one-reminder"><ReminderButton/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="one-etc"><EtcButtonOptions/></div>
      </div>
      <div className="last-part-description">
        <div><LastButton/></div>
        <div className="last-part-tow-button">
          <button className="last-button-a">Cancelar</button>&nbsp;&nbsp;
          <button
            disabled={!isButtonActive}
            className={isButtonActive ? "last-button-b" : "last-button-b-disabled"}
            onClick={handleAddTask}
          >
            Añadir Tarea
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonLetter;



*/

/*  ---> TERCERA SOLUCION <----

import React from 'react';
import "../style-sheets/ButtonLetter.css";
import CalendarD from './CalendarD';
import PriorityButtonOptions from './PriorityButtonOptions';
import ReminderButton from './ReminderButton';
import EtcButtonOptions from './EtcButtonOptions';
import LastButton from './LastButton';

const ButtonLetter = () => {
  const [nombreTarea, setNombreTarea] = React.useState('');
  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNombreTarea(event.target.value);

  };
  let isButtonActive = nombreTarea.trim()!='';

  return (
    <div className="ButtonLetter-main">
      <div><input
        className="input-calendar-a"
        type="text"
        placeholder="Nombre de la tarea"
        onChange={handleInputChange}
        value={nombreTarea}
      ></input></div>
      <div><input className="input-calendar-b" type="text" placeholder="Descripción"></input></div>
      <div className="description-new-task">
        <div className="one-calendar"><CalendarD/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="one-priority"><PriorityButtonOptions/></div> &nbsp;
        <div className="one-reminder"><ReminderButton/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="one-etc"><EtcButtonOptions/></div>
      </div>       
      <div className="last-part-description">
        <div><LastButton/></div>
        <div className="last-part-tow-button">
          <button className="last-button-a">Cancelar</button>&nbsp;&nbsp;
          <button
            disabled={!isButtonActive}
            className={isButtonActive ? "last-button-b" : "last-button-b-disabled"}
            onClick={() => {}}
          >Añadir Tarea</button>
        </div>
      </div>
    </div>
  );
};

export default ButtonLetter;

*/


/* --> SEGUNDA SOLUCION <--

import React from 'react';
import "../style-sheets/ButtonLetter.css";
import CalendarD from './CalendarD';
import PriorityButtonOptions from './PriorityButtonOptions';
import ReminderButton from './ReminderButton';
import EtcButtonOptions from './EtcButtonOptions';
import LastButton from './LastButton';

const ButtonLetter = () => {
  const [nombreTarea, setNombreTarea] = React.useState('');
  const [activarBoton, setActivarBoton] = React.useState(false);

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNombreTarea(event.target.value);
    if (nombreTarea.length > 0) {
      setActivarBoton(true);
    } else {
      setActivarBoton(false);
    }
  };

  return (
    <div className="ButtonLetter-main">
      <div><input
        className="input-calendar-a"
        type="text"
        placeholder="Nombre de la tarea"
        onChange={handleInputChange}
        value={nombreTarea}
      ></input></div>
      <div><input className="input-calendar-b" type="text" placeholder="Descripción"></input></div>
      <div className="description-new-task">
        <div className="one-calendar"><CalendarD/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="one-priority"><PriorityButtonOptions/></div> &nbsp;
        <div className="one-reminder"><ReminderButton/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="one-etc"><EtcButtonOptions/></div>
      </div>       
      <div className="last-part-description">
        <div><LastButton/></div>
        <div className="last-part-tow-button">
          <button className="last-button-a" onClick={() => setActivarBoton(false)}>Cancelar</button>&nbsp;&nbsp;
          <button
            className={activarBoton ? "last-button-b" : "last-button-b-disabled"}
            onClick={() => {}}
          >Añadir Tarea</button>
        </div>
      </div>
    </div>
  );
};

export default ButtonLetter;    */


/*   ---> PRIMERA SOLUCION  <----

import React from 'react'; 
import "../style-sheets/ButtonLetter.css" 
import CalendarD from './CalendarD';
import PriorityButtonOptions from './PriorityButtonOptions';
import ReminderButton from './ReminderButton';
import EtcButtonOptions from './EtcButtonOptions';
import LastButton from './LastButton';

function ButtonLetter() { 
  return ( 
    <div className="ButtonLetter-main"> 
                    <div><input className='input-calendar-a' type='text' placeholder='Nombre de la tarea'></input></div>
                    <div><input className='input-calendar-b' type='text' placeholder='Descripción'></input></div>
                    <div className='description-new-task'>
                      <div className='one-calendar'><CalendarD/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <div className='one-priority'><PriorityButtonOptions/></div> &nbsp;
                      <div className='one-reminder'><ReminderButton/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <div className='one-etc'><EtcButtonOptions/></div>
                    </div>       
                    <div className='last-part-description'>
                      <div><LastButton/></div>
                      <div className='last-part-tow-button'>
                        <button className='last-button-a'>Cancelar</button>&nbsp;&nbsp;
                        <button className='last-button-b'>Añadir Tarea</button>
                      </div>
                    </div>
    </div> 
  ); 
}  
  
export default ButtonLetter;    */