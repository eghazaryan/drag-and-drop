import { Droppable } from 'react-beautiful-dnd';
import { Divider, Title } from '@mantine/core';
import { ColumnType, TaskType } from '../Application/Application';
import { CreateItem } from '../CreateItem';
import { Task } from '../Task';
import classes from './Column.module.css';

interface ColumnProps {
  title: string;
  tasks: TaskType[];
  handleTaskCreate: (val: TaskType, column: string) => void;
}

export function Column({ title, tasks, handleTaskCreate }: ColumnProps) {
  const rows = tasks.map((task, index) => <Task data={task} key={task.id} index={index} />);

  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className={classes.root}>
          <Title order={3}>{title}</Title>
          <Divider m={0} p={0} />

          {rows}
          {provided.placeholder}
          <CreateItem
            title="Add new task"
            placeholder="Enter task title"
            type="task"
            columnTitle={title}
            handleTaskCreate={handleTaskCreate}
            className={classes.newTask}
          />
        </div>
      )}
    </Droppable>
  );
}
