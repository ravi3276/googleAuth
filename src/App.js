import './App.css';
import { GoogleLogin } from 'react-google-login';
import { useState } from 'react';

function App() {
  const [login, setLogin] = useState(
    localStorage.getItem('loginData') ? 
    JSON.parse(localStorage.getItem('loginData')) :
    null
  );

  const loginHandle = async (googleData) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setLogin(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };

  const failureHandle=(res)=>{
    alert(res)
  }
  const logout=()=>{
    localStorage.removeItem('loginData')
    setLogin(null)
  }
  return (
    <div className="app">
        <div className="app__container">
          <h2>google authentication</h2>
          {
            login ? (
              <div className="app__container__logout">
                <h3>your mail address {login.email}</h3>
                <button onClick={logout}>Logout</button>
              </div>
            ):(
              <GoogleLogin
              clientId="356602636451-gabt98dfj9gsqurtps405g85btv90gcp.apps.googleusercontent.com"
              buttonText="Login With Google"
              onSuccess={loginHandle}
              onFailure={failureHandle}
              cookiePolicy={'single_host_origin'}
              >
              </GoogleLogin>
            )
          }
        </div>
    </div>
  );
}

export default App;
