
import React, { useState } from 'react';
import '../style-sheets/ButtonLetter.css';
import CalendarD from './CalendarD';
import PriorityButtonOptions from './PriorityButtonOptions';
import ReminderButton from './ReminderButton';
import EtcButtonOptions from './EtcButtonOptions';
import ButtonLabels from './ButtonLabels';
import { Priority, Task } from '../typos';
import { id } from 'date-fns/locale';
import TaskList from './TaskList';
import { v4 as uuidv4 } from 'uuid';

////
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

interface ButtonLetterProps{
  tareas:Task[],
  addTask:(task: Task)=>void,
  removeTask: (id:string)=>void,
  toggleTask:  (id:string)=>void,
}

const ButtonLetter = (props: ButtonLetterProps) => {
  
  const [task, setTask] = useState<Task>({
    name: "", 
    description:"", 
    id:"", 
    done: false, 
    completed: false
  });
  
  const [selectedOption, setSelectedOption] = useState<string>(""); // New status for the selected option. ButtonLabel
  const [showSelectedOption, setShowSelectedOption] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set()); // Store multiple selected labels

  // Nuevo estado para almacenar las etiquetas ingresadas
  const [inputTags, setInputTags] = useState<Set<string>>(new Set(["gym", "trabajo"]));

  const getTags = (text: string): Set<string> => {
    const words = text.split(/\s+/); // Separate words by spaces
  
    const updatedOptions: string[] = [];  
    words.forEach(word => {
      if (word.startsWith('@') && word.length >= 3) { // Check if "@" has additional text
        updatedOptions.push(word.substring(1)); // Extract label without "@"
      }
    });
    return  new Set(updatedOptions)
  };
  
  // Function to handle changes to the input and extract the added tags.
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue =event.target.value;
    let updatedTask = { ...task };
  
    const words = enteredValue.split(/\s+/); // Separate words by spaces
    const updatedOptions: string[] = [];
    const tags: string[] = [];
  
    words.forEach(word => {
      if (word.startsWith('@') && word.length >= 3) { // Check if "@" has additional text
        const tag = word.substring(1); // Extract label without "@"
        updatedOptions.push(tag); // Add tag to updated options
        tags.push(word); // Track labels separately
  
        // If the tag is not already in the selectedOptions, add it
        if (!selectedOptions.has(tag)) {
          setSelectedOptions(new Set(selectedOptions).add(tag));
        }
      }
    });
  
    updatedTask.name = enteredValue;
  
    setSelectedOptions(new Set(updatedOptions)); // Set detected labels as selected tags
    //setInputTags(new Set(tags)); // Update inputTags with the entered tags
    setTask(updatedTask);
  };
  
  // Function to handle changes in the description  
  const handleDescriptionChange= (event: { target: { value: string } }) => {
     // const etiqueta = sacar_etiquetas(value)
     // for i in etiquea{ selected.add(i)}

    setTask({...task, ...{description:event.target.value }})
  };

  // Function to handle changes in priority  
  const handlePriorityChange = (priority: string) => {
    setTask({...task, ...{priority: priority as Priority }})
  };

  // Function to handle changes in due date  
  const handleDueDateChange= (date: Date) => {
    setTask({...task, ...{due_date: date }})
  };
  
  // Function to add a task  
  const handleAddTask = () => {
    let combinedName = task.name.trim();
  
    if (showSelectedOption && selectedOptions.size > 0) {
      const selectedTags = Array.from(selectedOptions).map(option => `@${option}`).join(' ');
      combinedName = `${selectedTags} ${combinedName}`;
    } else if (showSelectedOption && selectedOption.trim() !== '') {
      combinedName = `@${selectedOption} ${combinedName}`;
    }
  
    if (combinedName !== '') {
      const newTask = {
        ...task,
        ...{ name: combinedName.trim() } // Remove whitespace around name
      };
  
      props.addTask({ ...newTask, id: uuidv4() }); // Add the task with all labels selected
      setTask({ name: '', description: '', id: '', done: false, completed: false }); // Clear fields after adding task
      setSelectedOption('');
      setShowSelectedOption(false);
      setSelectedOptions(new Set()); // Clear selected tags after adding task
      //setInputTags(new Set()); //Clear the tags entered after adding the task
    }
  };

  // Function to remove a task  
  const handleRemoveTask = (index: number) => {    
    props.removeTask(props.tareas[index].id);
  };

