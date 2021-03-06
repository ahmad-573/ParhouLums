import React, { useState, useCallback } from 'react'
import { TrashIcon, PencilIcon, ChevronRightIcon, PlusIcon, PlusCircleIcon } from '@heroicons/react/outline'
import Modal from './TaskListModalCreate'
import { apiInvoker } from '../apiInvoker'
import Task from './Task'


function TaskList({username, setGroup, setSnackbarMsg, groups, setGroups, group, logout}) {
  console.log("here")
  const [showZero, setShowZero] = useState(false);
  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [mList, setMList] = React.useState([]) // [{username, fullname, user_id}]
  const [mMap, setMMap] = React.useState({}) // {`${fullname} ${username}`: {username, fullname, user_id}}
  const [tasks, setTasks] = React.useState([])
  const [time, setTime] = useState(0);
  const [changed, setChanged] = useState(false)

    function generateTime() {
        return(
            new Promise((resolve,reject) => {
                setTimeout(resolve,6000);
            }).then(() => {
                if (time%2) setTime(time + 1)
                else setTime(time - 1)
            })
        );
        
    }
    const getTasks = async () => {
      apiInvoker('/api/getTasks', {group_id:group.group_id}).then(([data, err]) => {
        if (err === undefined) {
          setTasks(data.tasks)
        } else if (err === 'Token error'){
          logout()
        }
        else{
          setSnackbarMsg('Error: ' + err)
        }
        generateTime();
      })
    }

  React.useEffect(() => {
    getTasks();
  }, [time])

  if (changed){
    getTasks();
    setChanged(false)
  }

  return (
    <div>
      <div className = "grid grid-cols-1 gap-10 px-[48px] mt-[50px] min-h-[200px] md:grid-cols-2 xl:grid-cols-3">
        {/* Category 0 */}
        <div className='relative rounded-lg bg-white border ring-1 ring-[#1d1c1d] ring-opacity-10'>
          <div className='flex center px-[20px] pb-[8px] border-b-2'>
            <div className='text-[22px] font-medium mt-[8px] w-[95%] font-sans text-gray-900'>
              Not started
            </div>
            <div className='flex w-[5%] mt-2'>
              <button onClick={() => setShowZero(true)}><PlusCircleIcon className='w-5 h-5'/></button>
              <Modal setChanged={setChanged} onClose={useCallback(() => setShowZero(false), [])} show={showZero} category={0} groupid={group.group_id} mList={mList} mMap={mMap} setTasks={setTasks} logout={logout} setSnackbarMsg={setSnackbarMsg}/>
            </div>
          </div>
          <div>
          {tasks.map(task => {
                if (task.category === 0){
                  console.log("In 0: ", task.category)
                  return (
                    <div className='divide-y-2 divide-[#1d1c1d]-500'>
                      <Task setChanged={setChanged} task={task} groupid={group.group_id} logout={logout} setSnackbarMsg={setSnackbarMsg} key={task.task_id}/>
                    </div>
                  );
                }
              })}
          </div>
        </div>

        {/* Category 1 */}
        <div className='relative rounded-lg bg-white border ring-1 ring-[#1d1c1d] ring-opacity-10'>
          <div className='flex center px-[20px] pb-[8px] border-b-2 boder-[#1d1c1d]'>
            <div className='text-[22px] font-medium mt-[8px] w-[95%] font-sans text-gray-900'>
              In Progress
            </div>
            <div className='w-[5%] mt-2'>
              <button onClick={() => setShowOne(true)}><PlusCircleIcon className='w-5 h-5 mr-0 ml-auto mt-1'/></button>
              <Modal onClose={useCallback(() => setShowOne(false), [])} show={showOne} category={1} groupid={group.group_id} mList={mList} mMap={mMap} setTasks={setTasks} logout={logout} setSnackbarMsg={setSnackbarMsg}/>
            </div>
          </div>
          <div>
          {tasks.map(task => {
                if (task.category === 1){
                  console.log("In 1: ", task.category)
                  return (
                    <div className='divide-y-2 divide-[#1d1c1d]-500'>
                      <Task task={task} groupid={group.group_id} logout={logout} setSnackbarMsg={setSnackbarMsg} key={task.task_id}/>
                    </div>
                  );
                }
              })}
          </div>
        </div>

        {/* Category 2 */}
        <div className='relative rounded-lg bg-white border ring-1 ring-[#1d1c1d] ring-opacity-10'>
          <div className='flex center px-[20px] pb-[8px] border-b-2 boder-[#1d1c1d]'>
            <div className='text-[22px] font-medium mt-[8px] w-[95%] font-sans text-gray-900'>
              Completed 
            </div>
            <div className='w-[5%] mt-2'>
              <button onClick={() => setShowTwo(true)}><PlusCircleIcon className='w-5 h-5 mr-0 ml-auto mt-1'/></button>
              <Modal onClose={useCallback(() => setShowTwo(false), [])} show={showTwo} category={2} groupid={group.group_id} mList={mList} mMap={mMap} setTasks={setTasks} logout={logout} setSnackbarMsg={setSnackbarMsg}/>
            </div>
          </div>
          <div>
          {tasks.map(task => {
                if (task.category === 2){
                  console.log("In 2: ", task.category)
                  return (
                    <div className='divide-y-2 divide-[#1d1c1d]-500'>
                      <Task task={task} groupid={group.group_id} logout={logout} setSnackbarMsg={setSnackbarMsg} key={task.task_id}/>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskList