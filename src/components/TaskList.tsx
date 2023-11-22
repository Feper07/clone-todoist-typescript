
import React, { useState } from 'react';
import '../style-sheets/ButtonLetter.css';
import CalendarD from './CalendarD';
import PriorityButtonOptions from './PriorityButtonOptions';
import ReminderButton from './ReminderButton';
import EtcButtonOptions from './EtcButtonOptions';
import LastButton from './LastButton';
import { HiOutlineCheckCircle } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";
import { Priority, Task } from '../typos';
import AddTask from './AddTask';
//import { id } from 'date-fns/locale';
//import { v4 as uuidv4 } from 'uuid';

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
function TaskList(props:{tareas: Task[], removeTask:(id: string)=>void }){
    const handleRemoveTask = (id: string) => {
      props.removeTask(id)
   };
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
     return (<div className="text-task-buttonletter">
     {props.tareas.map((tarea) => (
       <div key={tarea.id} className="task-item">
           <div className='component-remove-button'> 
             <button className={(["remove-button", tarea.priority?get_class(tarea.priority): ""].join(" "))} onClick={() => handleRemoveTask(tarea.id)}>
               <HiCheck className={"remove-icon"} /></button>
           </div>
           &nbsp;&nbsp;&nbsp;
           <div className='date-name-selected'>
           {tarea.name}
           <p>{tarea.description}</p>
           {tarea.due_date ? (
             <p style={{ color: getDueDateColor(tarea.due_date) }}>
               {formatDueDate(tarea.due_date)}
             </p>
           ) : null}
         </div>
       </div>
     ))}
   </div>)  
  }

  export default TaskList;