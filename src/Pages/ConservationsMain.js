import Breadcrumbs from "../components/Breadcrumbs"
import ConversationsList from "../components/ConservationsList"

export default function ConservationsMain() {
  return (
  <>
    <div className='ml-1'><Breadcrumbs /></div>    
    <div className="ml-1 bg-white/5 backdrop-blur-md shadow-md"> 
      <h2 className="text-3xl font-bold text-pink-700 mb-1">Czaty</h2>
      <ConversationsList />
    </div>
  </>
  )
}
