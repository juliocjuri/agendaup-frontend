import React, { Component, useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import './style.css'
import schedules from '../../../devUtils/scheduleSchema';
import { Checkbox } from '@mui/material'
import  Api from '../../../services/api';

const oneWeekInMiliSeconds = 604800000;
const oneDayInMiliSeconds = 86400000;


class Home extends Component {
     constructor(props) {
          super(props);
          this.state = {
               thisWeekSchedules: [],
               nextWeekSchedules: [],
               userSchedules: [],
               currentUser: ''
          }
     }

     separateSchedulesByDate(){     
          this.state.userSchedules.map((schedule, index) => {
               const today = new Date(Date.now()).getDay();
               const firstDayOfWeekMS = new Date(Date.now()).getTime() - oneDayInMiliSeconds*today;
               const scheduleMS = new Date(schedule.date).getTime();
               if(firstDayOfWeekMS + oneWeekInMiliSeconds > scheduleMS){
                    this.setState((prev) => ({
                         thisWeekSchedules: [...prev.thisWeekSchedules, schedule]
                    }))
               }else{
                    this.setState((prev) => ({
                         nextWeekSchedules: [...prev.nextWeekSchedules, schedule]
                    }))
               }
          })

     }

     async fetchSchedules(){
          const res = await Api.getAllUserSchedules(localStorage.getItem('token')).then((result) => {
               console.log(result)
               const name = result.data.name.split(' ', 1);
               this.setState({
                    currentUser: name
               })
               result.data.schedules.map((schedule, index) => {
                    this.setState((prev) => ({
                         userSchedules: [...prev.userSchedules, schedule]
                    }), () => {
                         if(index == result.data.schedules.length - 1) this.separateSchedulesByDate()
                    })
                    
               })
          })
     }

     render() {

          return (
               <div className='container' onLoad={() => { this.fetchSchedules()}}>
                    <Sidebar />
                    <div className='page-wrapper'>
                         <header className='header-user-wrapper'>
                              <div className='header-user-title'>
                                   Olá, {this.state.currentUser}
                              </div>
                              <div className='header-user-subtitle'>
                                   Aqui está um resumo dos seus compromissos
                              </div>
                         </header>

                         <main>
                              <div className='completed-schedules-wrapper'>
                                   <ul>
                                        <li>Compromissos agendados essa semana: {
                                             this.state.thisWeekSchedules.length
                                             }
                                        </li>
                                        <li>Compromissos para a próxima semana: {
                                             this.state.nextWeekSchedules.length}</li>
                                   </ul>
                              </div>


                              <div className='week-schedules'>

                                   <div className='week-schedule-list'>
                                        <div className='main-title'>
                                             Compromissos dessa semana:
                                        </div>
                                        <ul>
                                             {this.state.thisWeekSchedules.map((item, index) => {
                                                  return (
                                                       <li className='week-schedule-item'>
                                                            <Checkbox />
                                                            {item.name}
                                                       </li>

                                                  )
                                             })}
                                        </ul>

                                   </div>

                                   <div className='week-schedule-list'>
                                        <div className='main-title'>
                                             Compromissos das próximas semanas:
                                        </div>
                                        <ul>
                                             {
                                             this.state.nextWeekSchedules.map((item, index) => {
                                                  return (
                                                       <li className='week-schedule-item'>
                                                            <Checkbox />
                                                            {item.name}
                                                       </li>

                                                  )
                                             })}
                                        </ul>

                                   </div>
                              </div>

                         </main>


                    </div>
               </div>
          )
     }
}

export default Home;