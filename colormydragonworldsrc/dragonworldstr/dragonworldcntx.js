import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useDragonWorldContext = () => {
  return useContext(StoreContext);
};

export const DragonCtxProvider = ({ children }) => {
  const [savedDrawingsInProgress, setSavedDrawingsInProgress] = useState([]);
  const [savedDrawingsDone, setSavedDrawingsDone] = useState([]);

  const saveDragonWorldDrawing = async (key, data, edit) => {
    try {
      const storedDrawings = await AsyncStorage.getItem(key);
      let drawings = storedDrawings !== null ? JSON.parse(storedDrawings) : [];

      let updatedDrawings;

      if (edit?.id) {
        let dragondrawings;
        key === 'dragonworldinprogressdrawings'
          ? (dragondrawings = savedDrawingsInProgress)
          : (dragondrawings = savedDrawingsDone);

        updatedDrawings = dragondrawings.map(movie =>
          movie.id === edit.id ? data : movie,
        );
      } else {
        updatedDrawings = [...drawings, data];
      }

      await AsyncStorage.setItem(key, JSON.stringify(updatedDrawings));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const fetchDragonWorldDrawing = async key => {
    try {
      const savedData = await AsyncStorage.getItem(key);
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        key === 'dragonworldinprogressdrawings'
          ? setSavedDrawingsInProgress(parsed)
          : setSavedDrawingsDone(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDragonWorldDrawing = async (key, selectedDrawingId) => {
    const jsonValue = await AsyncStorage.getItem(key);
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    console.log(data);

    const filtered = data.filter(item => item.id !== selectedDrawingId.id);

    key === 'dragonworldinprogressdrawings'
      ? setSavedDrawingsInProgress(filtered)
      : setSavedDrawingsDone(filtered);

    await AsyncStorage.setItem(key, JSON.stringify(filtered));
  };

  const value = {
    saveDragonWorldDrawing,
    fetchDragonWorldDrawing,
    deleteDragonWorldDrawing,
    savedDrawingsInProgress,
    savedDrawingsDone,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
