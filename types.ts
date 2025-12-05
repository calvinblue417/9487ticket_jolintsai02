
export enum GameScreen {
  HOME = 'HOME',
  START = 'START',
  NAME_INPUT = 'NAME_INPUT',
  GAME = 'GAME',
  END = 'END',
}

export interface LevelData {
  id: number;
  // 題目與角色名稱已融入圖片，程式碼中保留欄位但不使用
  characterName: string; 
  question: string;
  hashedAnswers: string[]; // 改為字串陣列，支援雙答案
  imageUrl: string;
  musicUrl: string;
}

export interface PlayerState {
  name: string;
  currentLevelIndex: number; // 0-5 對應 6 個關卡
  score: number;
}
