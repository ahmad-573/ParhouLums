import React, {useState, useCallback, useEffect} from 'react';
import { apiInvoker } from '../apiInvoker'
import { TrashIcon, PencilIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/outline'
import ModalEditTask from './TaskListModalEdit'
import { setNestedObjectValues } from 'formik';


function Task({setChanged,task, groupid, logout, setSnackbarMsg}){
    const [editmodal, setEditmodal] = useState(false);
    const handleClose = useCallback(() => setEditmodal(false), [])
    const handleOpen = () => setEditmodal(true)

    const onDelClick = async e =>{
        const [data, err] = await apiInvoker('/api/deleteTask', {task_id:task.task_id,group_id: groupid})
        if (data !== undefined) setChanged(true) ;
        else if (err === 'Token error') logout()
        else setSnackbarMsg('Error: ' + err)          
    };

    return(
        <div className='flex items-center h-[44px] px-[20px]'>
            <div className="w-[90%] truncate">
                {task.title}
            </div>
            <div className='w-[15%] grid grid-cols-2 gap-4'>
                <button onClick={onDelClick}><TrashIcon className='w-5 h-5'/></button>
                <button onClick={handleOpen}><PencilIcon className='w-5 h-5'/></button>
                <ModalEditTask setChanged={setChanged} onClose={useCallback((setCat,cat) => {setEditmodal(false); setCat(cat)}, [])} editmodal={editmodal} task={task} setSnackbarMsg={setSnackbarMsg} groupid={groupid} key={task.task_id}/>
                {/* <ChevronRightIcon className='w-5 h-5' /> */}
            </div>
        </div>
    );
}

export default Task;