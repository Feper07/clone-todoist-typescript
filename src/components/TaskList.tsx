
import React, { useState } from 'react';
import '../style-sheets/ButtonLetter.css';
import CalendarD from './CalendarD';
import PriorityButtonOptions from './PriorityButtonOptions';
import ReminderButton from './ReminderButton';
import EtcButtonOptions from './EtcButtonOptions';
import ButtonLabels from './ButtonLabels';
import { HiOutlineCheckCircle } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";
import { Priority, Task } from '../typos';
import AddTask from './AddTask';
import { FaRegTrashAlt } from "react-icons/fa";

    //Function that returns a CSS class based on the task priority
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

    interface TaskListProps {
      tareas: Task[], 
      removeTask: (id: string) => void, 
      toggleTask: (id: string) => void, 
      showDeleteButton?: boolean 
    }

function TaskList(props: TaskListProps){

    const handleToggleTask = (id: string) => {
        props.toggleTask(id); //Function to toggle the state of a task
    };
   
    //Function to format the due date of a task
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
    
    //Function to get the color of a task's due date
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

    //reverse(), will reverse the order of the tasks, placing the last one at the beginning and the first ones at the end.
    
    return (
     <div className="text-task-buttonletter">
     {props.tareas.slice().reverse().map((tarea) => (
       <div key={tarea.id} className="task-item"> 
           <div className='component-remove-button'> 
             <button className={(["remove-button", tarea.priority?get_class(tarea.priority): ""].join(" "))} onClick={() => handleToggleTask(tarea.id)}>
               <HiCheck className={"remove-icon"} />
            </button>
            {/* Condition to show delete button */}
            {props.showDeleteButton && (
              //
              <button onClick={() => props.removeTask(tarea.id)} className="delete-task-button">
                <FaRegTrashAlt className='trash.delete'/>
              </button>
            )}
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