import {SIGN_IN, SIGN_UP, SIGN_OUT, CREATE_TASK, GET_TASKS, COMPLETE_TASK,GETDATE_TASK, PASS_CHANGED} from './Types'
import server from '../server'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {store} from '../app-redux'

export const signIn = (formValues)=>{
    return async(dispatch)=>{
        const {username, password} = formValues
        try {
            const res = await server.post('/login',{username, password})
            const data = await res.data
            const jsonValue = JSON.stringify(data)
            await AsyncStorage.setItem('userinfo', jsonValue)
            dispatch({type:SIGN_IN,payload:data})
        } catch (e) {
            alert(e.response.data.error)
        }
    }
}

export const tryLocalSignin = () =>{
    return async(dispatch)=>{
        const token = await AsyncStorage.getItem('userinfo')
        try {
            if(token){
                const ddata= JSON.parse(token)
                dispatch({type:SIGN_IN, payload: ddata})
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const signUp = (name,email,username,password,profileImg,navigation)=>{
    navigation.push('SignUpLoading')
    // uploading to cloudinary
    let base64Img = `data:image/jpg;base64,${profileImg.base64}`;
    let profileimg = {
      "file": base64Img,
      "upload_preset": "todoapp",
    }
    return async(dispatch)=>{
        try {
                await server.post('/register',{name, email, username, password, profileimg})
                dispatch({type: SIGN_UP})
                setTimeout(()=>{
                    navigation.push('SignIn')
                },5500)
        } catch (e) {
            if(e.response.data.error){
                await navigation.push('SignUp')
                alert(e.response.data.error)
            }
            else{
            }
        }
    }
}
export const signOut = () =>{
    return async(dispatch)=>{
        await AsyncStorage.removeItem('userinfo')
        dispatch({type:SIGN_OUT})
    }
}

export const changePass = (oldpassword,newpassword) =>{
    const username = store.getState().auth.userData.username
    return async(dispatch) =>{
        try {
            const res = await server.patch('/changepassword',{username, oldpassword, newpassword})
            dispatch({type:PASS_CHANGED})
            if(res.status === 200){
                alert('Password Updated Successfully')
            }
        } catch (error) {
            if(error.response.data.error){
                alert(error.response.data.error)
            }
        }
    }
}

export const createTask =(formValues)=>{
    const id = store.getState().auth.userId
    return async(dipatch)=>{
        try {
            const res = await server.post('/task/create',{userId: id, task: formValues})
        } catch (error) {
            console.log(error)
        }
    }
}

export const getTask = (date)=>{
    
    const userId = store.getState().auth.userId
    return async(dispatch)=>{
        try {
            const res = await server.get('/task/dateget',{    params: {
                userId,
                date
              }})
              dispatch({type:GET_TASKS, payload: res.data})
        } catch (error) {
            // console.log('s')
        }
    }
}

export const completeTask = (taskId)=>{
    const userId = store.getState().auth.userId
    return async(dispatch)=>{
        try {
            const res = await server.patch('/task/complete',{userId,taskId})
            dispatch({type: COMPLETE_TASK})
        } catch (error) {
            console.log(error.response.data.error)
        }
    }
}
export const getDateTask = (date) =>{
    const userId = store.getState().auth.userId
    return async(dispatch)=>{
        try {
            const res = await server.get('/task/dateget',{    params: {
                userId,
                date
              }})
              dispatch({type:GETDATE_TASK, payload: res.data})
        } catch (error) {
            dispatch({type:GETDATE_TASK, payload: []})
        }
    }
}
