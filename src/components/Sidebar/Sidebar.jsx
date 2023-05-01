import React, { Component, useState } from 'react';
import './Sidebar.css'
import {
     FaBars,
     FaHome,
     FaBell,
     FaList,
     FaPlus,
     FaSignOutAlt
} from 'react-icons/fa'
import { Navigate } from 'react-router-dom';

class Sidebar extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpened: false,
               rotate: false,
               navigateTo: <></>
          }
          this.menuItems = [
               {
                    path: "/home",
                    name: "Home",
                    icon: <FaHome className='sidebar-item-icon' color='#0048a7' />
               },
               {
                    path: "/createschedule",
                    name: "Agendar",
                    icon: <FaPlus className='sidebar-item-icon' color='#0048a7' />
               },
               {
                    path: "/myschedules",
                    name: "Agendamentos",
                    icon: <FaList className='sidebar-item-icon' color='#0048a7' />
               },
               {
                    path: "/",
                    name: "Sair",
                    icon: <FaSignOutAlt className='sidebar-item-icon' color='#0048a7' />
               }
          ];


     }

     resetPath() {
          this.setState({
               navigateTo: <></>
          })
     }

     handleScreenNavigation(screen) {
          if(screen == '/') localStorage.removeItem('token');
          this.setState({
               navigateTo: <Navigate to={screen} replace={true} />
          }, () => {
               this.resetPath();
          })
     }

     handleCollpseClick() {
          this.setState({
               isOpened: !this.state.isOpened,
               rotate: !this.state.rotate
          })
     }

     render() {
          return (
               <div>
                    {this.state.navigateTo}
                    <div className={this.state.isOpened ?
                         'sidebar-wrapper' :
                         'sidebar-wrapper sidebar-wrapper-collapsed'}>

                         <button onClick={() => {
                              this.handleCollpseClick();
                         }} className='collapse-btn' >
                              <FaBars className='collapse-btn-icon' />
                         </button>
                         <header className='header-wrapper'>
                              <img
                                   src='/assets/logo-check-sign.png'
                                   alt='logo'
                                   className='logo-check-sign'
                                   rotate={this.state.rotate.toString()}
                              />
                         </header>
                         <main>
                              {this.menuItems.map((item, index) => {
                                   return (
                                        <div className='sidebar-item-wrapper' onClick={() => { this.handleScreenNavigation(item.path) }}>
                                             <div className='sidebar-item-icon'>
                                                  {item.icon}
                                             </div>
                                             <div className={this.state.isOpened ? 'sidebar-item-text' : 'sidebar-item-text sidebar-item-text-collapsed'}>
                                                  {item.name}
                                             </div>
                                        </div>
                                   )
                              })}
                         </main>
                    </div>
               </div>
          )
     }

}


export default Sidebar;