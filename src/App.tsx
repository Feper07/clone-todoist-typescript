import { BrowserRouter as Router, Route, Routes, Link, Outlet, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './App.css';
import EtcButtonOptions from './components/EtcButtonOptions';
import PriorityButtonOptions from './components/PriorityButtonOptions';
import ButtonLetter from './components/ButtonLetter';
import CalendarD from './components/CalendarD';
import ReminderButton from "./components/ReminderButton";
import CalendarComponent from "./components/CalendarComponent";
import TitleComponent from "./components/TitleComponent";
import ButtonLabels from "./components/ButtonLabels";
import { VscComment } from "react-icons/vsc";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { GoInbox } from "react-icons/go";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { GoKebabHorizontal } from "react-icons/go";
import { FaRegClipboard } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { Task} from "./typos";
import TaskList from './components/TaskList';
import { v4 as uuidv4 } from 'uuid';
import { BiLeaf } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface BandejaEntradaProps {
   tareas: Task[],
   addTask:(task: Task)=>void, 
   removeTask: (id:string)=>void,
   toggleTask: (id:string)=>void,
 }

 interface ModalComponentProps {
  tareas: Task[],
  addTask:(task: Task)=>void, 
  removeTask: (id:string)=>void,
  toggleTask: (id:string)=>void,
  show?: boolean | undefined;
  onHide: ()=> void,
}

// Modal component

function ModalComponent({ tareas, addTask, removeTask, toggleTask, show, onHide }: ModalComponentProps )  {

  const handleClose = () => onHide();
  
  return (
           <Modal
             show={show}
             size="xl"
             onHide={onHide}
             
             style={{ marginLeft: '10%', transform: 'translateX(-10%)' }}
            >
             <Modal.Header closeButton>
               <Modal.Title>&nbsp;&nbsp;Añadir Tarea</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                <div className='component-button-task'> 
                      <div>
                      <ButtonLetter tareas={tareas} addTask={addTask} removeTask={removeTask} toggleTask={toggleTask}/>
                      </div>
                      <div className="task-details">
                        {/* Show description and date for tasks */}
                        {tareas.map((tarea: Task, index: number) => (
                          <div key={index} className="task-item">
                        </div>
                      ))}
                    </div>
                  </div>
             </Modal.Body>
             <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
             </Modal.Footer>              
          </Modal>
  );
}

// Component to display the "Bandeja de entrada"
function BandejaEntrada({ tareas, addTask, removeTask, toggleTask }: BandejaEntradaProps )  {

  return (
        <div className='title-plus-component-button-task'>
          <div className='title-buttons-container-main'>
            <div className='text-main-title'>
              <div className='title-buttons'>Bandeja de entrada
              </div>
            </div>
            <div className='title-buttons-icon'>
              <button className='three-alternatives-icons'>&nbsp;<TbAdjustmentsHorizontal className='alternative-icon'/>&nbsp;&nbsp;Vista&nbsp;</button>&nbsp;&nbsp;
              <button className='three-alternatives-icons'>&nbsp;<VscComment className='alternative-icon'/>&nbsp;&nbsp;Comentarios&nbsp;</button>&nbsp;&nbsp;
              <button className='three-alternatives-icons'>&nbsp;<GoKebabHorizontal className='alternative-icon'/>&nbsp;</button>
            </div>
          </div> 
          <div className='component-button-task'> 
              <div>
                <ButtonLetter tareas={tareas} addTask={addTask} removeTask={removeTask} toggleTask={toggleTask}/>
              </div>
              <div className="task-details">
                {/* Show description and date for tasks */}
                {tareas.map((tarea: Task, index: number) => (
                  <div key={index} className="task-item">
                </div>
              ))}
            </div>
          </div>
        </div>
  );
}

function isToday(input: Date|string|undefined):boolean {
  if (input){
    const dateToCheck = new Date(input);
    // Get the current date
    const currentDate = new Date();

    // Compare the two dates
    return (
      dateToCheck.getDate() === currentDate.getDate() &&
      dateToCheck.getMonth() === currentDate.getMonth() &&
      dateToCheck.getFullYear() === currentDate.getFullYear()
    );
  }else{
    return false
  }
}

interface HoyProps{
   tareas: Task[], 
   removeTask:(id:string)=>void, 
   toggleTask:(id:string)=>void 
}
// Component to display the date "Hoy"

function Hoy({ tareas, removeTask, toggleTask }: HoyProps )  {
  const fechaHoy = new Date().toLocaleDateString(); // Replace with my logic to get the date
  const tareasHoy = tareas.filter((tarea) => tarea.done==false).filter((tarea) => isToday(tarea.due_date));
  return (

    <div className='title-plus-component-button-task'>
    <div className='title-buttons-container-main'>
      <div className='text-main-title'>
        <div className='title-buttons'>Hoy&nbsp;<div className="date-today-task-item">({fechaHoy})</div>
        </div>
      </div>
      <div className='title-buttons-icon'>
        <button className='three-alternatives-icons'>&nbsp;<TbAdjustmentsHorizontal className='alternative-icon'/>&nbsp;&nbsp;Vista&nbsp;</button>&nbsp;&nbsp;
      </div>
    </div> 
    <div className='component-button-task-2'> 
      <div className="pre-component-task-item">
        <h3>Tareas para Hoy</h3>
          <ul>
          <TaskList tareas={tareasHoy}  removeTask={removeTask} toggleTask={toggleTask}></TaskList>
          </ul>
      </div>
    </div>
  </div>
  );
}


function isNextSunday(input: Date | undefined) {
  if (input) {
    const dateToCheck = new Date(input)
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const daysUntilNextSunday = 7 - dayOfWeek;

    // Create a date for next Sunday
    const nextSunday = new Date(today);

    nextSunday.setDate(today.getDate() + daysUntilNextSunday);

    // Compare the date with next Sunday
    return (
      dateToCheck.getDate() === nextSunday.getDate() &&
      dateToCheck.getMonth() === nextSunday.getMonth() &&
      dateToCheck.getFullYear() === nextSunday.getFullYear()
    );
  } else {
    return false;
  }
}

interface ProximoProps{
   tareas: Task[], 
   removeTask:(id:string)=>void,
   toggleTask:(id:string)=>void,
}
// Component to display the date "próximo"

function Proximo({ tareas, removeTask, toggleTask }: ProximoProps)  {
  const hoy = new Date(); // Get today's date
  const diaSemana = hoy.getDay(); // Get the day of the week (0 = domingo, 1 = lunes, ..., 6 = sábado)

  // Calculate the difference in days until next Sunday
  const diasHastaProximoDomingo = 7 - diaSemana;

  // Create a new date for next Sunday
  const proximoDomingo = new Date(hoy);
  proximoDomingo.setDate(hoy.getDate() + diasHastaProximoDomingo);

  // Format next Sunday's date as a readable string
  const fechaProximoDomingo = proximoDomingo.toLocaleDateString();
  const tareasProximoDomingo = tareas.filter((tarea) => tarea.done==false).filter((tarea) => isNextSunday(tarea.due_date));


  return (
    <div className='title-plus-component-button-task'>
      <div className='title-buttons-container-main'>
        <div className='text-main-title'>
          <div className='title-buttons'>Próximo domingo&nbsp;<div className="date-today-task-item">({fechaProximoDomingo})</div>
          </div>
        </div>
        <div className='title-buttons-icon'>
          <button className='three-alternatives-icons'>&nbsp;<TbAdjustmentsHorizontal className='alternative-icon'/>&nbsp;&nbsp;Vista&nbsp;</button>&nbsp;&nbsp;
        </div>
      </div>
      <div className='component-button-task-2'>
        <div className="pre-component-task-item">
          <h3>Tareas para el Próximo Domingo</h3>
            <ul>
            <TaskList tareas={tareasProximoDomingo} removeTask={removeTask} toggleTask={toggleTask}></TaskList>
            </ul>
        </div>
      </div>
    </div>
  );
}

interface TareasRealizadasProps{ 
  tareas: Task[]; 
  removeTask: (id: string) => void; 
  toggleTask: (id: string) => void; 
}

  // Component to display "Tareas Realizadas", task done!

  function TareasRealizadas({ removeTask, toggleTask, tareas }:TareasRealizadasProps ) {

  return (

    <div className='title-plus-component-button-task'>
    <div className='title-buttons-container-main'>
      <div className='text-main-title'>
        <div className='title-buttons'>Tareas Realizadas
        </div>
      </div>
      <div className='title-buttons-icon'>
        <button className='three-alternatives-icons'>&nbsp;<TbAdjustmentsHorizontal className='alternative-icon'/>&nbsp;&nbsp;Vista&nbsp;</button>&nbsp;&nbsp;
      </div>
    </div> 
    <div className='component-button-task-2'> 
      <div className="pre-component-task-item">
        <h3>Tareas Realizadas</h3>
        <TaskList tareas={tareas.filter((tarea)=>tarea.done==true)} toggleTask={toggleTask} removeTask={removeTask} showDeleteButton={true}></TaskList>
      </div>
    </div>
  </div>
  );
}

  // Component to display "Filtros y etiquetas"

  function FiltrosEtiquetas() {
    const filtrosEtiquetas = "Filtros y etiquetas :D"; // Replace with my logic to get what I want to be displayed
    return (
      <div className='title-plus-component-button-task'>
      <div className='title-buttons-container-main'>
        <div className='text-main-title'>
          <div className='title-buttons'>Filtros y etiquetas
          </div>
        </div>
        <div className='title-buttons-icon'>
          <button className='three-alternatives-icons'>&nbsp;<TbAdjustmentsHorizontal className='alternative-icon'/>&nbsp;&nbsp;Vista&nbsp;</button>&nbsp;&nbsp;
        </div>
      </div> 
      <div className='component-button-task'> 
        <div>
          <h1>Filtros y etiquetas</h1>
          <p>{filtrosEtiquetas}</p>
        </div>
      </div>
    </div>
    );
  }
  
function App() {
  
  // Example: I'm gonna say that I have a list of tasks with dates in my local state
  const [tareas, setTareas] = useState<Task[]>([]);

  //Function to add a task to the task list
  const addTask = (task: Task) => {
    if (task.name.trim() !== '') {
      task.id = uuidv4(); // Generate a unique ID for the new task
      const updatedTasks = [...tareas, task];
      setTareas(updatedTasks);
      // Save updated tasks to Local Storage
      localStorage.setItem('tareas', JSON.stringify(updatedTasks));
    }
    };
    
  //Toggles the 'done' property of a task based on its current state. 
  const toggleTask = (id: string) => {
    const updatedTasks: Task[] = tareas.map((task) => {
      if (task.id === id) {
        if (task.done === true) {
          task.done = false;
        } else {
          task.done = true;
        }
      }
      return task;
    });

    setTareas(updatedTasks);
    //Save updated tasks to Local Storage
    localStorage.setItem('tareas', JSON.stringify(updatedTasks));
    }

    //Removes a task from the list and updates the state and local storage.
  const removeTask = (id: string, isDeleteButtonClicked = false) => {
    const updatedTasks: Task[] = tareas.filter((task) => task.id !== id);
    setTareas(updatedTasks);
    //Save updated tasks to Local Storage
    localStorage.setItem('tareas', JSON.stringify(updatedTasks));
   
  };
  
  //Retrieves tasks stored in local storage when the component mounts.
  useEffect(() => {
    //Recover tasks saved in Local Storage on page load
    const storedTareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    setTareas(storedTareas);
  }, []);
  

  //In order to use Modal
  const [show, setShow] = useState(false);

  //Function to close the modal by updating the state.
  const handleClose = () => setShow(false);

  //Function to show the modal by updating the state.
  const handleShow = () => setShow(true);

  return (
    <Router>
      <div className="App">
        
        <header className="App-header">
          <div className='component-title'>
            <TitleComponent/>
          </div>
          <div className='menu-plus-options'>
            <div className='container-menu-main'>
                 <button className='menu-four-alternatives-icons-a1' onClick={handleShow}
                 >
                <AiFillPlusCircle className='alternative-icon-a1'/>&nbsp;Añadir tarea
                 </button>
                 <ModalComponent tareas={[]} addTask={addTask } removeTask={removeTask} 
                  toggleTask={toggleTask} show={show} onHide={handleClose}/>
                <Link to="/bandeja-de-entrada" className="link-bandeja-entrada">
                  <button className='menu-four-alternatives-icons'>
                  &nbsp;<GoInbox className='alternative-icon-a'/>&nbsp;&nbsp;Bandeja de entrada
                 </button>
                </Link>
                <Link to="/hoy" className="link-hoy">
                  <button className='menu-four-alternatives-icons'>
                  &nbsp;<BiLeaf className='alternative-icon-hoy'/>&nbsp;&nbsp;Hoy
                  </button>
                </Link>
                  <button className='menu-four-alternatives-icons'>
                <Link to="/proximo" className="link-proximo">
                  &nbsp;<TbAdjustmentsHorizontal className='alternative-icon-c'/>&nbsp;&nbsp;Próximo domingo
                </Link>
                  </button>
                  <button className='menu-four-alternatives-icons'>
                <Link to="/tareas-realizadas" className="link-bandeja-entrada">
                  &nbsp;<FaRegCheckSquare className='alternative-icon-b'/>&nbsp;&nbsp;Tareas Realizadas
                </Link>
                  </button>
                  <button className='menu-four-alternatives-icons'>
                <Link to="/filtros-y-etiquetas" className="link-bandeja-entrada">
                  &nbsp;<HiOutlineSquares2X2 className='alternative-icon-d'/>&nbsp;&nbsp;Filtros y etiquetas
                </Link>
              </button>
              {/* Add similar links for other buttons */}
            </div>
            <div className='title-plus-component-button-task'>
              <Routes>
              <Route path="/" element={<Navigate to="/bandeja-de-entrada" />} />{/* Ruta de redirección */}
                <Route
                  path="/bandeja-de-entrada"
                  element={<BandejaEntrada tareas={tareas} addTask={addTask} removeTask={removeTask} toggleTask={toggleTask}/>}
                />
                <Route path="/hoy" element={<Hoy tareas={tareas} removeTask={removeTask} toggleTask={toggleTask}/>} />
                
                <Route path="/proximo" element={<Proximo tareas={tareas} removeTask={removeTask} toggleTask={toggleTask}/>} /> 
                
                <Route path="/tareas-realizadas" element={<TareasRealizadas toggleTask={toggleTask} tareas={tareas} removeTask={removeTask} />} />
                
                <Route path="/filtros-y-etiquetas" element={<FiltrosEtiquetas />} />
                {/* Add similar routes for other components */}
              </Routes>
            </div>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;

function setShow(arg0: boolean) {
  throw new Error("Function not implemented.");
}


/* ---> SEPTIMA SOLUCION <----



*/

/* ---> SEXTA SOLUCION <----

Esta es antes de haber utilizado React-router. Aquí la fecha seleccionada 
muestra el año y el dia, la prioridad seleccionada tambien se ve al agregar
la Tarea (Click en boton agregar tarea).

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './App.css';
import EtcButtonOptions from './components/EtcButtonOptions';
import PriorityButtonOptions from './components/PriorityButtonOptions';
import ButtonLetter from './components/ButtonLetter';
import CalendarD from './components/CalendarD';
import ReminderButton from "./components/ReminderButton";
import CalendarComponent from "./components/CalendarComponent";
import TitleComponent from "./components/TitleComponent";
import LastButton from "./components/LastButton";
import { VscComment } from "react-icons/vsc";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { GoInbox } from "react-icons/go";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { GoKebabHorizontal } from "react-icons/go";
import { FaRegClipboard } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";

  function App() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='component-title'>
            <TitleComponent/>
          </div>
          <div className='menu-plus-options'>
              <div className='container-menu-main'>
                <button className='menu-four-alternatives-icons'>&nbsp;<GoInbox className='alternative-icon-a'/>&nbsp;&nbsp;Bandeja de entrada&nbsp;</button>
                <button className='menu-four-alternatives-icons'>&nbsp;<FaRegCheckSquare className='alternative-icon-b'/>&nbsp;&nbsp;Hoy&nbsp;</button>
                <button className='menu-four-alternatives-icons'>&nbsp;<TbAdjustmentsHorizontal className='alternative-icon-c'/>&nbsp;&nbsp;Próximo&nbsp;</button>                
                <button className='menu-four-alternatives-icons'>&nbsp;<HiOutlineSquares2X2 className='alternative-icon-d'/>&nbsp;&nbsp;Filtros y etiquetas&nbsp;</button>              
              </div>
              <div className='title-plus-component-button-task'>
                <div className='title-buttons-container-main'>
                  <div className='text-main-title'>
                    <div className='title-buttons'>Bandeja de entrada
                    </div>
                  </div>
                  <div className='title-buttons-icon'>
                    <button className='three-alternatives-icons'>&nbsp;<TbAdjustmentsHorizontal className='alternative-icon'/>&nbsp;&nbsp;Vista&nbsp;</button>&nbsp;&nbsp;
                    <button className='three-alternatives-icons'>&nbsp;<VscComment className='alternative-icon'/>&nbsp;&nbsp;Comentarios&nbsp;</button>&nbsp;&nbsp;
                    <button className='three-alternatives-icons'>&nbsp;<GoKebabHorizontal className='alternative-icon'/>&nbsp;</button>
                  </div>
                </div> 
                <div className='component-button-task'> 
                    <div>
                      <ButtonLetter/>
                    </div>
                </div>
              </div>          
          </div>
        </header>
      </div>
    );
  }
  
  export default App; 

*/


/*  ---> QUINTA SOLUCION <---

import React from 'react';
import './App.css';
import EtcButtonOptions from './components/EtcButtonOptions';
import PriorityButtonOptions from './components/PriorityButtonOptions';
import ButtonLetter from './components/ButtonLetter';
import CalendarD from './components/CalendarD';
import ReminderButton from "./components/ReminderButton";
import CalendarComponent from "./components/CalendarComponent";
import TitleComponent from "./components/TitleComponent";
import LastButton from "./components/LastButton";
import { VscComment } from "react-icons/vsc";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { GoInbox } from "react-icons/go";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { GoKebabHorizontal } from "react-icons/go";
import { FaRegClipboard } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";

  function App() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='component-title'>
            <TitleComponent/>
         </div>
          <div className='menu-plus-options'>
              <div className='container-menu-main'>
                <button className='menu-four-alternatives-icons'>&nbsp;<GoInbox className='alternative-icon-a'/>&nbsp;&nbsp;Bandeja de entrada&nbsp;</button>
                <button className='menu-four-alternatives-icons'>&nbsp;<FaRegCheckSquare className='alternative-icon-b'/>&nbsp;&nbsp;Hoy&nbsp;</button>
                 <button className='menu-four-alternatives-icons'>&nbsp;<TbAdjustmentsHorizontal className='alternative-icon-c'/>&nbsp;&nbsp;Próximo&nbsp;</button>                
                <button className='menu-four-alternatives-icons'>&nbsp;<HiOutlineSquares2X2 className='alternative-icon-d'/>&nbsp;&nbsp;Filtros y etiquetas&nbsp;</button>              
              </div>
              <div className='title-plus-component-button-task'>
                <div className='title-buttons-container-main'>
                  <div className='text-main-title'>
                    <div className='title-buttons'>Bandeja de entrada
                    </div>
                  </div>
                  <div className='title-buttons-icon'>
                    <button className='three-alternatives-icons'>&nbsp;<TbAdjustmentsHorizontal className='alternative-icon'/>&nbsp;&nbsp;Vista&nbsp;</button>&nbsp;&nbsp;
                    <button className='three-alternatives-icons'>&nbsp;<VscComment className='alternative-icon'/>&nbsp;&nbsp;Comentarios&nbsp;</button>&nbsp;&nbsp;
                    <button className='three-alternatives-icons'>&nbsp;<GoKebabHorizontal className='alternative-icon'/>&nbsp;</button>
                  </div>
                </div> 
                <div className='text-task-add-complete'>
                  aqui va el texto add
                </div>
                <div className='component-button-task'> 
                    <div>
                      <ButtonLetter/>
                    </div>
                </div>
              </div>          
          </div>
        </header>
      </div>
    );
  }
  
  export default App;

*/
  
/* --> CUARTA SOLUCION <--

import React from 'react';
import './App.css';
import EtcButtonOptions from './components/EtcButtonOptions';
import PriorityButtonOptions from './components/PriorityButtonOptions';
import CalendarD from './components/CalendarD';
import ReminderButton from "./components/ReminderButton";
import CalendarComponent from "./components/CalendarComponent";
import AddTask from "./components/AddTask";

  function App() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='component-button-task'>
          <div><input className='input-calendar-a' type='text' placeholder='Nombre de la tarea'></input></div>
          <div><input className='input-calendar-b' type='text' placeholder='Descripción'></input></div>
            <div className='description-new-task'>
              <div className='one-calendar'><CalendarD/></div> 
              <div className='one-priority'><PriorityButtonOptions/></div> 
              <div className='one-reminder'><ReminderButton/></div> 
              <div className='one-etc'><EtcButtonOptions/></div>       
            </div>
          </div>
        </header>
      </div>
    );
  }
  
  export default App;
*/

  /*           TERCERA SOLUCION
  
  selectedDate={new Date()} setSelectedDate={function (value: Date): void {
              throw new Error('Function not implemented.');
            } } />

  */

  /*            SEGUNDA SOLUCION

   <CalendarD selectedDate={new Date()} />
  */


