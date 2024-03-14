import { useState } from 'react';
import { closestCorners, DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { IconMenu } from '@tabler/icons-react';
import { Container, Divider, Title } from '@mantine/core';
import { CreateItem } from '../CreateItem';
import { Grocery } from '../Grocery';
import classes from './Application.module.css';

const mock = [
  {
    id: 1,
    name: 'Apples',
    category: 'Fruit',
    price: '5.00 USD',
    icon: <IconMenu size={30} stroke="1" />,
  },
  {
    id: 2,
    name: 'Bread',
    category: 'Bakery',
    price: '15.00 USD',
    icon: <IconMenu size={30} stroke="1" />,
  },
  {
    id: 3,
    name: 'Rice',
    category: 'Grains',
    price: '25.00 USD',
    icon: <IconMenu size={30} stroke="1" />,
  },
  {
    id: 4,
    name: 'Water',
    category: '',
    price: '2.00 USD',
    icon: <IconMenu size={30} stroke="1" />,
  },
  {
    id: 5,
    name: 'Oranges',
    category: 'Fruit',
    price: '3.00 USD',
    icon: <IconMenu size={30} stroke="1" />,
  },
];

export interface GroceryType {
  id: number;
  name: string;
  category: string;
  price: string;
  icon: JSX.Element;
}

interface ReorderProps {
  data: GroceryType[];
  startIndex: UniqueIdentifier;
  endIndex: UniqueIdentifier;
}

const reorder = ({ data, startIndex, endIndex }: ReorderProps): GroceryType[] => {
  const startPosition = data.findIndex((item) => item.id === startIndex);
  const endPosition = data.findIndex((item) => item.id === endIndex);

  return arrayMove(data, startPosition, endPosition);
};

export function Application() {
  const [data, setData] = useState(mock);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event; //active-start, over-end

    if (!over || active.id === over.id) {
      return;
    }

    const updatedData = reorder({ data, startIndex: active.id, endIndex: over.id });
    setData(updatedData);
  };

  const handleUpdate = (grocery: GroceryType) => {
    const updatedData = data.map((item) => {
      if (item.id === grocery.id) {
        return grocery;
      } else {
        return item;
      }
    });
    setData(updatedData);
  };

  const handleDelete = (grocery: GroceryType) => {
    const updatedData = data.filter((item) => item.id !== grocery.id);
    setData(updatedData);
  };

  const handleCreate = (grocery: GroceryType) => {
    setData((prevState) => [...prevState, grocery]);
  };

  const rows = data.map((grocery) => (
    <Grocery
      key={grocery.id}
      data={grocery}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
    />
  ));

  return (
    <Container className={classes.root} size="xs" mt="50px">
      <div>
        <Title pl="lg" p="sm" order={2}>
          Exercise 2: @dnd-kit
        </Title>

        <Divider mt="sm" mb="xl" />
      </div>

      <DndContext onDragEnd={onDragEnd} collisionDetection={closestCorners}>
        <SortableContext items={data} strategy={verticalListSortingStrategy}>
          {rows}
        </SortableContext>
      </DndContext>

      <CreateItem handleCreate={handleCreate} />
    </Container>
  );
}
