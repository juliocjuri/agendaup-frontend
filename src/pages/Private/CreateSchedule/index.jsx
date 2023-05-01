import React, { Component, useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import './style.css'
import { Checkbox } from '@mui/material'
import Api from '../../../services/api';
import DatePicker, { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal'
import ptbr from 'date-fns/locale/pt-BR'
registerLocale('pt-BR', ptbr)

Modal.setAppElement('#root');

class CreateSchedule extends Component {
     constructor(props) {
          super(props);
          this.state = {
               scheduleName: '',
               scheduleEmail: '',
               scheduleDate: new Date(Date.now()),
               scheduleInvitedEmails: [],
               scheduleCurrentInvintingEmail: '',
               isModalOpen: false
          }

     }
     resetScheduleInfo() {
          this.setState({
               scheduleName: '',
               scheduleEmail: '',
               scheduleDate: new Date(Date.now()),
               scheduleInvitedEmails: [],
               scheduleCurrentInvintingEmail: '',
          })
     }

     async getUser() {
          const response = await Api.getUser(localStorage.getItem('token'))
          this.setState({
               scheduleEmail: response.data.email
          })
     }

     async handleScheduleConfirmation() {
          const scheduleData = {
               name: this.state.scheduleName,
               user: this.state.scheduleEmail,
               date: this.state.scheduleDate.toLocaleDateString('pt-BR').toString(),
               invitedEmails: this.state.scheduleInvitedEmails,
          }


          //For some reason, the above date is printed correctly like a pt-BR date
          //But when I receive the email, dd and mm are swiped. Crazy!

          const res = await Api.createSchedule(scheduleData, localStorage.getItem('token')).then((result) => {
               if (result.status == 200) {
                    this.resetScheduleInfo();
                    this.setState({
                         isModalOpen: !this.state.isModalOpen
                    })
               }
          })
     }

     render() {
          return (
               <div className='container' onLoad={() => { this.getUser() }}>
                    <Modal
                         isOpen={this.state.isModalOpen}
                         className='modal'
                    >
                         <div className='modal-wrapper'>
                              <div>
                                   Agendamento realizado com sucesso
                              </div>
                              <button className='modal-btn' onClick={() => {
                                   this.getUser();
                                   this.setState({
                                        isModalOpen: !this.state.isModalOpen
                                   })
                              }}>
                                   Ok
                              </button>
                         </div>

                    </Modal>
                    <Sidebar />
                    <header className='create-schedule-header'>
                         Agende um compromisso
                    </header>
                    <main className='create-schedule-wrapper'>
                         <label>
                              Título:
                         </label>
                         <input
                              type="text"
                              placeholder='Nomeie o seu compromisso'
                              onChange={(name) => {
                                   this.setState({
                                        scheduleName: name.target.value
                                   })
                              }}
                              value={this.state.scheduleName}
                         />
                         <label>
                              Data
                         </label>
                         <DatePicker 
                              className='calendar-wrapper' 
                              selected={this.state.scheduleDate}
                              locale='pt-BR' 
                              onChange={(date) => {
                                        console.log('date' + date)
                              this.setState({
                                   scheduleDate: date
                              })
                         }} />
                         <div className='invite-wrapper'>
                              <div className='invite-wrapper-inner'>
                                   <label>
                                        Convidados:
                                   </label>
                                   <input
                                        type="text"
                                        placeholder='Adicione um convidado'
                                        onChange={(email) => {
                                             this.setState({
                                                  scheduleCurrentInvintingEmail: email.target.value
                                             })
                                        }}
                                   />
                                   <ul>
                                        {
                                             this.state.scheduleInvitedEmails.map((email, index) => {
                                                  return (
                                                       <div className='invited-email-wrapper'>
                                                            <li className='invited-email-element'>
                                                                 {email}
                                                            </li>
                                                            <button className='invited-email-remove-btn' onClick={() => {
                                                                 this.setState({
                                                                      scheduleInvitedEmails: this.state.scheduleInvitedEmails.filter(function (emailToRemove) {
                                                                           return emailToRemove !== email
                                                                      })
                                                                 })
                                                            }}>
                                                                 Remover
                                                            </button>
                                                       </div>
                                                  )
                                             })
                                        }
                                   </ul>
                              </div>
                              <button className='invite-add-btn' onClick={() => {
                                   this.setState(prev => ({
                                        scheduleInvitedEmails: [...prev.scheduleInvitedEmails, this.state.scheduleCurrentInvintingEmail]
                                   }))
                              }}>
                                   Adicionar
                              </button>
                         </div>
                         <button className='schedule-confirmation-btn' onClick={() => {
                              this.handleScheduleConfirmation()
                         }}>
                              Agendar
                         </button>
                    </main>
               </div>
          )
     }

}

export default CreateSchedule;