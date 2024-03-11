import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Application } from '@/exercise1/Application';
import classes from './test.module.css';

export function Exercise1() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Application />
    </DndProvider>
  );
}
