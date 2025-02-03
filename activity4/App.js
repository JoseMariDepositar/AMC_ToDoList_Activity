import React, { useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Checkbox } from 'react-native-paper';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Morning routine - Waking up',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Morning routine - Checking phone',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-1',
    title: 'Morning routine - Eating breakfast',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-2',
    title: 'Morning routine - Taking shower',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-3',
    title: 'Morning routine - Getting ready',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-4',
    title: 'Afternoon - Eating lunch',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-5',
    title: 'Afternoon - Working on computer',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-6',
    title: 'Afternoon - Eating snacks',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-7',
    title: 'Afternoon - Taking a rest after work',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-8',
    title: 'Afternoon - Going back to work.',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-9',
    title: 'Afternoon - Taking out the trash',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-10',
    title: 'Afternoon - Washing dishes.',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-11',
    title: 'Afternoon - Buying some frozen food in the market',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-12',
    title: 'Afternoon - Going back to work.',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-13',
    title: 'Afternoon - Drinking coffee',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-14',
    title: 'Evening - Cooking food',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-15',
    title: 'Evening - Eating dinner',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-16',
    title: 'Evening - Washing dishes',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-17',
    title: 'Evening - Taking a shower',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-18',
    title: 'Evening - Going back to work',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-19',
    title: 'Evening - Going to evening meetings',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-20',
    title: 'Evening - Checking emails',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-21',
    title: 'Midnight - Working some more.',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-22',
    title: 'Midnight - Check phone again',
  },
   {
    id: '58694a0f-3da1-471f-bd96-145571e29d72-23',
    title: 'Midnight - Sleep',
  },
];

const COLORS = ['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF', '#40E0D0', '#18bb86', '#e149de', '#5f8f11', '#823013', '#d2bb88', '#2c90d0', '#cce004', '#818fee', '#9FE2BF', '#558868', '#ba5be6', '#692ce8', '#efbd9c', '#c146a6', '#DFFF00', '#17e247', '#a1c468', '#1840eb', '#ff0702'];

const Item = ({ item, onToggle, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onToggle} style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
    <Checkbox
      status={item.done ? 'checked' : 'unchecked'}
      onPress={onToggle}
      color={item.done ? "white" : "#6495ED"} 
      uncheckedColor="#6495ED" 
    />
  </TouchableOpacity>
);

const App = () => {
  const [data, setData] = useState(DATA);

  const toggleDone = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  
  const finishedCount = data.reduce((count, task) => (task.done ? count + 1 : count), 0);
  const notFinishedCount = data.length - finishedCount;

  const renderItem = ({ item, index }) => {
    const backgroundColor = item.done ? '#6495ED' : COLORS[index % COLORS.length];
    const textColor = item.done ? 'white' : 'black';

    return (
      <Item
        item={item}
        onToggle={() => toggleDone(item.id)}
        backgroundColor={backgroundColor}
        textColor={textColor}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.headerText}>📌 Todo List</Text>
        </View>

        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>✅ Finished: {finishedCount}</Text>
          <Text style={styles.summaryText}>❌ Not Finished: {notFinishedCount}</Text>
        </View>

        {/* Task List */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={data}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    backgroundColor: '#6495ED',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    flex: 1,
  },
});

export default App;
