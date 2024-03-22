import { FormEvent, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Box, BoxComponentProps, Text, TextInput, UnstyledButton } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { TaskType } from '../Application/Application';
import classes from './CreateItem.module.css';

interface CreateItemProps extends BoxComponentProps {
  type: 'column' | 'task';
  title: string;
  placeholder: string;
  columnTitle?: string;
  handleColumnCreate?: (value: string) => void;
  handleTaskCreate?: (value: TaskType, title: string) => void;
}

export function CreateItem({
  type,
  title,
  placeholder,
  columnTitle,
  handleColumnCreate,
  handleTaskCreate,
  ...others
}: CreateItemProps) {
  const [showNewItem, setShowNewItem] = useState(false);
  const [name, setName] = useState('');

  const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
    if (event && name) {
      event.preventDefault();

      if (type === 'column' && handleColumnCreate) {
        handleColumnCreate(name);
      }
      if (type === 'task' && handleTaskCreate && columnTitle) {
        handleTaskCreate({ title: name, description: '', id: Math.random() }, columnTitle);
      }
    }

    setName('');
    setShowNewItem(false);
  };

  const ref = useClickOutside(() => onSubmit());

  return (
    <Box {...others}>
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
    </Box>
  );
}
