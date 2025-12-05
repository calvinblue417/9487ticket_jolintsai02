
import React, { useState, useEffect, useRef } from 'react';
import { PlayerState } from './types';
import { GAME_LEVELS, IMAGES, LAYOUT_CONFIG, GAME_START_TIME } from './constants';
import { RedButton } from './components/RedButton';

// ============================================================================
// === 工具函式 ===
// ============================================================================

// 1. SHA256 加密
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// ============================================================================
// === 元件：Layer (單一層級) ===
// ============================================================================
const Layer = ({ 
  zIndex, 
  isVisible, 
  children 
}: { 
  zIndex: number; 
  isVisible: boolean; 
  children: React.ReactNode 
}) => {
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-transparent`}
      style={{ 
        zIndex, 
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      <div className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// === 元件：BackgroundImage (背景圖) ===
// ============================================================================
const BackgroundImage = ({ src }: { src: string }) => (
  <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
    <img 
      src={src} 
      alt="Screen" 
      className="max-w-full max-h-full w-full h-full object-contain select-none"
    />
  </div>
);

// ============================================================================
// === 元件：ErrorMessage (錯誤提示) ===
// ============================================================================
const ErrorMessage = ({ show }: { show: boolean }) => (
  <div 
    className={`absolute left-0 right-0 text-center pointer-events-none z-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
    style={{ top: LAYOUT_CONFIG.GAME.ERROR_MSG.top }}
  >
    <span className="text-red-600 font-bold text-2xl bg-white/95 px-2 py-2 rounded-full shadow-2xl border-1 border-red-500">
      答錯囉
    </span>
  </div>
);

// ============================================================================
// === 主程式 App ===
// ============================================================================

