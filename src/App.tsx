
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from "react-router-dom";
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

//Type for task list
type Tarea = { //
  titulo: string;
  fecha: string;
};

// Component to display the "Bandeja de entrada"
function BandejaEntrada({ tareas }: { tareas: Tarea[] })  {
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
                <ButtonLetter/>
              </div>
          </div>
        </div>
  
  );
}

// Component to display the date "Hoy"

function Hoy({ tareas }: { tareas: Tarea[] })  {
  const fechaHoy = new Date().toLocaleDateString(); // Replace with my logic to get the date
  const tareasHoy = tareas.filter((tarea) => tarea.fecha === fechaHoy);
 
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
    <div className='component-button-task'> 
      <div>
        <h3>Tareas</h3>
        <ul>
        {tareasHoy.map((tarea: { titulo: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
          <li key={index} className="task-item">
            {tarea.titulo}
          </li>
        ))}
      </ul>
      </div>
    </div>
  </div>
  );
}

// Component to display the date "próximo"

function Proximo({ tareas }: { tareas: Tarea[] }) {
  const hoy = new Date(); // Obtener la fecha de hoy
  const diaSemana = hoy.getDay(); // Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)

  // Calcular la diferencia de días hasta el próximo domingo
  const diasHastaProximoDomingo = 7 - diaSemana;

  // Crear una nueva fecha para el próximo domingo
  const proximoDomingo = new Date(hoy);
  proximoDomingo.setDate(hoy.getDate() + diasHastaProximoDomingo);

  // Formatear la fecha del próximo domingo como una cadena legible
  const fechaProximoDomingo = proximoDomingo.toLocaleDateString();

  const tareasProximoDomingo = tareas.filter((tarea: { fecha: string }) => tarea.fecha === fechaProximoDomingo);

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
      <div className='component-button-task'>
        <div>
          <h3>Tareas</h3>
          <ul>
            {tareasProximoDomingo.map((tarea: { titulo: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
              <li key={index} className="task-item">
                {tarea.titulo}
              </li>
            ))}
          </ul>
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
  const [tareas, setTareas] = useState<Tarea[]>([
    { titulo: "Tarea 1", fecha: "08/09/2023" },
    { titulo: "Tarea 2", fecha: "09/09/2023" },
    { titulo: "Tarea 3", fecha: "08/09/2023" },
    // ... Add more tasks with dates
  ]);

  return (
    
    <Router>
      <div className="App">
        <header className="App-header">
          <div className='component-title'>
            <TitleComponent/>
          </div>
          <div className='menu-plus-options'>
            <div className='container-menu-main'>
              <button className='menu-four-alternatives-icons'>
                <Link to="/bandeja-de-entrada" className="link-bandeja-entrada">
                  <GoInbox className='alternative-icon-a'/>&nbsp;&nbsp;Bandeja de entrada
                </Link>
              </button>
              <button className='menu-four-alternatives-icons'>
                <Link to="/hoy" className="link-hoy">
                  <FaRegCheckSquare className='alternative-icon-b'/>&nbsp;&nbsp;Hoy
                </Link>
              </button>
              <button className='menu-four-alternatives-icons'>
                <Link to="/proximo" className="link-proximo">
                  <TbAdjustmentsHorizontal className='alternative-icon-c'/>&nbsp;&nbsp;Próximo domingo
                </Link>
              </button>
              <button className='menu-four-alternatives-icons'>
                <Link to="/filtros-y-etiquetas" className="link-bandeja-entrada">
                <HiOutlineSquares2X2 className='alternative-icon-d'/>&nbsp;&nbsp;Filtros y etiquetas
                </Link>
              </button>
              {/* Add similar links for other buttons */}
            </div>
            <div className='title-plus-component-button-task'>
              <Routes>
                <Route
                  path="/bandeja-de-entrada"
                  element={<BandejaEntrada tareas={tareas} />}
                />
                <Route path="/hoy" element={<Hoy tareas={tareas}/>} />
                <Route path="/proximo" element={<Proximo tareas={tareas}/>} /> 
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


