import { useParams } from "react-router-dom"
import Profile from "../Profile/Profile";



export default function UserPage() {

    const { id } = useParams()
    console.log(id);




  return (
    <div>
        
        <h1>  User  {id} </h1>
        <Profile />

    </div>
  )
}
