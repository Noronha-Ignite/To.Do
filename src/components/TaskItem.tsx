import React, { Fragment, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';
import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen/pen.png'

interface TaskItemProps {
  task: Task,
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void;
}

export const TaskItem = ({ task, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const cancelEditing = () => {
    setTaskTitle(task.title);
    setIsEditing(false);
  }

  const handleEditTask = () => {
    editTask(task.id, taskTitle);
    setIsEditing(false);
  }

  const handleRemoveTask = () => {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item',
      [{ text: 'Não' }, { text: 'Sim', onPress: () => removeTask(task.id) }]
    );
  }

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          {isEditing ? (
            <TextInput
              value={taskTitle}
              onChangeText={setTaskTitle}
              autoFocus={true}
              onSubmitEditing={handleEditTask}
              style={[task.done ? styles.taskTextDone : styles.taskText, { padding: 0 }]}
            />
          ) :
          (
            <Text
              style={task.done ? styles.taskTextDone : styles.taskText}
            >
              {taskTitle}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.taskIconsWrapper}>
        <TouchableOpacity
          style={{ paddingHorizontal: 12 }}
          onPress={() => isEditing ? cancelEditing() : setIsEditing(true)}
        >
          {isEditing ? (
            <View style={styles.iconWrapper}>
              <Icon name='x' size={20} color="#C4C4C4" />
            </View>
          ) : (
            <Image source={penIcon} />
          )}
        </TouchableOpacity>

        {/* // Barra divisora */}
        <View style={styles.iconSeparator} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 12 }}
          onPress={isEditing ? handleEditTask : handleRemoveTask}
        >
          {isEditing ? (
            <View style={styles.iconWrapper}>
              <Icon name='check' size={20} color="#C4C4C4" />
            </View>
          ) : (
            <Image source={trashIcon} />
          )}
        </TouchableOpacity>

      </View>
    </ItemWrapper>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  taskIconsWrapper: {
    flexDirection: 'row',
    height: '50%'
  },
  iconSeparator: {
    height: '100%',
    width: 1,
    backgroundColor: '#C4C4C4',
  },
  iconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
