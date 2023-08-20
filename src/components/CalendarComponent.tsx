  import React, { useState } from 'react';
  import Calendar from 'react-calendar';
  import {Value} from 'react-calendar/src/shared/types';

  import 'react-calendar/dist/Calendar.css';
  import "../style-sheets/CalendarComponent.css";
  interface CalendarComponentProps {
    onDateSelected: (date: Date) => void;
    selectedDateShow?: null  | Date
  }

  const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateSelected, selectedDateShow }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(selectedDateShow?selectedDateShow:new Date());

    const handleDateChange = (value: Value) => {
      if (Array.isArray(value)) {
        // Handle multiple dates if necessary
      } else {
        if(value !== null){
          setSelectedDate(value);
            onDateSelected(value);
        }
      }
    };

    const currentDate = new Date();

    return (
      <div>
        <Calendar
          className="custom-calendar"
          value={selectedDate}
          onChange={(value) => handleDateChange(value)}
          minDate={currentDate}
        />
        <div>Fecha seleccionada: {selectedDate?.toLocaleDateString()}</div>
      </div>
    ); 
    
  };

  export default CalendarComponent;

/*  ---> TERCER SOLUCION <----

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import {Value} from 'react-calendar/src/shared/types';

import 'react-calendar/dist/Calendar.css';
import "../style-sheets/CalendarComponent.css";
interface CalendarComponentProps {
  onDateSelected: (date: Date) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateSelected }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      // Handle multiple dates if necessary
    } else {
      if(value !== null){
        setSelectedDate(value);
          onDateSelected(value);
      }
    }
  };

  const currentDate = new Date();

  return (
    <div>
      <Calendar
        className="custom-calendar"
        value={selectedDate}
        onChange={(value) => handleDateChange(value)}
        minDate={currentDate}
      />
      <div>Fecha seleccionada: {selectedDate?.toLocaleDateString()}</div>
    </div>
  ); 
  
};

export default CalendarComponent;

*/

/* SEGUNDA SOLUCION

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../style-sheets/CalendarComponent.css"

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (value:any, event:any) => {
    setSelectedDate(value);
  };

  // get date
  const currentDate = new Date();

  return (
    <div>
      <Calendar className="custom-calendar" value={selectedDate} onChange={handleDateChange} minDate={currentDate} />
      <div>Fecha seleccionada: {selectedDate.toLocaleDateString()}</div>
    </div>
  );
};

export default CalendarComponent;*/

/* PRIMERA SOLUCION 

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (value:any, event:any) => {
    setSelectedDate(value);
  };

  // get date
  const currentDate = new Date();

  return (
    <div>
      <Calendar value={selectedDate} onChange={handleDateChange} minDate={currentDate} />
      <div>Fecha seleccionada: {selectedDate.toLocaleDateString()}</div>
    </div>
  );
};

export default CalendarComponent;*/
