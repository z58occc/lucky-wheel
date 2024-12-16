import hand from '../img/hand.svg';
import outside from '../img/wheel-outside.svg';
import { useRef, useState } from 'react';
function Wheel2() {
  const bannerRef = useRef(null);
  const [myPrize, setMyPrize] = useState('');
  const [drawing, setDrawing] = useState(false);
  const [circleNum, setCircleNum] = useState(1);//轉幾圈
  const pointerRef = useRef(null);
  const prizes = [// 用JSON存獎品資料
    {
      "id": 1,
      "name": 1,
      "quantity": 1
    },
    {
      "id": 2,
      "name": 2,
      "quantity": 1
    },
    {
      "id": 3,
      "name": 3,
      "quantity": 1
    },
    {
      "id": 4,
      "name": 4,
      "quantity": 1
    },
    {
      "id": 5,
      "name": 5,
      "quantity": 1
    },
    {
      "id": 6,
      "name": 6,
      "quantity": 1
    },
    {
      "id": 7,
      "name": 7,
      "quantity": 1
    },
    {
      "id": 8,
      "name": 8,
      "quantity": 1
    },
    {
      "id": 9,
      "name": 9,
      "quantity": 1
    },
    {
      "id": 10,
      "name": 10,
      "quantity": 1
    },
    {
      "id": 11,
      "name": 11,
      "quantity": 1
    },
    {
      "id": 12,
      "name": 12,
      "quantity": 1
    },
    {
      "id": 13,
      "name": 13,
      "quantity": 1
    },
    {
      "id": 14,
      "name": 14,
      "quantity": 1
    },
    {
      "id": 15,
      "name": 15,
      "quantity": 1
    },
    {
      "id": 16,
      "name": 16,
      "quantity": 1
    },
    {
      "id": 17,
      "name": 17,
      "quantity": 5
    },
    {
      "id": 18,
      "name": 18,
      "quantity": 10
    },
    {
      "id": 19,
      "name": 19,
      "quantity": 20
    },
    {
      "id": 20,
      "name": 20,
      "quantity": 69
    }
  ]
  const generateAllPrizes = () => { // 產生20個獎品的陣列
    return prizes.flatMap(prize => Array(prize.quantity).fill(prize.name));
  };
  const [allPrize, setAllPrize] = useState(generateAllPrizes());// 20個獎品的陣列
  const [totalNum, setTotalNum] = useState(allPrize.length);//  目前還有多少獎品


  const gradient = Array.from({ length: prizes.length })
    .map((_, i) => {
      const startAngle = 360 / prizes.length * i
      const endAngle = 360 / prizes.length * (i + 1);
      const color = i % 2 === 0 ? '#343BAA' : '#F0BEFF'
      return `${color} ${startAngle}deg ${endAngle}deg`
    })
    .join(', ');
  const drawIt = () => {
    if (totalNum === 0) {
      alert('你已經抽完了');
      return;
    }
    bannerRef.current.style.display = 'none'
    setDrawing(true);// disable 抽獎按鈕
    const index = Math.floor(Math.random() * totalNum);// 0~獎品數 隨機產生一個數字
    setMyPrize(allPrize[index]);// 抽中的獎品
    const newArr = allPrize.filter((_, i) => i !== index)// 把被抽中的 踢出陣列
    setAllPrize(newArr);
    setTotalNum(totalNum - 1);// 獎品數減一
    const rotateDeg = prizes.filter(prize => prize.name === allPrize[index])[0].id// 抽到哪個要轉幾度
    pointerRef.current.style.transition = "transform 4s ease "; // 旋轉4秒內完成
    pointerRef.current.style.transform = `rotate(${((360 / prizes.length) * rotateDeg+(360 / prizes.length) * (rotateDeg-1))/2
       + 360 * circleNum}deg)` // 總共轉幾度 
    // 360 * circleNum 為了讓指針保持順時針轉動 將他的度數不斷往上加
    // 所以他抽到哪個就轉幾度 再加上360的倍數
    // 第一次轉 360+獎品度數 第二次轉720+獎品度數
    // 後面的數字較大 指針就會保持順時針轉動
    setCircleNum(circleNum + 3); // 加的數字越大 轉越多圈
    setTimeout(() => {// 等4秒（指針轉完） 恢復按鈕
      bannerRef.current.style.display = 'flex';
      setDrawing(false);
    }, 4000);
  }

  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Chocolate+Classical+Sans&family=Noto+Sans+TC:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Shippori+Mincho&display=swap" rel="stylesheet" />
      <div className='vh-100 d-flex align-items-center justify-content-center'
        style={{
          backgroundColor: '#5858B9',
          position: 'relative'
        }}
      >
        <div className="banner  justify-content-between"
          style={{
            display: 'none',
            position: 'absolute',
            width: '100%',
            height: '237px',
            backgroundColor: '#343BAA',
          }}
          ref={bannerRef}
        >

          <div className="text-left">
            WELL DONE!
          </div>
          <div className="text-right">
            <div className='you-get'>YOU GET A FREE...</div>
            <div className='final-prize'>{myPrize}!</div>
          </div>
        </div>
        <div className="outside-wheel d-flex align-items-center justify-content-center"
          style={{
            height: '540px',
            width: '540px',
            backgroundColor: "#22299B",
            borderRadius: '100%',
            position: 'relative'
          }}
        >

          <div className="inside-wheel d-flex align-items-center justify-content-center"
            style={{
              height: '500px',
              width: '500px',
              borderRadius: '100%',
              position: 'relative',
              backgroundImage: `conic-gradient(${gradient})`,
              transform: `rotate(-${360 / prizes.length / 2}deg)`
              // 沒有rotate會以圓的0度為正上方 20跟1的交界
              // rotate後正上方變為1的中間
              // 因為有編號 所以初始化想讓1在中間

            }}
          >
            <img src={outside} alt=""
              style={{
                transform: `rotate(${360 / prizes.length / 2}deg)`
              }}
            />

            {prizes.map((prize, i) => {
              return (
                <div key={i}
                  className='d-grid '
                  style={{
                    position: 'absolute',
                    transform: `
                    rotate(${(360 / prizes.length) * i - 90 + (360 / prizes.length / 2)}deg)
                    translate(200px) 
                    rotate(90deg)`,
                    color: i % 2 !== 0 ? '#343BAA' : '#F0BEFF'
                  }}
                >
                  <i className={`${prize.icon} ms-auto me-auto`}
                    style={{
                      fontSize: '64px',
                      height: '80px'
                    }}
                  />
                  <div className='prize-name d-flex align-items-center justify-content-center'
                  >
                    {prize.name}
                  </div>

                </div>
              )
            })}
            <img src={hand} alt=""
              style={{
                position: 'absolute',
                bottom: '37%',
                transform: `rotate(${360 / prizes.length / 2}deg)`,
                // rotate: "-30deg",
                transformOrigin: "65px 145px"
              }}
              className='pointer'
              ref={pointerRef}
            />
            <button type='button'
              className="press d-flex align-items-center justify-content-center"
              style={{
                transform: `rotate(${360 / prizes.length / 2}deg)`,

                // rotate: "-30deg",
                border: 'none',
                position: "absolute",
                zIndex: '1000'
              }}
              onClick={() => drawIt()}
              disabled={drawing}
            >
              PRESS
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Wheel2;