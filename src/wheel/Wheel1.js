import hand from '../img/hand.svg';
import outside from '../img/wheel-outside.svg';
import {  useRef, useState } from 'react';
function Wheel1() {
  const insideWheelRef = useRef(null);
  const bannerRef = useRef(null);
  const [myPrize, setMyPrize] = useState('');
  const [prizeType, setPrizeType] = useState('');
  const [drawing, setDrawing] = useState(false);
  const [circleNum, setCircleNum] = useState(1);//轉幾圈
  const pointerRef = useRef(null);
  const prizeNamesRef = useRef([]);

  const prizes = [// 用JSON存獎品資料
    {
      "id": 1,
      "name": "Wish",
      "icon": "bi bi-cake",
      "quantity": 5
    },
    {
      "id": 2,
      "name": "Anything",
      "icon": "bi bi-star",
      "quantity": 5
    },
    {
      "id": 3,
      "name": "Child",
      "icon": "bi bi-emoji-smile",
      "quantity": 4
    },
    {
      "id": 4,
      "name": "Flight",
      "icon": "bi bi-airplane",
      "quantity": 1
    },
    {
      "id": 5,
      "name": "Wifi",
      "icon": "bi bi-wifi-2",
      "quantity": 5
    },
    {
      "id": 6,
      "name": "Movie",
      "icon": "bi bi-film",
      "quantity": 0
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
  const orginColor = Array.from({ length: prizes.length })
    .map((_, i) => {
      const color = i % 2 !== 0 ? '#343BAA' : '#F0BEFF'
      return `${color}`
    })
  const [circleColor, setCircleColor] = useState(gradient);// 初始顏色用gradient
  const [choosenColor, setChoosenColor] = useState(orginColor);




  const drawIt = () => {
    setCircleColor(gradient);
    setChoosenColor(orginColor);



    if (totalNum === 0) {
      alert('你已經抽完了');
      return;
    }
    bannerRef.current.style.display = 'none'
    setDrawing(true);// disable 抽獎按鈕
    const index = Math.floor(Math.random() * totalNum);// 0~獎品數 隨機產生一個數字
    setMyPrize(allPrize[index]);// 抽中的獎品
    const choosen = prizes.find((prize) => prize.name === allPrize[index]);
    const colorArr = [...gradient];//淺拷貝
    const wordColorArr=[...orginColor];
    wordColorArr[choosen.id - 1]='white';
    //指到的字變白色
    colorArr[choosen.id - 1] = `#FF00BA ${360 / prizes.length * (choosen.id - 1)}deg  ${360 / prizes.length * (choosen.id)}deg`
    //指到的部分幾度到幾度變粉紅
    setPrizeType(choosen.icon);




    const newArr = allPrize.filter((_, i) => i !== index)// 把被抽中的 踢出陣列
    setAllPrize(newArr);
    setTotalNum(totalNum - 1);// 獎品數減一
    const rotateDeg = prizes.filter(prize => prize.name === allPrize[index])[0].id// 抽到哪個要轉幾度
    pointerRef.current.style.transition = "transform 4s ease "; // 旋轉4秒內完成
    pointerRef.current.style.transform = `rotate(${(360 / prizes.length) * rotateDeg + 360 * circleNum}deg)` // 總共轉幾度 
    // 360 * circleNum 為了讓指針保持順時針轉動 將他的度數不斷往上加
    // 所以他抽到哪個就轉幾度 再加上360的倍數
    // 第一次轉 360+獎品度數 第二次轉720+獎品度數
    // 後面的數字較大 指針就會保持順時針轉動
    setCircleNum(circleNum + 3); // 加的數字越大 轉越多圈
    setTimeout(() => {// 等4秒（指針轉完） 恢復按鈕
      bannerRef.current.style.display = 'flex';
      setCircleColor(colorArr)
      setChoosenColor(wordColorArr);
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
          position: 'relative',
        }}
      >
        <div className="banner  justify-content-between"
          style={{
            display: 'none',
            position: 'absolute',
            width: '100%',
            height: '237px',
            backgroundColor: '#343BAA',
            overflow: "hidden"
          }}
          ref={bannerRef}
        >
          <i className={prizeType}
            style={{
              position: 'absolute',
              top: '36px',
              left: '32px',
              fontSize: '45px',
              color: '#22299B'
            }}
          />
          <i className={prizeType}
            style={{
              position: 'absolute',
              top: '129px',
              left: '-30px',
              fontSize: '45px',
              color: '#22299B'
            }}
          />
          <i className={prizeType}
            style={{
              position: 'absolute',
              top: '200px',
              left: '118px',
              fontSize: '45px',
              color: '#22299B',
            }}
          />
          <i className={prizeType}
            style={{
              position: 'absolute',
              top: '-30px',
              left: '295px',
              fontSize: '45px',
              color: '#22299B',
            }}
          />
          <i className={prizeType}
            style={{
              position: 'absolute',
              top: '150px',
              left: '430px',
              fontSize: '45px',
              color: '#22299B',
            }}
          />
          <i className={prizeType}
            style={{
              position: 'absolute',
              top: '-30px',
              right: '295px',
              fontSize: '45px',
              color: '#22299B',
            }}
          />
          <i className={prizeType}
            style={{
              position: 'absolute',
              top: '200px',
              right: '243px',
              fontSize: '45px',
              color: '#22299B',
            }}
          />
          <i className={prizeType}
            style={{
              position: 'absolute',
              top: '128px',
              right: '10px',
              fontSize: '45px',
              color: '#22299B',
            }}
          />
          <i className={prizeType}
            style={{
              position: 'absolute',
              top: '15px',
              right: '-30px',
              fontSize: '45px',
              color: '#22299B',
            }}
          />

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
              backgroundImage: `conic-gradient(${circleColor})`,
              transform: `rotate(30deg)`
            }}
            ref={insideWheelRef}
          >
            <img src={outside} alt=""
              style={{
                transform: `rotate(30deg)`
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
                    color: choosenColor[i]
                  }}
                  ref={(el) => {
                    prizeNamesRef.current[i] = el;
                    return prizeNamesRef.current[i]
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
                rotate: "-30deg",
                transformOrigin: "65px 145px"
              }}
              className='pointer'
              ref={pointerRef}
            />
            <button type='button'
              className="press d-flex align-items-center justify-content-center"
              style={{
                rotate: "-30deg",
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

export default Wheel1;