// Function to handle update of selected option in ButtonLabels
const handleOptionChange = (options: Set<string>) => {
  setSelectedOptions(options);
  
  // Eliminar etiquetas seleccionadas del input
  const updatedName = eliminarEtiquetasSeleccionadas(options, task.name);
  setTask({ ...task, name: updatedName });
};

  // Function to add a task with its details  
  const addTask = (newTask: Task) => {
    if (newTask.name.trim() !== '') {
      const taskWithId = { ...newTask, id: uuidv4()  }; // Assign a unique ID as a string
      props.addTask(taskWithId);
      setTask({ name: '', description: '', id: '', done: false, completed: false }); // Clear fields after adding task
    }
  };
  
  const isButtonActive = task.name.trim() !== '';

  // Function to format due dat  
  function formatDueDate(dueDate: Date | string | undefined): string | null {
    if (!dueDate) {
      return null;
    }
  
    const dateObject = dueDate instanceof Date ? dueDate : new Date(dueDate);
    const currentDate = new Date();
  
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayName = daysOfWeek[dateObject.getDay()];
    const dayNumber = dateObject.getDate();
    const monthName = dateObject.toLocaleString('es', { month: 'long' });
  
    if (dateObject.getFullYear() !== currentDate.getFullYear()) {
      return `${dayNumber} de ${monthName} de ${dateObject.getFullYear()}`;
    } else if (dateObject.getMonth() !== currentDate.getMonth()) {
      return `${dayNumber} de ${monthName}`;
    } else {
      return `${dayName} ${dayNumber}`;
    }
  }
  console.log(inputTags, "inputTag");
  // Function to get due date color  
  function getDueDateColor(dueDate: Date | string | undefined): string {
    if (!dueDate) {
      return ''; // No color
    }
  
    const dateObject = dueDate instanceof Date ? dueDate : new Date(dueDate);
  
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
   
    // Get tomor row's date
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
  let non_text_tags = Array.from(selectedOptions).filter(option=>
    !getTags(task.name).has(option)
  );

///

const eliminarEtiquetasSeleccionadas = (etiquetas: Set<string>, texto: string): string => {
  let nueva_cadena = [];
  for(let palabra of texto.split(" ")){  
  if(palabra.startsWith("@")){
      if(etiquetas.has(palabra.substring(1))){
        nueva_cadena.push(palabra) 
      }
    }else{
      nueva_cadena.push(palabra) 
    }
  } 
  return nueva_cadena.join(" ")

  /*
  
  let nuevaCadena = texto;
  etiquetas.forEach(etiqueta => {
    nuevaCadena = nuevaCadena.replace(new RegExp(`@${etiqueta}\\b`, 'g'), ''); // Eliminar etiqueta del texto
  });
  return nuevaCadena.trim();*/
};
  
  return (
    <div className="ButtonLetter-main">
      <div>
        <input
          className="input-calendar-a"
          type="text" 
          placeholder="  Nombre de la tarea"
          onChange={handleInputChange}
          onBlur={()=>{
            let tags = Array.from(getTags(task.name)).map((x)=>x.toLowerCase());
            setInputTags(new Set([...Array.from(inputTags), ...Array.from(tags)]));
          }}
          value={ 
            non_text_tags.length > 0 ? `${non_text_tags.map((option) => `@${option}`).join(' ')} ${task.name}` : task.name }
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
        <div><ButtonLabels selectedOptions={selectedOptions} onOptionChange={handleOptionChange} inputTags={inputTags}/> {/* Pasar la función como prop */}</div>
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
      <TaskList tareas={props.tareas.filter((tarea)=>tarea.done==false)} removeTask={props.removeTask} toggleTask={props.toggleTask}></TaskList>      
    </div>
  );
};

export default ButtonLetter;


/* actualizar input de buttonLetter 

const handleOptionChange = (options: Set<string>) => {
  setSelectedOptions(options);
  
  // Limpiar las etiquetas seleccionadas si el conjunto de opciones está vacío
  if (options.size === 0) {
    setTask({ ...task, name: task.name.replace(/@\w+\s?/g, '') });
  }
};
*/


/*
No reconoce las etiquetas cuando la palabra inicia con @, a menos de que hayan 5 letras

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value;
    let updatedTask = { ...task };
  
    const words = enteredValue.split(/\s+/); // Separar las palabras por espacios
  
    const updatedOptions: string[] = [];
    const tags: string[] = [];
  
    words.forEach(word => {
      if (word.startsWith('@') && word.length >= 6) { // Comprobar si "@" tiene texto adicional
        updatedOptions.push(word.substring(1)); // Extraer la etiqueta sin "@"
        tags.push(word); // Rastrear las etiquetas por separado
      }
    });
  
    if (tags.length > 0) {
      const textWithoutTags = words.filter(word => !tags.includes(word)).join(' '); // Excluir las etiquetas del texto
      updatedTask.name = textWithoutTags;
    } else {
      updatedTask.name = enteredValue;
    }
  
    setSelectedOptions(updatedOptions); // Establecer las etiquetas detectadas como las etiquetas seleccionadas
    setTask(updatedTask);
  };

*/



/*function uuidv4() {
  throw new Error('Function not implemented.');
}*/
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