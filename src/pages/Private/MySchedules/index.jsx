import React, { Component, useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import './style.css'
import { Checkbox } from '@mui/material'
import Api from '../../../services/api';


class MySchedules extends Component {
     constructor(props) {
          super(props);
          this.state = {
               selectedFilter: 'all',
               schedules: [],
               user: ''
          }
     }


     async fetchSchedules() {
          if (!localStorage.getItem('token')) alert("Redirect to login")
          else {
               const res = await Api.getAllUserSchedules(localStorage.getItem('token')).then((result) => {

                    console.log(result.data.schedules[0].date)
                    this.setState({
                         user: result.data.user
                    })
                    for (let i = 0; i < result.data.schedules.length; i++) {
                         this.setState(prev => ({
                              schedules: [...prev.schedules, result.data.schedules[i]]
                         }))
                    }
               })
               return res
          }
     }

     render() {
          return (
               <div className='container' onLoad={() => {
                    this.fetchSchedules()
               }}>
                    <Sidebar />
                    <header className='schedules-header'>
                         Meus compromissos
                    </header>
                    <main className='schedules-wrapper'>
                         <label for="cars">Filtro</label>
                         <select name="filter" id="filter" onChange={(e) => {
                              this.setState({
                                   selectedFilter: e.target.value
                              })
                         }}>
                              <option value="all" selected >Todos</option>
                              <option value="myself">Marcados por mim</option>
                              <option value="other" >Marcados por outros</option>
                         </select>

                         <div className='schedule-list'>
                              <ul>
                                   {
                                        this.state.schedules.map((schedule, index) => {
                                             if (this.state.selectedFilter == 'all') {
                                                  return (
                                                       <li className='schedule-item'>
                                                            <header className='schedule-item-header'>
                                                                 <div className='schedule-title'>
                                                                      {schedule.name}
                                                                 </div>
                                                            </header>
                                                            <div className='schedule-detail'>
                                                                 Data: {schedule.date}
                                                            </div>
                                                            <div className='schedule-detail'>
                                                                 Organizador: {schedule.user}
                                                            </div>
                                                            <div className='schedule-detail'>
                                                                 Participantes:
                                                                 <br /> <br />{schedule.invitedEmails.map((email, index) => {
                                                                      return (
                                                                           <>
                                                                                {index + 1}. {email} <br />
                                                                           </>
                                                                      )
                                                                 })}
                                                            </div>
                                                       </li>
                                                  )
                                             } else if (this.state.selectedFilter == 'myself') {
                                                  if (schedule.user == this.state.user) {
                                                       return (
                                                            <li className='schedule-item'>
                                                                 <header className='schedule-item-header'>
                                                                      <div className='schedule-title'>
                                                                           {schedule.name}
                                                                      </div>
                                                                 </header>
                                                                 <div className='schedule-detail'>
                                                                      Data: {schedule.date}
                                                                 </div>
                                                                 <div className='schedule-detail'>
                                                                      Organizador: {schedule.user}
                                                                 </div>
                                                                 <div className='schedule-detail'>
                                                                      Participantes:
                                                                      <br /> <br />{schedule.invitedEmails.map((email, index) => {
                                                                           return (
                                                                                <>
                                                                                     {index + 1}. {email} <br />
                                                                                </>
                                                                           )
                                                                      })}
                                                                 </div>
                                                            </li>
                                                       )
                                                  }
                                             } else if (this.state.selectedFilter == 'other') {
                                                  if (schedule.invitedEmails.includes(this.state.user)) {
                                                       return (
                                                            <li className='schedule-item'>
                                                                 <header className='schedule-item-header'>
                                                                      <div className='schedule-title'>
                                                                           {schedule.name}
                                                                      </div>
                                                                 </header>
                                                                 <div className='schedule-detail'>
                                                                      Data: {schedule.date}
                                                                 </div>
                                                                 <div className='schedule-detail'>
                                                                      Organizador: {schedule.user}
                                                                 </div>
                                                                 <div className='schedule-detail'>
                                                                      Participantes:
                                                                      <br /> <br />{schedule.invitedEmails.map((email, index) => {
                                                                           return (
                                                                                <>
                                                                                     {index + 1}. {email} <br />
                                                                                </>
                                                                           )
                                                                      })}
                                                                 </div>
                                                            </li>
                                                       )
                                                  }
                                             }
                                        }).reverse()
                                   }
                              </ul>

                         </div>
                    </main>
               </div>
          )
     }

}

export default MySchedules;