import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
const getLocalStorage = () =>{
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list')) //get item from useEffect
  
  }else{
    return []
  }
}
function App() {
  const[name,setName] = useState('')
  const[list,setList] = useState(getLocalStorage)
  const[isEditing, setIsEditing] = useState(false)
  const[editID, setEditID] = useState(null)
  const[alert, setAlert] = useState({show:false, msg:'hello', type:'danger'})//object
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!name){ //if value empty display alert
      //display alert
     showAlert(true,'danger', 'Please enter item')
    }
    else if(name && isEditing){ //if both true dealing with edit
      setList(list.map((item) =>{ //map over the list of item
        if(item.id === editID){ // if the item id matching the item editing 
        return {...item, title:name} 
      }
      return item// return back that item but new title
      }
      )
      
    )
    
    setName('')
    setEditID(null)
    setIsEditing(false)
    showAlert(true,'success', 'value change')
    }
    else{
      // show alert 
      showAlert(true,'success','item added')
      const newItem = {id: new Date().getTime().toString(), title:name}
      setList([...list, newItem])
      setName('')
    }
  }
  
  const showAlert =(show=false, type="", msg ="") => {
    setAlert({show,type,msg})
  }
  const clearList = ()=>{
    showAlert(true,'danger','You have deleted the list')
    setList([])
  }
  const removeItem =(id) =>{
    showAlert(true,'danger','item deleted')
    setList(list.filter((item) => item.id !== id))
  }
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  },[list]) // save the lastest value into the storage 
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list = {list}/>} 
      <h3>Grocery note</h3>
      <div className='form-control'>
        <input type="text" className='grocery' placeholder='items...' value={name} onChange={(e) => setName(e.target.value)}/>
        <button type ="submit" className='submit-btn'>{isEditing? 'edit' : 'submit'}  </button>
      </div>
      </form>
      {list.length > 0 && (
      <div className='grocery-container'>
      <List items={list} removeItem={removeItem} editItem = {editItem} />
      <button className='clear-btn' onClick={()=>{clearList()}}> delete item</button>
       </div>
      )}  

    </section>
  )
}

export default App
