
import React, { useState } from 'react';
import '../style-sheets/ButtonLetter.css';
import CalendarD from './CalendarD';
import PriorityButtonOptions from './PriorityButtonOptions';
import ReminderButton from './ReminderButton';
import EtcButtonOptions from './EtcButtonOptions';
import LastButton from './LastButton';
import { HiOutlineCheckCircle } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";

enum Priority{
  Priority1 = "P1",
  Priority2 = "P2",
  Priority3 = "P3",
  Priority4 = "P4",
}

function get_class(p: Priority):string {
   switch (p) {
    case Priority.Priority1:
      return "remove-button-priority1"
    case Priority.Priority2:
      return "remove-button-priority2"
    case Priority.Priority3:
      return "remove-button-priority3"
    case Priority.Priority4:
      return "remove-button-priority4"
   }
}

interface Task{
  name: string,
  description: string,
  priority?: Priority,
  due_date?: Date
}

const ButtonLetter = () => {
  const [task, setTask] = useState<Task>({name: "", description:""});
  const [textAdd, setTextAdd] = useState<Task[]>([]);

  const handleInputChange = (event: { target: { value: string } }) => {
    setTask({...task, ...{name:event.target.value }})
  };

  const handleDescriptionChange= (event: { target: { value: string } }) => {
    setTask({...task, ...{description:event.target.value }})
  };

  const handlePriorityChange = (priority: string) => {
    setTask({...task, ...{priority: priority as Priority }})
  };

  const handleDueDateChange= (date: Date) => {
    setTask({...task, ...{due_date: date }})
  };

  const handleAddTask = () => {
    if (task.name.trim() !== '') {
      setTextAdd(textAdd.concat([task]));
      setTask({name: "", description:""});
    }
  };

  const handleRemoveTask = (index: number) => {
    const updatedTextAdd = textAdd.filter((_, i) => i !== index);
    setTextAdd(updatedTextAdd);
  };

  const isButtonActive = task.name.trim() !== '';

  function formatDueDate(dueDate: Date | string | undefined): string | null {
    if (!dueDate) {
      return null;
    }
  
    const dateObject = dueDate instanceof Date ? dueDate : new Date(dueDate);
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayName = daysOfWeek[dateObject.getDay()];
    const dayNumber = dateObject.getDate();
  
    return `${dayName} ${dayNumber}`;
  }
  
  function getDueDateColor(dueDate: Date | string | undefined): string {
    if (!dueDate) {
      return ''; // No color
    }
  
    const dateObject = dueDate instanceof Date ? dueDate : new Date(dueDate);
  
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    // Get tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    if (dateObject.toDateString() === today.toDateString()) {
      return 'purple'; // Today
    } else if (dateObject.toDateString() === tomorrow.toDateString()) {
      return 'orange'; // Tomorrow
    } else if (dateObject.getDay() === 0) {
      return 'green'; // Sunday
    } else {
      return ''; // Default color
    }
  }
  

  return (
    <div className="ButtonLetter-main">
      <div className="text-task-buttonletter">
        {textAdd.map((text, index) => (
          <div key={index} className="task-item">
              <div className='component-remove-button'> 
                <button className={(["remove-button", text.priority?get_class(text.priority): ""].join(" "))} onClick={() => handleRemoveTask(index)}>
                  <HiCheck className={"remove-icon"} /></button>
              </div>
              &nbsp;&nbsp;&nbsp;
              <div className='date-name-selected'>
                {text.name}
                <p>{text.description}</p>
                {text.due_date ? (
                  <p style={{ color: getDueDateColor(text.due_date) }}>
                    {formatDueDate(text.due_date)}
                  </p>
                ) : null}
              </div>
          </div>
        ))}
      </div>
      
      <div>
        <input
          className="input-calendar-a"
          type="text" 
          placeholder="  Nombre de la tarea"
          onChange={handleInputChange}
          value={task.name}
        />
      </div>
      <div>
        <input onChange={handleDescriptionChange} value={task.description} className="input-calendar-b" type="text" placeholder="  Descripción" />
      </div>
      <div className="description-new-task">
        <div className="one-calendar"><CalendarD value={task.due_date} onChange={handleDueDateChange}/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="one-priority"><PriorityButtonOptions value={task.priority} onChange={handlePriorityChange}/></div> &nbsp;
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



/*  ---> QUINTA SOLUCION <---- 

import React, { useState } from 'react';
import '../style-sheets/ButtonLetter.css';
import CalendarD from './CalendarD';
import PriorityButtonOptions from './PriorityButtonOptions';
import ReminderButton from './ReminderButton';
import EtcButtonOptions from './EtcButtonOptions';
import LastButton from './LastButton';
import { HiOutlineCheckCircle } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";

enum Priority{
  Priority1 = "P1",
  Priority2 = "P2",
  Priority3 = "P3",
  Priority4 = "P4",
}

function get_class(p: Priority):string {
   switch (p) {
    case Priority.Priority1:
      return "remove-button-priority1"
    case Priority.Priority2:
      return "remove-button-priority2"
    case Priority.Priority3:
      return "remove-button-priority3"
    case Priority.Priority4:
      return "remove-button-priority4"
   }
}

interface Task{
  name: string,
  description: string,
  priority?: Priority,
  due_date?: Date
}

const ButtonLetter = () => {
  const [task, setTask] = useState<Task>({name: "", description:""});
  const [textAdd, setTextAdd] = useState<Task[]>([]);

  const handleInputChange = (event: { target: { value: string } }) => {
    setTask({...task, ...{name:event.target.value }})
  };

  const handleDescriptionChange= (event: { target: { value: string } }) => {
    setTask({...task, ...{description:event.target.value }})
  };

  const handlePriorityChange = (priority: string) => {
    setTask({...task, ...{priority: priority as Priority }})
  };

  const handleDueDateChange= (date: Date) => {
    setTask({...task, ...{due_date: date }})
  };

  const handleAddTask = () => {
    if (task.name.trim() !== '') {
      setTextAdd(textAdd.concat([task]));
      setTask({name: "", description:""});
    }
  };

  const handleRemoveTask = (index: number) => {
    const updatedTextAdd = textAdd.filter((_, i) => i !== index);
    setTextAdd(updatedTextAdd);
  };

  const isButtonActive = task.name.trim() !== '';

  return (
    <div className="ButtonLetter-main">
      <div className="text-task-buttonletter">
        {textAdd.map((text, index) => (
          <div key={index} className="task-item">
              <button className={(["remove-button", text.priority?get_class(text.priority): ""].join(" "))} onClick={() => handleRemoveTask(index)}>
                <HiCheck className={"remove-icon"} /></button>
              &nbsp;&nbsp;&nbsp;
              <div className='date-name-selected'>
                {text.name}
                <p>{text.description}</p>
                {text.due_date?<p>{text.due_date.toISOString()}</p>: null}
              </div>
          </div>
        ))}
      </div>
      
      <div>
        <input
          className="input-calendar-a"
          type="text" 
          placeholder="  Nombre de la tarea"
          onChange={handleInputChange}
          value={task.name}
        />
      </div>
      <div>
        <input onChange={handleDescriptionChange} value={task.description} className="input-calendar-b" type="text" placeholder="  Descripción" />
      </div>
      <div className="description-new-task">
        <div className="one-calendar"><CalendarD value={task.due_date} onChange={handleDueDateChange}/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="one-priority"><PriorityButtonOptions value={task.priority} onChange={handlePriorityChange}/></div> &nbsp;
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