import axios from 'axios';
import { api } from './services';

export default class Api{
     static async getAllUserSchedules(token){  
          try {
               const res = await axios.get(
                    `${api}api/schedule/getall`,
                    
                    {
                         headers: {
                         "Access-Control-Allow-Origin": "*",
                         "Authorization": `${token}`
                         },
                         
               }
               )
               return res;
          } catch(err){
               return err;
          } 
     } 

     static async createSchedule(scheduleData, token){
               try{
                    const res = await axios.post(
                         `${api}api/schedule/create`,
                         scheduleData,{
                              headers: {
                              "Access-Control-Allow-Origin": "*",
                              "Authorization": `${token}`
                              },
                         }
                    )
                    return res;
               }catch(err) {
                    return err
               }
     }

     static async auth(user) {
          try{
               const res = await axios.post(
                    `${api}api/user/auth`,
                    user,{
                         headers: {
                              "Access-Control-Allow-Origin": "*",
                         }
                    } 
               )
               return res;
               
          }catch(err){
               return err;
          }
     }

     static async register(user){
          try{
               const res = await axios.post(
                    `${api}api/user/create`,
                    user,
                    {
                         headers: {
                              "Access-Control-Allow-Origin": "*",
                         }
                    }
               )
               return res
          } catch(err){
               return err
          }
     }

     static async getUser(token){  
          try {
               const res = await axios.get(
                    `${api}api/user/getuser`,
                    {
                         headers: {
                         "Access-Control-Allow-Origin": "*",
                         "Authorization": `${token}`
                         },
                         
               }
               )
               return res;
          } catch(err){
               return err;
          } 
     } 

     
}