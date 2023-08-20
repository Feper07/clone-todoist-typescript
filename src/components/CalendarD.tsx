  import React, { useState, useEffect, useRef } from 'react';
  import "../style-sheets/CalendarD.css";
  import CalendarComponent from './CalendarComponent';
  import { CiCalendar } from "react-icons/ci";
  import AddTask from './AddTask';
  import { BsSlashCircle } from "react-icons/bs";
  import { CiCalendarDate, CiCloudOn, CiLight } from "react-icons/ci";

    function CalendarD() {
      const [showOptions, setShowOptions] = useState(false);
      const [selectedDate, setSelectedDate] = useState<Date | null>(null);
      const [todayDate, setTodayDate] = useState<Date>(new Date());

      const [tomorrowDate, setTomorrowDate] = useState<Date>(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
      });

      const [nextSaturdayDate, setNextSaturdayDate] = useState<Date>(() => {
        const today = new Date();
        const nextSaturday = new Date(today);
        nextSaturday.setDate(today.getDate() + ((6 - today.getDay() + 1) % 7));
        return nextSaturday;
      });

      const containerRef = useRef<HTMLDivElement | null>(null);

      const toggleOpciones = () => {
        setShowOptions(!showOptions);
      };

      const handleOpcionClick = (option: string) => {
        console.log(`selected option: ${option}`);
        if (option === "today") {
          setSelectedDate(todayDate);
        } else if (option === "tomorrow") {
          setSelectedDate(tomorrowDate);
        } else if (option === "nextSaturday") {
          setSelectedDate(nextSaturdayDate);
        }
        if (option !== 'edit-task-actions') {
          toggleOpciones(); // Cerrar las opciones después de seleccionar una fecha
        }
      };

      const handleDateSelected = (date: Date) => {
        setSelectedDate(date);
        toggleOpciones(); // Cerrar las opciones después de seleccionar una fecha
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
          <button className='etc-button-calendar' onClick={toggleOpciones}>
            <CiCalendar className='icon-cicalendar' />&nbsp;&nbsp;{selectedDate ? selectedDate.toLocaleDateString('es', { weekday: 'short', day: 'numeric', month: 'long' }) : 'Fecha de vencimiento'}
            &nbsp;&nbsp;</button>
          {showOptions && (
            <div className='etc-options'>
              <button className='now'>&nbsp;{selectedDate ? selectedDate.toLocaleDateString() : 'Fecha seleccionada en el calendario'}</button>

              <button onClick={() => handleOpcionClick("today")}>
                <div className='span-text'>
                  <CiCalendarDate className='hoy' />&nbsp;&nbsp;&nbsp;Hoy
                </div>
              </button> 
              
             <button onClick={() => handleOpcionClick("tomorrow")}>
                <div className='span-text'><CiCloudOn className='mañana'/>&nbsp;&nbsp;&nbsp;Mañana</div>
                <div className='day-tomorrow'>{`${tomorrowDate.toLocaleDateString('es', { weekday: 'short' }).toUpperCase()} ${tomorrowDate.getDate()}`}&nbsp;</div>
              </button>

              <button onClick={() => ("nextSaturday")}>
                <div className='span-text'><CiLight className='fds' />&nbsp;&nbsp;Próximo domingo</div>
                <div className='day-fdhandleOpcionClicks'>{`${nextSaturdayDate.toLocaleDateString('es', { weekday: 'short' }).toUpperCase()} ${nextSaturdayDate.getDate()}`}&nbsp;</div>
              </button>

              <button className='button-start'>&nbsp;<BsSlashCircle className='not-date'/><div className='span-text'>&nbsp;&nbsp;&nbsp;Sin fecha</div></button>

              <button className='component-calendar-center' onClick={() => handleOpcionClick('add-extension')}>
                <CalendarComponent selectedDateShow={selectedDate} onDateSelected={handleDateSelected} />
              </button>

              <button className='color-text' onClick={() => handleOpcionClick('edit-task-actions')}>
                <AddTask /> 
              </button>
            </div>
          )}
        </div>
      );
    }
    
    export default CalendarD;



