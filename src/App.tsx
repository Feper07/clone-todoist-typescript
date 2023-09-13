
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

// Component to display the "Bandeja de entrada"
function BandejaEntrada() {
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

function Hoy() {
  const fechaSeleccionada = "Fecha seleccionada :D"; // Replace with my logic to get the date

  return (

    <div className='title-plus-component-button-task'>
    <div className='title-buttons-container-main'>
      <div className='text-main-title'>
        <div className='title-buttons'>Hoy
        </div>
      </div>
      <div className='title-buttons-icon'>
        <button className='three-alternatives-icons'>&nbsp;<TbAdjustmentsHorizontal className='alternative-icon'/>&nbsp;&nbsp;Vista&nbsp;</button>&nbsp;&nbsp;
      </div>
    </div> 
    <div className='component-button-task'> 
      <div>
        <h1>Fecha de hoy</h1>
        <p>{fechaSeleccionada}</p>
      </div>
    </div>
  </div>
  );
}

// Component to display the date "próximo"

  function Proximo() {
    const proximo = "Próximo :D"; // Replace with my logic to get the date

    return (

      <div className='title-plus-component-button-task'>
      <div className='title-buttons-container-main'>
        <div className='text-main-title'>
          <div className='title-buttons'>Próximo
          </div>
        </div>
        <div className='title-buttons-icon'>
          <button className='three-alternatives-icons'>&nbsp;<TbAdjustmentsHorizontal className='alternative-icon'/>&nbsp;&nbsp;Vista&nbsp;</button>&nbsp;&nbsp;
        </div>
      </div> 
      <div className='component-button-task'> 
        <div>
          <h1>Próximo</h1>
          <p>{proximo}</p>
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
                  <TbAdjustmentsHorizontal className='alternative-icon-c'/>&nbsp;&nbsp;Próximo
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
                <Route path="/bandeja-de-entrada" element={<BandejaEntrada />} />
                <Route path="/hoy" element={<Hoy />} />
                <Route path="/proximo" element={<Proximo />} /> 
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


