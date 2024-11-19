import React,{ useState } from 'react';
import { useNavigate} from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const [credentials,setCredentials] = useState({name:"",email:"",password:""})
  function onChange(e){
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  async function handleonclick(e){
    // e.preventdefault()
    try{
      const response = await fetch("http://localhost:5000/api/auth/createuser",{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
      });
      const data = await response.json();
      console.log(data)
      console.log(data.user._id)
      if(data.success){
      localStorage.setItem('idid', data.user._id);
        navigate(`/home`);      
      }else{
        alert('you did mistake in giving right data')
      }
    }catch(error){
      console.log(error.message)
    }
    }
  function handleonlogin(){
    navigate('/')
  }
  
  return (
    <div style={styles.container}>
      <h2>SignUp</h2>
      <form style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name='name' value={credentials.name} onChange={onChange} style={styles.input} />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name='email' value={credentials.email} onChange={onChange} style={styles.input} />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name='password' value={credentials.password} onChange={onChange} style={styles.input} />
        </div>
        <button type="button" style={styles.button} onClick={handleonclick}>Sign In</button>
        <button type="button" style={styles.button} onClick={handleonlogin}>Login</button>
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

export default Signup;