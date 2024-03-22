import { Droppable } from 'react-beautiful-dnd';
import { Divider, Title } from '@mantine/core';
import { ColumnType, TaskType } from '../Application/Application';
import { CreateItem } from '../CreateItem';
import { Task } from '../Task';
import classes from './Column.module.css';

interface ColumnProps {
  data: ColumnType;
  // handleCreate: (val: TaskType) => void;
}

export function Column({ data }: ColumnProps) {
  const rows = data.tasks.map((task, index) => <Task data={task} key={task.id} index={index} />);

  return (
    <Droppable droppableId={data.id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className={classes.root}>
          <Title order={3}>{data.title}</Title>
          <Divider m={0} p={0} />

          {rows}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