/* ----> SEXTA SOLUCION <----

Se actualiza el calendario, en la siguiente se ocultan las opciones al hacer click

import React, { useState } from 'react';
import "../style-sheets/CalendarD.css";
import CalendarComponent from './CalendarComponent';
import { CiCalendar } from "react-icons/ci";
import AddTask from './AddTask';
import { BsSlashCircle } from "react-icons/bs";
import { CiCalendarDate, CiCloudOn, CiLight } from "react-icons/ci";

function CalendarD() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [todayDate, setTodayDate] = useState<Date>(new Date());

  const [tomorrowDate, setTomorrowDate] = useState<Date>(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const [nextSaturdayDate, setNextSaturdayDate] = useState<Date>(() => {
    const today = new Date();
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + ((6 - today.getDay() + 1) % 7));
    return nextSaturday;
  });

  const toggleOpciones = () => {
    setShowOptions(!showOptions);
  };

  const handleOpcionClick = (option: string) => {
    console.log(`selected option: ${option}`);
    if (option === "today") {
      setSelectedDate(todayDate);
    } else if (option === "tomorrow") {
      setSelectedDate(tomorrowDate);
    } else if (option === "nextSaturday") {
      setSelectedDate(nextSaturdayDate);
    }
    if (option !== 'edit-task-actions') {
      toggleOpciones(); // Cerrar las opciones después de seleccionar una fecha
    }
  };

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    toggleOpciones(); // Cerrar las opciones después de seleccionar una fecha
  };

  return (
    <div className='select-options'>
      <button className='etc-button-calendar' onClick={toggleOpciones}>
        <CiCalendar className='icon-cicalendar' />&nbsp;&nbsp;{selectedDate ? selectedDate.toLocaleDateString('es', { weekday: 'short', day: 'numeric', month: 'long' }) : 'Fecha de vencimiento'}
      </button>
      {showOptions && (
        <div className='etc-options'>
          <button className='now'>&nbsp;{selectedDate ? selectedDate.toLocaleDateString() : 'Fecha seleccionada en el calendario'}</button>

          <button onClick={() => handleOpcionClick("today")}>
            <div className='span-text'>
              <CiCalendarDate className='hoy' />&nbsp;&nbsp;&nbsp;Hoy
            </div>
            <div className='day-today'>
              {`${todayDate.toLocaleDateString('es', { weekday: 'short' }).toUpperCase()} ${todayDate.getDate()}`}
            </div>
          </button>

          <button onClick={() => handleOpcionClick("tomorrow")}>
            <div className='span-text'><CiCloudOn className='mañana' />&nbsp;&nbsp;&nbsp;Mañana</div>
            <div className='day-tomorrow'>{`${tomorrowDate.toLocaleDateString('es', { weekday: 'short' }).toUpperCase()} ${tomorrowDate.getDate()}`}&nbsp;</div>
          </button>

          <button onClick={() => handleOpcionClick("nextSaturday")}>
            <div className='span-text'><CiLight className='fds' />&nbsp;&nbsp;Próximo fin de semana</div>
            <div className='day-fds'>{`${nextSaturdayDate.toLocaleDateString('es', { weekday: 'short' }).toUpperCase()} ${nextSaturdayDate.getDate()}`}&nbsp;</div>
          </button>

          <button className='button-start'>&nbsp;<BsSlashCircle className='not-date' /><div className='span-text'>&nbsp;&nbsp;&nbsp;Sin fecha</div></button>

          <button className='component-calendar-center' onClick={() => handleOpcionClick('add-extension')}>
            <CalendarComponent selectedDateShow={selectedDate} onDateSelected={handleDateSelected} />
          </button>

          <button className='color-text' onClick={() => handleOpcionClick('edit-task-actions')}>
            <AddTask />
          </button>
        </div>
      )}
    </div>
  );
}

export default CalendarD;

*/



