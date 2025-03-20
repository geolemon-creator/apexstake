import MediaModal from "../Components/MediaModal"
import {media} from "./../Components/Data"

export default function Farming() {
  return (
    <div className='farming-countainer'>
      <div className="farming-main-div">
        <div className="farming-title">
            <h1 className='farming-h1'>Фарминг</h1>
        </div>

        <div className="farming-list-div">
          {media.map((media) => {
           return <MediaModal key={media.id} data={media} />
          })}
        </div>
        
      </div>
    </div>
  )
}
