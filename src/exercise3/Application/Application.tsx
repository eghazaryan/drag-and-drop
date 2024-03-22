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

export type ColumnType = Record<string, TaskType[]>;

const columnMock: ColumnType = {
  'To do': [
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
  'In progress': [
    {
      id: 3,
      title: 'Drag and Drop',
      description: 'Research the current state of Drag and Drop libraries in React.',
    },
  ],
  Done: [],
};

interface ReorderProps {
  columns: ColumnType;
  source: DraggableLocation;
  destination: DraggableLocation;
}

const reorder = ({ columns, source, destination }: ReorderProps): ColumnType => {
  const result = { ...columns };

  const [removed] = result[source.droppableId].splice(source.index, 1);
  columns[destination.droppableId].splice(destination.index, 0, removed);

  return result;
};

export function Application() {
  const [columns, setColumns] = useState(columnMock);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

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

  const handleColumnCreate = (newColumn: string) => {
    setColumns((prev) => {
      return { ...prev, [newColumn]: [] };
    });
  };

  const handleTaskCreate = (newTask: TaskType, columnId: string) => {
    const result = { ...columns };
    result[columnId].push(newTask);
    setColumns(result);
  };

  const statusColumns = Object.keys(columns).map((key, index) => (
    <Column title={key} tasks={columns[key]} key={index} handleTaskCreate={handleTaskCreate} />
  ));

  return (
    <Container className={classes.root} size="1600">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.inner}>
          {statusColumns}
          <CreateItem
            title="Add new column"
            placeholder="Enter column title"
            type="column"
            handleColumnCreate={handleColumnCreate}
            className={classes.newColumn}
          />
        </div>
      </DragDropContext>
    </Container>
  );
}