/*    ----> QUINTA SOLUCION <----


    import React, { useState } from 'react';
    import "../style-sheets/CalendarD.css";
    import CalendarComponent from './CalendarComponent';
    import { CiCalendar } from "react-icons/ci";
    import AddTask from './AddTask';
    import { BsSlashCircle } from "react-icons/bs";
    import { CiCalendarDate, CiCloudOn, CiLight } from "react-icons/ci";

    function CalendarD() {
      const [showOptions, setShowOptions] = useState(false);
      const [selectedDate, setSelectedDate] = useState<Date | null>(null);
      const [todayDate, setTodayDate] = useState<Date>(new Date());

      const [tomorrowDate, setTomorrowDate] = useState<Date>(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
      });

      const [nextSaturdayDate, setNextSaturdayDate] = useState<Date>(() => {
        const today = new Date();
        const nextSaturday = new Date(today);
        nextSaturday.setDate(today.getDate() + ((6 - today.getDay() + 1) % 7));
        return nextSaturday;
      });

      const toggleOpciones = () => {
        setShowOptions(!showOptions);
      };

      const handleOpcionClick = (option: string) => {
        console.log(`selected option: ${option}`);
        if (option === "today") {
          setSelectedDate(todayDate);
        } else if (option === "tomorrow") {
          setSelectedDate(tomorrowDate);
        } else if (option === "nextSaturday") {
          setSelectedDate(nextSaturdayDate);
        }
        if (option !== 'edit-task-actions') {
          toggleOpciones(); // Cerrar las opciones después de seleccionar una fecha
        }
      };

      const handleDateSelected = (date: Date) => {
        setSelectedDate(date);
        toggleOpciones(); // Cerrar las opciones después de seleccionar una fecha
      };

      return (
        <div className='select-options'>
          <button className='etc-button-calendar' onClick={toggleOpciones}>
            <CiCalendar className='icon-cicalendar' />&nbsp;&nbsp;{selectedDate ? selectedDate.toLocaleDateString('es', { weekday: 'short', day: 'numeric', month: 'long' }) : 'Fecha de vencimiento'}
          </button>
          {showOptions && (
            <div className='etc-options'>
              <button className='now'>&nbsp;{selectedDate ? selectedDate.toLocaleDateString() : 'Fecha seleccionada en el calendario'}</button>

              <button onClick={() => handleOpcionClick("today")}>

                <div className='span-text'>
                  <CiCalendarDate className='hoy' />&nbsp;&nbsp;&nbsp;Hoy
                </div>
                <div className='day-today'>
                  {`${todayDate.toLocaleDateString('es', { weekday: 'short' }).toUpperCase()} ${todayDate.getDate()}`}
                </div>
              </button>

              <button onClick={() => handleOpcionClick("tomorrow")}>
                <div className='span-text'><CiCloudOn className='mañana' />&nbsp;&nbsp;&nbsp;Mañana</div>
                <div className='day-tomorrow'>{`${tomorrowDate.toLocaleDateString('es', { weekday: 'short' }).toUpperCase()} ${tomorrowDate.getDate()}`}&nbsp;</div>
              </button>

              <button onClick={() => handleOpcionClick("nextSaturday")}>
                <div className='span-text'><CiLight className='fds' />&nbsp;&nbsp;Próximo fin de semana</div>
                <div className='day-fds'>{`${nextSaturdayDate.toLocaleDateString('es', { weekday: 'short' }).toUpperCase()} ${nextSaturdayDate.getDate()}`}&nbsp;</div>
              </button>

              <button className='button-start'>&nbsp;<BsSlashCircle className='not-date' /><div className='span-text'>&nbsp;&nbsp;&nbsp;Sin fecha</div></button>

              <button className='component-calendar-center' onClick={() => handleOpcionClick('add-extension')}>
                <CalendarComponent onDateSelected={handleDateSelected} />
              </button>

              <button className='color-text' onClick={() => handleOpcionClick('edit-task-actions')}>
                <AddTask />
              </button>
            </div>
          )}
        </div>
      );
    }

    export default CalendarD;


*/



