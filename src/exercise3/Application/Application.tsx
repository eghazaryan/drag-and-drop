import { useState } from 'react';
import { DragDropContext, DraggableLocation, OnDragEndResponder } from 'react-beautiful-dnd';
import { Container } from '@mantine/core';
import { Column } from '../Column';
import { CreateItem } from '../CreateItem';
import classes from './Application.module.css';

export interface TaskType {
  id: number;
  title: string;
  description: string;
}

export interface ColumnType {
  id: string;
  title: string;
  tasks: TaskType[];
}

const columnMock: ColumnType[] = [
  {
    id: 'to-do',
    title: 'To Do',
    tasks: [
      {
        id: 1,
        title: 'CSS selectors',
        description: 'Get familiar with :has :where and :is selectors',
      },
      {
        id: 2,
        title: 'Grid layout',
        description: 'FInish CSS Grid course and learning materials',
      },

      {
        id: 4,
        title: 'Task without description',
        description: '',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      {
        id: 3,
        title: 'Drag and Drop',
        description: 'Research the current state of Drag and Drop libraries in React.',
      },
    ],
  },
  { id: 'done', title: 'Done', tasks: [] },
];
// const startPosition = data.findIndex((item) => item.id === startIndex);
//   const endPosition = data.findIndex((item) => item.id === endIndex);

interface ReorderProps {
  columns: ColumnType[];
  source: DraggableLocation;
  destination: DraggableLocation;
}

const reorder = ({ columns, source, destination }: ReorderProps): ColumnType[] => {
  const result = Array.from(columns);

  //Find source column and remove draggable item
  const [removed] = columns
    .find((column) => {
      return column.id === source.droppableId;
    })!
    .tasks.splice(source.index, 1);

  //Find destination column and add draggable item
  columns
    .find((column) => {
      return column.id === destination.droppableId;
    })!
    .tasks.splice(destination.index, 0, removed);

  return result;
};

export function Application() {
  const [columns, setColumns] = useState(columnMock);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination, draggableId } = result;
    console.log(result, 'result');
    if (
      !destination ||
      (destination.index === source.index && destination.droppableId === source.droppableId)
    ) {
      return;
    }

    const updatedData = reorder({
      columns,
      source,
      destination,
    });

    setColumns(updatedData);
  };

  const statusColumns = columns.map((column, index) => <Column data={column} key={index} />);

  return (
    <Container className={classes.root} size="1600">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.inner}> {statusColumns}</div>
      </DragDropContext>
    </Container>
  );
}
