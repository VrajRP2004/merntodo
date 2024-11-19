import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [credential,setCredentials] = useState({email:"",password:""});
  function onchange(e){
    setCredentials({...credential,[e.target.name]:e.target.value});
  }
  async function handleonclick(){
    const response = await fetch('http://localhost:5000/api/auth/login',{
      method:'POST',
      headers:{
        'Content-Type':"application/json"
      },
      body: JSON.stringify({email:credential.email,password:credential.password})
    });
    const data = await response.json();
    // console.log(data.user._id)

    if(data.success){
      
      localStorage.setItem('idid', data.user._id);
      navigate('/home', {state:data})
    }else{
      alert('you did mistake in giving right data')
    }
    
  }
  function handleonsignup(){
    navigate('/signup')
  }
  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="username">Username</label>
          <input type="text" name="email" id="username" value={credential.email} onChange={onchange} style={styles.input} />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id="password" value={credential.password} onChange={onchange} style={styles.input} />
        </div>
        <button type="button" style={styles.button} onClick={handleonclick}>Login</button>
        <button type="button" style={styles.button} onClick={handleonsignup}>SignUp</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    marginTop:'10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Login;