/* --> CUARTA SOLUCION <-- 

import React, { useState } from 'react';
import "../style-sheets/CalendarD.css"
import CalendarComponent from './CalendarComponent';
import { CiCalendar } from "react-icons/ci";
import AddTask from './AddTask';
import { BsSlashCircle } from "react-icons/bs";
import { CiCalendarDate, CiCloudOn, CiLight} from "react-icons/ci";

function CalendarD() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [todayDate, setTodayDate] = useState <Date>(new Date ());

  const [tomorrowDate, setTomorrowDate] = useState <Date>(()=>{
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const [nextSaturdayDate, setNextSaturdayDate] = useState <Date>(()=>{
    const today = new Date();
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + ((6 - today.getDay() + 1) % 7));
    return nextSaturday;
  });
  
  const toggleOpciones = () => {
    setShowOptions(!showOptions);
  };

  const handleOpcionClick = (option: string) => {
    console.log(`selected option: ${option}`);
    if (option === "today ") {
      setSelectedDate(todayDate);
    } else if (option === "tomorrow" ) {
      setSelectedDate(tomorrowDate);
    } 
  };

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className='select-options'>
      <button className='etc-button-calendar' onClick={toggleOpciones}>
        <CiCalendar className='icon-cicalendar' />&nbsp;&nbsp;Fecha de vencimiento
      </button>
      {showOptions && (
        <div className='etc-options'>
          <button className='now'>&nbsp;{selectedDate ? selectedDate.toLocaleDateString() : 'Fecha seleccionada en el calendario'}</button>

          <button onClick={() => handleOpcionClick("today")}>
            <div className='span-text'>
              <CiCalendarDate className='hoy'/>&nbsp;&nbsp;&nbsp;Hoy</div>
              <div className='day-today'>{`${todayDate.toLocaleDateString('es', { weekday: 'short' }).toUpperCase()} ${todayDate.getDate()}`}&nbsp;</div>
          </button>

          <button onClick={() => handleOpcionClick("tomorrow")}>
            <div className='span-text'><CiCloudOn className='mañana'/>&nbsp;&nbsp;&nbsp;Mañana</div>
            <div className='day-tomorrow'>{`${tomorrowDate.toLocaleDateString('es', { weekday: 'short' }).toUpperCase()} ${tomorrowDate.getDate()}`}&nbsp;</div>
          </button>

          <button onClick={() => handleOpcionClick("nextSaturday")}>
            <div className='span-text'><CiLight className='fds'/>&nbsp;&nbsp;Proximo fin de semana</div>
            <div className='day-fds'>{`${nextSaturdayDate.toLocaleDateString('es', { weekday: 'short' }).toUpperCase()} ${nextSaturdayDate.getDate()}`}&nbsp;</div>
          </button>

          <button className='button-start'>&nbsp;<BsSlashCircle className='not-date'/><div className='span-text'>&nbsp;&nbsp;&nbsp;Sin fecha</div></button>
          
          <button className='component-calendar-center' onClick={() => handleOpcionClick('add-extension')}>
          <CalendarComponent onDateSelected={handleDateSelected} />
          </button>
                    
          <button className='color-text' onClick={() =>  handleOpcionClick('edit-task-actions')}>
          <AddTask />
          </button>
        </div>
      )}
    </div>
  );
}

export default CalendarD;


*/

/*
formato dd/mm/aaaa:
  <div className='day-fds'>{nextSaturdayDate.toLocaleDateString()}&nbsp;</div>
*/

