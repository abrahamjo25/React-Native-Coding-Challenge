import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import moment from "moment";

const groupTasksByDate = (tasks) => {
  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

  return tasks.reduce((result, task) => {
    const taskDate = moment(task.dueDate).format("YYYY-MM-DD");
    const groupKey =
      taskDate === today
        ? "today"
        : taskDate === tomorrow
        ? "tomorrow"
        : "upcoming";
    if (!result[groupKey]) result[groupKey] = [];
    result[groupKey].push(task);
    return result;
  }, {});
};

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const groupedTasks = groupTasksByDate(tasks);

  const renderGroupedTasks = (group) => (
    <>
      <Text style={styles.groupTitle}>{group.title}</Text>
      <FlatList
        data={group.tasks}
        renderItem={({ item, index }) => (
          <View style={styles.task}>
            <Text style={styles.itemList}>{item.task}</Text>
            <View style={styles.taskButtons}>
              <Text style={styles.editButton} onPress={() => onEdit(index)}>
                Edit
              </Text>
              <Text style={styles.deleteButton} onPress={() => onDelete(index)}>
                Delete
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );

  return (
    <View>
      {groupedTasks.today &&
        renderGroupedTasks({ title: "Today", tasks: groupedTasks.today })}
      {groupedTasks.tomorrow &&
        renderGroupedTasks({ title: "Tomorrow", tasks: groupedTasks.tomorrow })}
      {groupedTasks.upcoming &&
        renderGroupedTasks({ title: "Upcoming", tasks: groupedTasks.upcoming })}
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontSize: 18,
  },
  itemList: {
    fontSize: 19,
  },
  taskButtons: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    color: "blue",
    fontWeight: "bold",
    fontSize: 18,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default TaskList;
