export enum Priority{
    Priority1 = "P1",
    Priority2 = "P2",
    Priority3 = "P3",
    Priority4 = "P4",
  } //
  
  //Type for task list
  export interface Task{
    completed: true| false;
    name: string,
    description: string,
    priority?: Priority,
    due_date?: Date,
    id: string,
    done: true| false 
    
  }