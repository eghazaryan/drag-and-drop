import { FormEvent, useState } from 'react';
import { IconLemon, IconPlus, IconX } from '@tabler/icons-react';
import { ActionIcon, Group, Text, TextInput, UnstyledButton } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { GroceryType } from '../Application/Application';
import classes from './CreateItem.module.css';

interface CreateItemProps {
  handleCreate: (value: GroceryType) => void;
}

export function CreateItem({ handleCreate }: CreateItemProps) {
  const [showNewItem, setShowNewItem] = useState(false);
  const [name, setName] = useState('');

  const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
    if (event && name) {
      event.preventDefault();

      handleCreate({
        id: Math.random(),
        name: name,
        category: 'Fruit',
        price: '5.00 USD',
        icon: <IconLemon size={30} stroke="1" />,
      });
    }

    setName('');
    setShowNewItem(false);
  };

  const ref = useClickOutside(() => onSubmit());

  return (
    <>
      {showNewItem ? (
        <Group ref={ref} className={classes.newItemRoot} p="xs" m="xs" ml="lg" mr="lg">
          <div className={classes.newItemIcon}>
            <IconLemon size={30} stroke="1" />
          </div>

          <form className={classes.newItemInner} onSubmit={onSubmit}>
            <TextInput
              placeholder="Type grocery name"
              classNames={{ input: classes.input }}
              size="sm"
              fw="700"
              autoFocus
              variant="unstyled"
              onChange={(event) => setName(event.target.value)}
            />
            <Text size="md" c="dimmed">
              5.00 USD
            </Text>
          </form>

          <ActionIcon color="red" variant="light" aria-label="Settings">
            <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      ) : (
        <UnstyledButton
          className={classes.root}
          p="xs"
          m="xs"
          ml="lg"
          mr="lg"
          onClick={() => setShowNewItem(true)}
        >
          <IconPlus color="gray" /> Add new grocery
        </UnstyledButton>
      )}
    </>
  );
}
