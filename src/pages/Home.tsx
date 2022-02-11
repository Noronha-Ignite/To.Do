import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task: Task = {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle,
    };

    setTasks(previousTasks => [...previousTasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(previousTasks => previousTasks.map(task => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }

      return task;
    }));
  }

  function handleRemoveTask(id: number) {
    setTasks(previousTasks => previousTasks.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})