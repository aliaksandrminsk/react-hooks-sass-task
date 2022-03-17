export default class CartStorage {
  getData(key: string) {
    return localStorage.getItem(key);
  }

  saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
