import { FormEvent, useRef, useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { Draggable } from 'react-beautiful-dnd';
import { ActionIcon, Group, Text, TextInput } from '@mantine/core';
import { GroceryType } from '../Application/Application';
import classes from './Grocery.module.css';

interface GroceryProps {
  data: GroceryType;
  index: number;
  handleDelete: (val: GroceryType) => void;
  handleUpdate: (val: GroceryType) => void;
}

export function Grocery({ data, index, handleDelete, handleUpdate }: GroceryProps) {
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdate({ ...data, name: name });

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <Draggable draggableId={String(data.id)} index={index}>
      {(provided) => {
        return (
          <Group
            className={classes.root}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            p="xs"
            m="xs"
            ml="lg"
            mr="lg"
          >
            <div className={classes.icon}>{data.icon}</div>

            <form className={classes.inner} onSubmit={onSubmit}>
              <TextInput
                ref={inputRef}
                classNames={{ input: classes.input }}
                size="sm"
                fw="700"
                defaultValue={data.name}
                variant="unstyled"
                onChange={(event) => setName(event.target.value)}
              />
              <Text size="md" c="dimmed">
                {data.price}
              </Text>
            </form>

            <ActionIcon
              color="red"
              variant="light"
              aria-label="Settings"
              onClick={() => handleDelete(data)}
            >
              <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Group>
        );
      }}
    </Draggable>
  );
}
