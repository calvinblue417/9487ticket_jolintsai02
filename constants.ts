
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
export const GAME_START_TIME = "2025-12-12T23:00:00+08:00"; 

// 2. 遊戲關卡設定 (6個角色 / 6個題目)
// 題目需求：每個關卡有 2 個答案，必須都答對。
// 注意：目前的 Hash 為範例，請務必重新生成正確答案的 SHA256 並貼上
export const GAME_LEVELS: LevelData[] = [
  {
    id: 1,
    characterName: "",
    question: "",
    hashedAnswers: [
      "879c8ded87a1c112a42a412ae183e9c333ce8822d2998dd774920d57d40ad476", 
      "581b69848739dca90b3e282c93cb072dba0232338faf6b4dcf4c13b1bc994cf7" 
    ],
    imageUrl: `${GITHUB_BASE_URL}/question_1.png`,
    musicUrl: `${GITHUB_BASE_URL}/music_1.m4a`,
  },
  {
    id: 2,
    characterName: "",
    question: "",
    hashedAnswers: [
      "6562fb8683e820627efd3a812f5a47bad8af2bd522505e5d3a44f5e91c699756",
      "569f2d21da61db3053a717afd79fdf017bb7fa8d58ab88b5b51ac2e077c83110" 
    ],
    imageUrl: `${GITHUB_BASE_URL}/question_2.png`,
    musicUrl: `${GITHUB_BASE_URL}/music_2.m4a`,
  },
  {
    id: 3,
    characterName: "",
    question: "",
    hashedAnswers: [
      "e8475a816c88de0851f100a1220be8dace3cc182437bf3ae4423e54e95efc544",
      "56f4960b17d679a3903390fe15e54299db3f7988b9267bff296cccfea4f6e935" 
    ],
    imageUrl: `${GITHUB_BASE_URL}/question_3.png`,
    musicUrl: `${GITHUB_BASE_URL}/music_3.m4a`,
  },
  {
    id: 4,
    characterName: "",
    question: "",
    hashedAnswers: [
      "b01024d0f433363feed6be11c76ec47bcc90babf85631d4f21d46cfce4b23c5a",
      "7c5a2f95e8345a34d9fab0d0a620abdbfcc62a86863c329184a93da53b4ebb7a" 
    ],
    imageUrl: `${GITHUB_BASE_URL}/question_4.png`,
    musicUrl: `${GITHUB_BASE_URL}/music_4.m4a`,
  },
  {
    id: 5,
    characterName: "",
    question: "",
    hashedAnswers: [
      "94a3f54842be807e78fa58fcaf459a97c0ab05a6ca3c6cb2d0a1cd5f1f98e7a3",
      "9b6b6ff78b73a3e6d13ceab88dada1a619742415d437847e6c700cf52531960b" 
    ],
    imageUrl: `${GITHUB_BASE_URL}/question_5.png`,
    musicUrl: `${GITHUB_BASE_URL}/music_5.m4a`,
  },
  {
    id: 6,
    characterName: "",
    question: "",
    hashedAnswers: [
      "eafc1ac2a150c81fa4ad84c1a00cfb21d62ce08cba4eb817303d64e396736e45",
      "cb3082aabedead13eb9206d4a2d5145945e4775423be677eff7e032ce43d10f1" 
    ],
    imageUrl: `${GITHUB_BASE_URL}/question_6.png`,
    musicUrl: `${GITHUB_BASE_URL}/music_6.m4a`,
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
    INPUT: { bottom: '22%', left: '20%', width: '60%', height: '6%' },
    BUTTON: { bottom: '13%', left: '42%', width: '15%', height: '6%' },
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
