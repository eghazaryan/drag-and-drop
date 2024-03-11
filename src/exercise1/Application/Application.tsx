import { useState } from 'react';
import { IconBaguette, IconBottle, IconGrain, IconLemon } from '@tabler/icons-react';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { Container, Divider, Title } from '@mantine/core';
import { CreateItem } from '../CreateItem';
import { Grocery } from '../Grocery';
import classes from './Application.module.css';

export interface GroceryType {
  id: number;
  name: string;
  category: string;
  price: string;
  icon: JSX.Element;
}

export interface ColumnValueType {
  id: number;
  title: string;
  items: GroceryType[];
}

export type ColumnType = Record<string, ColumnValueType>;

const mock = [
  {
    id: 1,
    name: 'Apples',
    category: 'Fruit',
    price: '5.00 USD',
    icon: <IconLemon size={30} stroke="1" />,
  },
  {
    id: 2,
    name: 'Bread',
    category: 'Bakery',
    price: '15.00 USD',
    icon: <IconBaguette size={30} stroke="1" />,
  },
  {
    id: 3,
    name: 'Rice',
    category: 'Grains',
    price: '25.00 USD',
    icon: <IconGrain size={30} stroke="1" />,
  },
  {
    id: 4,
    name: 'Water',
    category: '',
    price: '2.00 USD',
    icon: <IconBottle size={30} stroke="1" />,
  },
  {
    id: 11,
    name: 'Oranges',
    category: 'Fruit',
    price: '3.00 USD',
    icon: <IconLemon size={30} stroke="1" />,
  },
];

interface ReorderProps {
  data: GroceryType[];
  startIndex: number;
  endIndex: number;
}
const reorder = ({ data, startIndex, endIndex }: ReorderProps): GroceryType[] => {
  const result = Array.from(data);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function Application() {
  const [data, setData] = useState<GroceryType[]>(mock);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const updatedData = reorder({ data, startIndex: source.index, endIndex: destination.index });
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

  const rows = data.map((item, index) => (
    <Grocery
      data={item}
      key={item.id}
      index={index}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
    />
  ));
  console.log(data, 'data');
  return (
    <Container className={classes.root} size="xs" mt="50px">
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Title pl="lg" p="sm" order={2}>
            Exercise 1 - List of groceries
          </Title>

          <Divider mt="sm" mb="xl" />

          <Droppable droppableId={'column-1'}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className={classes.inner}>{rows}</div>

                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <CreateItem handleCreate={handleCreate} />
        </div>
      </DragDropContext>
    </Container>
  );
}