/* ---->> TERCERA SOLUCION <---

import React, { useState } from 'react';
import "../style-sheets/CalendarD.css"
import CalendarOptionsIcon from './CalendarOptionsIcon';
import CalendarComponent from './CalendarComponent';
import { CiCalendar } from "react-icons/ci";
import AddTask from './AddTask';

function CalendarD() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const toggleOpciones = () => {
    setShowOptions(!showOptions);
  };

  const handleOpcionClick = (option: string) => {
    console.log(`selected option: ${option}`);
  };

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className='select-options'>
      <button className='etc-button-calendar' onClick={toggleOpciones}>
        <CiCalendar className='icon-cicalendar' />&nbsp;&nbsp;Fecha de vencimiento
      </button>
      {showOptions && (
        <div className='etc-options'>
          <input className='input-calendar' type='text' placeholder='Introduce una fecha de vencimiento' onClick={() => handleOpcionClick('label')}></input>
          <CalendarOptionsIcon />
          <button className='component-calendar-center' onClick={() => handleOpcionClick('add-extension')}>
          <CalendarComponent onDateSelected={handleDateSelected} />
          </button>
          <button className='now'>{selectedDate ? selectedDate.toLocaleDateString() : 'Seleccionar fecha'}</button>
          <button className='color-text' onClick={() =>  handleOpcionClick('edit-task-actions')}>
          <AddTask />
          </button>
        </div>
      )}
    </div>
  );
}

export default CalendarD;


*/

/*  ---> SEGUNDA SOLUCION <---


import React, { useState } from 'react';
import "../style-sheets/CalendarD.css"
import CalendarOptionsIcon from './CalendarOptionsIcon';
import CalendarComponent from './CalendarComponent';
import { CiCalendar } from "react-icons/ci";


function CalendarD () {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOpciones = () => {
      setShowOptions(!showOptions);
    };
  
    const handleOpcionClick = (option: string) => {
      console.log(`selected option: ${option}`);
    };
  
    return (
      <div className='select-options'>
        <button className='etc-button-calendar' onClick={toggleOpciones}><CiCalendar className='icon-cicalendar'/>&nbsp;&nbsp;Fecha de vencimiento</button>
        {showOptions && (
          <div className='etc-options'>
            <input className='input-calendar' type='text' placeholder='Introduce una fecha de vencimiento'   onClick={() => handleOpcionClick('label')}></input>
            <CalendarOptionsIcon/>
            <button onClick={() => handleOpcionClick('add-extension')}><div className='tbpuzzle'></div>            <CalendarComponent/></button>
            <button className='color-text' onClick={() => handleOpcionClick('edit-task-actions')}><AddTask/></button>
          </div>
        )}
      </div>
    );
  }
  
  export default CalendarD;*/


/*import React, { useState } from 'react';
import "../style-sheets/CalendarD.css"
import CalendarOptionsIcon from './CalendarOptionsIcon';
import CalendarComponent from './CalendarComponent';

function CalendarD () {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOpciones = () => {
      setShowOptions(!showOptions);
    };
  
    const handleOpcionClick = (option: string) => {
      console.log(`selected option: ${option}`);
    };
  
    return (
      <div className='select-options'>
        <button className='etc-button-calendar' onClick={toggleOpciones}>Fecha de vencimiento</button>
        {showOptions && (
          <div className='etc-options'>
            <input className='input-calendar' type='text' placeholder='Introduce una fecha de vencimiento'   onClick={() => handleOpcionClick('label')}></input>
            <CalendarOptionsIcon/>
            <button onClick={() => handleOpcionClick('add-extension')}><div className='tbpuzzle'></div>            <CalendarComponent/></button>
            <button className='color-text' onClick={() => handleOpcionClick('edit-task-actions')}>+ Añadir hora</button>
          </div>
        )}
      </div>
    );
  }
  
  export default CalendarD;*/