export default function App() {
  const [isHomeLoaded, setIsHomeLoaded] = useState(false); // 控制 Home 是否載入完成
  const [globalStep, setGlobalStep] = useState(0);

  const [playerState, setPlayerState] = useState<PlayerState>({
    name: '',
    currentLevelIndex: 0,
    score: 0,
  });

  const [inputName, setInputName] = useState('');
  const [inputAnswer1, setInputAnswer1] = useState('');
  const [inputAnswer2, setInputAnswer2] = useState('');
  
  // 獨立追蹤兩個輸入框的錯誤狀態
  const [errorFlags, setErrorFlags] = useState({ input1: false, input2: false });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  
  // 倒數計時遮罩狀態
  const [showOverlay, setShowOverlay] = useState(true);
  const [countdownText, setCountdownText] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // === 圖片預載入邏輯 ===
  useEffect(() => {
    // 1. 強制優先載入 HOME 圖片
    const homeImg = new Image();
    homeImg.src = IMAGES.HOME;
    
    homeImg.onload = () => {
      // Home 載入完成後，才顯示畫面
      setIsHomeLoaded(true);
      
      // 2. 接著在背景靜默載入其他所有圖片
      const otherImages = [
        IMAGES.START,
        IMAGES.NAME,
        IMAGES.END,
        ...GAME_LEVELS.map(l => l.imageUrl)
      ];
      otherImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    // 處理載入錯誤 (避免卡死)
    homeImg.onerror = () => {
      console.error("Home image failed to load");
      setIsHomeLoaded(true); // 即使失敗也顯示，避免白畫面
    };
  }, []);

  // === 倒數計時遮罩邏輯 ===
  useEffect(() => {
    const targetTime = new Date(GAME_START_TIME).getTime();

    const checkTime = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setShowOverlay(false);
        setCountdownText("");
      } else {
        setShowOverlay(true);
        // 計算剩餘時分秒
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdownText(`${hours}時${minutes}分${seconds}秒`);
      }
    };

    // 立即檢查一次
    checkTime();

    // 每秒檢查
    const timer = setInterval(checkTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextStep = () => {
    setGlobalStep(prev => prev + 1);
    setInputAnswer1('');
    setInputAnswer2('');
    setErrorFlags({ input1: false, input2: false });
  };

  const handleStartGame = () => {
    nextStep(); 
  };

  const handleToName = () => {
    nextStep();
  };

  const handleNameSubmit = () => {
    if (inputName.trim()) {
      setPlayerState(prev => ({ ...prev, name: inputName }));
      nextStep();
    }
  };

  const playMusic = (url: string) => {
    if (url) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  const handleAnswerSubmit = async (levelIndex: number) => {
    const currentLevel = GAME_LEVELS[levelIndex];
    const val1 = inputAnswer1.toLowerCase().trim();
    const val2 = inputAnswer2.toLowerCase().trim();

    const hash1 = await sha256(val1);
    const hash2 = await sha256(val2);

    const isCorrect1 = hash1 === currentLevel.hashedAnswers[0];
    const isCorrect2 = hash2 === currentLevel.hashedAnswers[1];

    if (isCorrect1 && isCorrect2) {
      setShowErrorMessage(false);
      setErrorFlags({ input1: false, input2: false });
      const nextLevelIdx = levelIndex + 1;
      setPlayerState(prev => ({ ...prev, currentLevelIndex: nextLevelIdx }));
      nextStep();
    } else {
      // 設定個別輸入框的錯誤狀態
      setErrorFlags({
        input1: !isCorrect1,
        input2: !isCorrect2
      });
      setShowErrorMessage(true);
      
      // 1秒後移除錯誤訊息
      setTimeout(() => setShowErrorMessage(false), 1000);
    }
  };

  // 若 HOME 還沒載入好，顯示空背景 (或您想要的 Loading 畫面)，避免閃爍
  if (!isHomeLoaded) {
    return (
      <div className="w-screen h-[100dvh] bg-gradient-to-b from-[#4bc5f4] to-[#84bf65] flex items-center justify-center">
        {/* 可以放 Loading Spinner，這裡先留白保持乾淨 */}
      </div>
    );
  }

  // 計算名字的字體比例 (End Screen)
  // 係數設定為 90 以保留安全邊距
  const nameLength = Math.max(playerState.name.length, 1);
  const nameFontSize = `min(60cqh, ${90 / nameLength}cqw)`;

  return (
    // 外層滿版容器
    <div className="w-screen h-[100dvh] overflow-hidden bg-gradient-to-b from-[#4bc5f4] to-[#84bf65] flex items-center justify-center p-0">
      
      {/* 倒數計時遮罩 (Overlay) - 黑色半透明 (90%) */}
      {showOverlay && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold font-mono tracking-widest">
            {countdownText}
          </h1>
        </div>
      )}

      {/* 
        主遊戲容器：嚴格尺寸計算 (Strict Dimensioning)
        強制寬度 = min(100vw, 75dvh)
        強制高度 = min(100dvh, 133.33vw)
        這保證了容器永遠是 3:4 (0.75) 比例，且一定塞滿螢幕長邊或寬邊，絕不跑版
      */}
      <div 
        className="relative shadow-2xl bg-transparent overflow-hidden"
        style={{
          width: 'min(100vw, 75dvh)',
          height: 'min(100dvh, 133.333vw)',
        }}
      >
        
        {/* === Layer 9: END (Bottom) === */}
        <Layer zIndex={10} isVisible={true}> 
          <BackgroundImage src={IMAGES.END} />
          <div 
            className="absolute flex justify-center z-10"
            style={LAYOUT_CONFIG.END.NAME_DISPLAY}
          >
            {/* 加入 containerType: 'size' 以支援 cqw/cqh */}
            <div 
              // 改為全透明 (bg-transparent, no border)，移除紅底
              className="bg-transparent px-2 py-0 rounded-2xl w-full h-full flex items-center justify-center"
              style={{ containerType: 'size' }} 
            >
              <p 
                // 移除 leading-none，改用 flex 垂直置中
                className="font-bold text-black drop-shadow-sm whitespace-nowrap overflow-hidden"
                style={{ fontSize: nameFontSize }}
              >
                {playerState.name}
              </p>
            </div>
          </div>
        </Layer>

        {/* === Layers 3-8: GAME QUESTIONS === */}
        {GAME_LEVELS.slice().reverse().map((level, reverseIndex) => {
           const stepIndex = 2 + level.id;
           const zIdx = 40 - level.id; 

           // 檢查這層是否正在顯示錯誤 (只有當前步驟才顯示)
           const isCurrentLevel = globalStep === stepIndex;
           
           return (
             <Layer key={level.id} zIndex={zIdx} isVisible={globalStep <= stepIndex}>
               <BackgroundImage src={level.imageUrl} />
               
               <ErrorMessage show={showErrorMessage && isCurrentLevel} />

               {/* 輸入框 1 */}
               <input
                 type="text"
                 value={inputAnswer1}
                 onChange={(e) => setInputAnswer1(e.target.value)}
                 placeholder="請輸入歌詞"
                 // [設定] 依您需求保留 border-1
                 className={`
                   absolute p-3 rounded-xl text-center text-xl text-black font-bold outline-none shadow-lg bg-white/90
                   ${errorFlags.input1 && isCurrentLevel ? 'border-red-600 border-1 ring-2 ring-red-500 animate-pulse' : 'border-gray-300 border-1'}
                 `}
                 style={LAYOUT_CONFIG.GAME.INPUT_1}
               />

               {/* 輸入框 2 */}
               <input
                 type="text"
                 value={inputAnswer2}
                 onChange={(e) => setInputAnswer2(e.target.value)}
                 placeholder="請輸入歌名"
                 // [設定] 依您需求保留 border-1
                 className={`
                   absolute p-3 rounded-xl text-center text-xl text-black font-bold outline-none shadow-lg bg-white/90
                   ${errorFlags.input2 && isCurrentLevel ? 'border-red-600 border-1 ring-2 ring-red-500 animate-pulse' : 'border-gray-300 border-1'}
                 `}
                 style={LAYOUT_CONFIG.GAME.INPUT_2}
               />

               {/* 按鈕 B: 播放聲音 */}
               <RedButton 
                 onClick={() => playMusic(level.musicUrl)} 
                 className="absolute"
                 style={LAYOUT_CONFIG.GAME.BTN_MUSIC}
               >
                 播放聲音
               </RedButton>
               
               {/* 按鈕 A: 送出 */}
               <RedButton 
                 onClick={() => handleAnswerSubmit(level.id - 1)} 
                 className="absolute"
                 style={LAYOUT_CONFIG.GAME.BTN_SUBMIT}
               >
                 送出
               </RedButton>

             </Layer>
           );
        })}

        {/* === Layer 2: NAME === */}
        <Layer zIndex={48} isVisible={globalStep <= 2}>
          <BackgroundImage src={IMAGES.NAME} />
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="建議複製貼上"
            className="absolute text-center text-1xl text-black font-bold rounded-xl shadow-lg outline-none bg-white/90 border-2 border-gray-300 placeholder-gray-400"
            style={LAYOUT_CONFIG.NAME.INPUT}
          />
          <RedButton 
            onClick={handleNameSubmit} 
            className="absolute"
            style={LAYOUT_CONFIG.NAME.BUTTON}
          >
            確認
          </RedButton>
        </Layer>

        {/* === Layer 1: START === */}
        <Layer zIndex={49} isVisible={globalStep <= 1}>
           <BackgroundImage src={IMAGES.START} />
           <RedButton 
             onClick={handleToName} 
             className="absolute"
             style={LAYOUT_CONFIG.START.BUTTON}
           >
             
           </RedButton>
        </Layer>

        {/* === Layer 0: HOME (Top) === */}
        <Layer zIndex={50} isVisible={globalStep <= 0}>
           <BackgroundImage src={IMAGES.HOME} />
           <RedButton 
             onClick={handleStartGame} 
             className="absolute"
             style={LAYOUT_CONFIG.HOME.BUTTON}
           >
             HOME
           </RedButton>
        </Layer>

      </div>
    </div>
  );
}
