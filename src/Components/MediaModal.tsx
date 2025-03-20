import { MediaID } from './Type'
import coin from "./../Img/coin.svg"
import { useState } from 'react'
import check from "./../Img/ok.svg"

interface MediaProps {
  data: MediaID
}

export default function MediaModal(props: MediaProps) {
  const [exam, setExam] = useState(false)

  const handleExamenation = () => {
    setExam(true);
  };

  return (
    <div onClick={handleExamenation} className={`media-div ${exam ? "exam-good" : ""}`}>
               <div className="media-img-div" >
                  <img className="media-img" src={props.data.img} alt="" />
               </div>

                <div className="media-title-div">
                    <p className="media-title">{props.data.title}</p>

                    <div className="media-coin-div">
                      <img className="media-coin-img" src={coin} />
                      <p className="coin-media-p">+{props.data.coin}</p>
                    </div>
                </div>
                
                <div className='media-arrow-div'>
                  {exam ? (<div className='chek-media-div'><img className='chek-media' src={check} /></div>) : (<span className="arrow-media">&gt;</span>)}
                    
                </div>
            </div>
  )
}
