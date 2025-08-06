import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ReadingListItem {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  dateAdded: number;
}

const READING_LIST_KEY = '@reading_list';

export class ReadingListManager {
  static async addToReadingList(item: Omit<ReadingListItem, 'id' | 'dateAdded'>): Promise<void> {
    try {
      const existingList = await this.getReadingList();
      
      const exists = existingList.some(existing => existing.url === item.url);
      if (exists) {
        console.log('Item already exists in reading list');
        return;
      }

      const newItem: ReadingListItem = {
        ...item,
        id: Date.now().toString(),
        dateAdded: Date.now(),
      };

      const updatedList = [newItem, ...existingList];
      await AsyncStorage.setItem(READING_LIST_KEY, JSON.stringify(updatedList));
      console.log('Added to reading list:', newItem.title);
    } catch (error) {
      console.error('Failed to add to reading list:', error);
    }
  }

  static async getReadingList(): Promise<ReadingListItem[]> {
    try {
      const stored = await AsyncStorage.getItem(READING_LIST_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get reading list:', error);
      return [];
    }
  }

  static async removeFromReadingList(id: string): Promise<void> {
    try {
      const currentList = await this.getReadingList();
      const updatedList = currentList.filter(item => item.id !== id);
      await AsyncStorage.setItem(READING_LIST_KEY, JSON.stringify(updatedList));
    } catch (error) {
      console.error('Failed to remove from reading list:', error);
    }
  }

  static async clearReadingList(): Promise<void> {
    try {
      await AsyncStorage.removeItem(READING_LIST_KEY);
    } catch (error) {
      console.error('Failed to clear reading list:', error);
    }
  }
}