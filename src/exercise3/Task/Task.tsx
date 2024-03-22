import { IconDots, IconPencil } from '@tabler/icons-react';
import { Draggable } from 'react-beautiful-dnd';
import { ActionIcon, Text, Title } from '@mantine/core';
import { TaskType } from '../Application/Application';
import classes from './Task.module.css';

interface TaskProps {
  data: TaskType;
  index: number;
}

export function Task({ data, index }: TaskProps) {
  return (
    <Draggable draggableId={String(data.id)} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={classes.root}
          >
            <Title order={4} className={classes.title}>
              {data.title}
            </Title>
            <ActionIcon className={classes.icon} variant="transparent" color="gray">
              <IconPencil stroke={0.5} />
            </ActionIcon>

            <Text className={classes.description}>{data.description}</Text>
          </div>
        );
      }}
    </Draggable>
  );
}
