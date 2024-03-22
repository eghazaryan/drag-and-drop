import { FormEvent, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Text, TextInput, UnstyledButton } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { ColumnType, TaskType } from '../Application/Application';
import classes from './CreateItem.module.css';

interface CreateItemProps {
  type: 'column' | 'task';
  title: string;
  placeholder: string;
  column?: ColumnType;
  handleCreate: (value: ColumnType | TaskType) => void;
}

interface TransformValues {
  name: string;
  column?: ColumnType;
  type: CreateItemProps['type'];
}

const transformValue = ({ name, column, type }: TransformValues) => {
  if (type === 'task' && column) {
    return {
      id: 1,
      title: name,
      description: '',
      columnId: column.id,
    };
  }

  return {
    id: name.toLowerCase().replaceAll(' ', '-'),
    title: name,
    tasks: [],
  };
};

export function CreateItem({ type, title, placeholder, column, handleCreate }: CreateItemProps) {
  const [showNewItem, setShowNewItem] = useState(false);
  const [name, setName] = useState('');

  const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
    if (event && name) {
      event.preventDefault();

      handleCreate(transformValue({ name, column, type }));
    }

    setName('');
    setShowNewItem(false);
  };

  const ref = useClickOutside(() => onSubmit());

  return (
    <div className={classes.root}>
      {showNewItem ? (
        <form ref={ref} className={classes.form} onSubmit={onSubmit}>
          <TextInput
            placeholder={placeholder}
            classNames={{ input: classes.input }}
            size="md"
            fw="700"
            autoFocus
            variant="unstyled"
            onChange={(event) => setName(event.target.value)}
          />
        </form>
      ) : (
        <UnstyledButton className={classes.inner} onClick={() => setShowNewItem(true)}>
          <IconPlus size={18} />
          <Text>{title}</Text>
        </UnstyledButton>
      )}
    </div>
  );
}
