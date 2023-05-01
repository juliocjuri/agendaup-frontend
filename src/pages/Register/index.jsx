import { Component } from "react";
import Api from "../../services/api";
import { Navigate } from "react-router-dom";

class Register extends Component {
     constructor(props){
          super(props);
          this.state = { 
               registerName: '',
               registerEmail: '',
               registerPassword: '',
               navigateTo: <></>
          }
     }

     async register(){
          const registration = {
               name: this.state.registerName,
               email: this.state.registerEmail,
               password: this.state.registerPassword
          }

          const res = await Api.register(registration).then((result) => {
               if(result.status == 200){
                    localStorage.setItem('token', result.data.token)
                    this.setState({
                         navigateTo: <Navigate to='/home'/>
                    })
               }
          })
     }

     render(){
          return(
               <div className='container'>
                    {this.state.navigateTo}
                    <div className='login-wrapper'>
                         <header className='login-header'>
                              <img src='/assets/logo.png' className='logo' />
                              <div className='login-title'>
                                   Crie sua conta
                              </div>
                         </header>
                         <main className='login-content'>
                              <form 
                                   className='login-form'>
                                   
                                   <label>
                                        Nome:
                                   </label>
                                   <input 
                                        type="text" 
                                        placeholder='Alan Turing'
                                        onChange={(value) => {
                                             this.setState({
                                                  registerName: value.target.value
                                             })
                                        }}
                                   />
                                   <label>
                                        Email:
                                   </label>
                                   <input 
                                        type="text" 
                                        placeholder='ada@lovelace.com'
                                        onChange={(value) => {
                                             this.setState({
                                                  registerEmail: value.target.value
                                             })
                                        }}
                                   />
                                   <label>
                                        Senha:
                                   </label>
                                   <input 
                                        type="text" 
                                        placeholder='•••••••••'
                                        onChange={(value) => {
                                             this.setState({
                                                  registerPassword: value.target.value
                                             })
                                        }}
                                   />
                              </form>
                                   <button
                                        className='login-input-button' 
                                        onClick={() => this.register()}
                                   >
                                        Registrar
                                   </button>
                         </main>
                    </div>
               </div>

          )
     }
}

export default Register;