
import { LevelData } from './types';

// ============================================================================
// === 設定區域 (CONFIGURATION ZONE) ===
// ============================================================================

// 1. 圖片與音樂網址設定
// 使用 Github Raw 連結
const GITHUB_BASE_URL = "https://raw.githubusercontent.com/calvinblue417/9487ticket_jolintsai02/main/public";

// 定義各個頁面的圖片
export const IMAGES = {
  HOME: `${GITHUB_BASE_URL}/home.png`,
  START: `${GITHUB_BASE_URL}/start.png`,
  NAME: `${GITHUB_BASE_URL}/name.png`,
  END: `${GITHUB_BASE_URL}/end.png`,
};

// 4. 遊戲開始時間 (倒數計時遮罩用)
// 格式: YYYY-MM-DDTHH:mm:ss+08:00 (請務必加上 +08:00 以鎖定台灣時區)
// 如果時間已過，遮罩會自動隱藏
export const GAME_START_TIME = "2024-12-05T23:00:00+08:00"; 

// 2. 遊戲關卡設定 (6個角色 / 6個題目)
// 題目需求：每個關卡有 2 個答案，必須都答對。
// 注意：目前的 Hash 為範例，請務必重新生成正確答案的 SHA256 並貼上
export const GAME_LEVELS: LevelData[] = [
  {
    id: 1,
    characterName: "",
    question: "",
    hashedAnswers: [
      "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9", 
      "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9" 
    ],
    imageUrl: `${GITHUB_BASE_URL}/question_1.png`,
    musicUrl: `${GITHUB_BASE_URL}/music_1.mp3`,
  },
  {
    id: 2,
    characterName: "",
    question: "",
    hashedAnswers: [
      "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9",
      "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9" 
    ],
    imageUrl: `${GITHUB_BASE_URL}/question_2.png`,
    musicUrl: `${GITHUB_BASE_URL}/music_2.mp3`,
  },
  {
    id: 3,
    characterName: "",
    question: "",
    hashedAnswers: [
      "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9",
      "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9" 
    ],
    imageUrl: `${GITHUB_BASE_URL}/question_3.png`,
    musicUrl: `${GITHUB_BASE_URL}/music_3.mp3`,
  },
  {
    id: 4,
    characterName: "",
    question: "",
    hashedAnswers: [
      "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9",
      "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9" 
    ],
    imageUrl: `${GITHUB_BASE_URL}/question_4.png`,
    musicUrl: `${GITHUB_BASE_URL}/music_4.mp3`,
  },
  {
    id: 5,
    characterName: "",
    question: "",
    hashedAnswers: [
      "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9",
      "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9" 
    ],
    imageUrl: `${GITHUB_BASE_URL}/question_5.png`,
    musicUrl: `${GITHUB_BASE_URL}/music_5.mp3`,
  },
  {
    id: 6,
    characterName: "",
    question: "",
    hashedAnswers: [
      "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9",
      "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9" 
    ],
    imageUrl: `${GITHUB_BASE_URL}/question_6.png`,
    musicUrl: `${GITHUB_BASE_URL}/music_6.mp3`,
  },
];

// 3. 版面配置參數 (LAYOUT CONFIGURATION)
// 您可以在此調整按鈕和輸入框的位置與大小
// 單位建議使用百分比 (%) 以確保在不同螢幕上的比例一致
export const LAYOUT_CONFIG = {
  HOME: {
    // HOME頁面的按鈕
    BUTTON: { bottom: '10%', left: '30%', width: '40%', height: '8%' },
  },
  START: {
    // START頁面的按鈕
    BUTTON: { bottom: '8%', left: '33%', width: '34%', height: '8%' },
  },
  NAME: {
    // 名字輸入頁
    INPUT: { bottom: '23%', left: '20%', width: '60%', height: '6%' },
    BUTTON: { bottom: '11%', left: '42%', width: '15%', height: '6%' },
  },
  GAME: {
    // 遊戲問答頁 (適用於所有關卡)
    // 第一個輸入框 (上方)
    INPUT_1: { bottom: '22%', left: '20%', width: '60%', height: '6%' },
    // 第二個輸入框 (下方)
    INPUT_2: { bottom: '14.5%', left: '20%', width: '60%', height: '6%' },
    // 播放聲音按鈕 (B)
    BTN_MUSIC: { bottom: '40%', left: '56%', width: '13%', height: '9%' },
    // 送出按鈕 (A)
    BTN_SUBMIT: { bottom: '7%', right: '43%', width: '14%', height: '6%' }, 
    // 錯誤訊息位置
    ERROR_MSG: { top: '58%' }
  },
  END: {
    // 結束頁面
    // 顯示玩家名字的區塊
    NAME_DISPLAY: { bottom: '23%', left: '18%', width: '65%', height: '6%' }
  }
};
