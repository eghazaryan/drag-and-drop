import { FormEvent, useRef, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconX } from '@tabler/icons-react';
import { ActionIcon, Group, Text, TextInput } from '@mantine/core';
import { GroceryType } from '../Application/Application';
import classes from './Grocery.module.css';

interface GroceryProps {
  data: GroceryType;
  handleDelete: (val: GroceryType) => void;
  handleUpdate: (val: GroceryType) => void;
}

export function Grocery({ data, handleDelete, handleUpdate }: GroceryProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: data.id });
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdate({ ...data, name: name });

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <Group style={style} className={classes.root} p="xs" m="xs" ml="lg" mr="lg" align="center">
      <div ref={setNodeRef} {...attributes} {...listeners} className={classes.icon}>
        {data.icon}
      </div>

      <form className={classes.inner} onSubmit={onSubmit}>
        <TextInput
          ref={inputRef}
          classNames={{ input: classes.input }}
          size="xs"
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
}
