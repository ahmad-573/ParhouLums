import React, {useState, useCallback, useEffect} from 'react';
import { apiInvoker } from '../apiInvoker'
import { TrashIcon, PencilIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/outline'
import ModalEditTask from './TaskListModalEdit'


function Task({task, groupid, logout, setSnackbarMsg}){
    const [editmodal, setEditmodal] = useState(false);
    const handleClose = useCallback(() => setEditmodal(false), [])
    const handleOpen = () => setEditmodal(true)

    const onDelClick = async e =>{
        const [data, err] = await apiInvoker('/api/deleteTask', {task_id:task.task_id,group_id: groupid})
        if (data !== undefined) ;
        else if (err === 'Token error') logout()
        else setSnackbarMsg('Error: ' + err)          
    };

    return(
        <div className='flex items-center h-[44px] px-[20px]'>
            <div className="w-3/4">
                {task.title}
            </div>
            <div className='w-1/4 grid grid-cols-3'>
                <button onClick={onDelClick}><TrashIcon className='w-5 h-5'/></button>
                <button onClick={handleOpen}><PencilIcon className='w-5 h-5'/></button>
                <ModalEditTask onClose={useCallback(() => setEditmodal(false), [])} editmodal={editmodal} task={task} setSnackbarMsg={setSnackbarMsg} groupid={groupid} key={task.task_id}/>
                <ChevronRightIcon className='w-5 h-5' />
            </div>
        </div>
    );
}

export default Task;