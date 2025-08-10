class GlobalTitleStore {
  private titles: { [key: number]: string } = {};
  private listeners: Array<(titles: { [key: number]: string }) => void> = [];

  constructor() {
    this.titles = {};
    this.listeners = [];
  }

  updateTitle(tabId: number, title: string): void {
    this.titles[tabId] = title;
    this.notifyListeners();
  }

  getTitle(tabId: number): string {
    return this.titles[tabId] || 'Untitled';
  }

  getAllTitles(): { [key: number]: string } {
    return this.titles;
  }

  subscribe(listener: (titles: { [key: number]: string }) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.titles));
  }
}

export const TitleStore: GlobalTitleStore = new GlobalTitleStore();