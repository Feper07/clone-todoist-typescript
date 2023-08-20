
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


