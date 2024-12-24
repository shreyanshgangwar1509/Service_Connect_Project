import axios from 'axios';
const Profile = async()=> {
    
    const token = localStorage.getItem('token') || '';
    // const decode = 
    console.log(token);
    
    const response = await axios.get(`${process.env.BACKEND_URL}/api/auth/me`);
    
    return (
      response ?(
            <div>
                <img src={response.data.avatar.url} />
                <h1>{response.data.name}</h1>
                <h2>{response.data.email}</h2>
                
    </div>):(<div>Error in fetching profile Server Error</div>)
  )
}

export default Profile