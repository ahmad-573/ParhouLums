import React, { useState } from 'react'
import { TrashIcon, PencilIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/outline'
import Modal from './TaskListModalCreate'
import { apiInvoker } from '../apiInvoker'


function TaskList({username, setGroup, setSnackbarMsg, groups, setGroups, group, logout}) {
  const [show, setShow] = useState(false);
  const [mList, setMList] = React.useState([]) // [{username, fullname, user_id}]
  const [mMap, setMMap] = React.useState({}) // {`${fullname} ${username}`: {username, fullname, user_id}}
  const [task, setTask] = React.useState([])

  // const userFetcher = async (type, errorText) => {
  //   setShow(true)
  //   // setMList(['Saad @saad', 'Taha @taha'])
  //   // setMMap({'Saad @saad': {username: '@saad', fullname: 'Saad', user_id: 1}, 'Taha @taha': {username: '@taha', fullname: 'Taha', user_id: 2}})
  //   const [data, err] = await apiInvoker('/api/getUsers', {type: 'new'})
    
  //   if (err === undefined) {
  //     let newMemberMap = {}
  //     let newMemberList = []
  //     for (let m of data.users) {
  //       const key = m.fullname + ' ' + m.username
  //       newMemberList.push(key)
  //       newMemberMap[key] = m
  //     }
  //     setMMap(newMemberMap)
  //     setMList(newMemberList)
  //     console.log("here", newMemberMap, newMemberList)
  //   } else {
  //     setSnackbarMsg(errorText + ' Error: ' + err)
  //   }
  // }
  return (
    <div>
      <div className = "grid grid-cols-3 gap-10 px-[48px] mt-[50px] min-h-[200px]">
        <div className='relative rounded-lg border ring-1 ring-[#1d1c1d] ring-opacity-10'>
          <div className='flex center px-[20px] pb-[8px] border-b-2 boder-[#1d1c1d]'>
            <div className='text-[22px] font-medium mt-[8px] w-5/6 font-sans text-gray-900'>
              Not started
            </div>
            <div className='w-1/6 mt-2'>
              <button onClick={() => setShow(true)}><PlusIcon className='w-5 h-5 mr-0 ml-auto mt-1'/></button>
              <Modal onClose={() => setShow(false)} show={show} category={0} groupid={group.group_id} mList={mList} mMap={mMap} logout= {() => logout()}/>
            </div>
          </div>
          <div>
            <ul className="divide-y-2 divide-[#1d1c1d]-500">
              <li className='flex items-center h-[44px] px-[20px]'>
                <div className="w-3/4">
                  SDS Due
                </div>
                <div className='w-1/4 grid grid-cols-3'>
                  <TrashIcon className='w-5 h-5'/>
                  <PencilIcon className='w-5 h-5'/>
                  <ChevronRightIcon className='w-5 h-5'/>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='bg-red-700'>two</div>
        <div className='bg-red-700'>three</div>
      </div>
    </div>
  )
}

export default TaskList