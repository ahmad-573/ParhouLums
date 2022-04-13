import React, { useEffect } from 'react'
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";


function ModalCreateTask (props) {
    const closeOnEscapeKeyDown = e => {
        if ((e.charCode || e.keyCode) === 27) {
          props.onClose();
        }
    };
    
    useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
        document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
    }, []);

    return(
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 0, exit: 0 }}
        >
            <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="flex h-screen justify-center items-center fixed top-0 right-0 left-0 z-50 w-full backdrop-blur-sm md:inset-0 h-modal md:h-full" onClick={props.onClose}> 
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow bg-[#FFFFFF]" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-end p-2">
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal" onClick={props.onClose}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                            </button>
                        </div>
                        <form className="px-6 pb-4 space-y-3 lg:px-8 sm:pb-6 xl:pb-8" action="#">
                            <h3 className="text-xl font-medium text-[#1D1C1D]">Create Task</h3>
                            <div>
                                <label for="title" className="block mb-2 text-sm font-medium text-[#1D1C1D]">Title</label>
                                <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter title here" required/>
                            </div>
                            <div>
                                <label for="details" className="block mb-2 text-sm font-medium text-[#1D1C1D]">Details</label>
                                <div className='grid grid-cols-2 gap-4'>
                                    <input type="date" name="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                                    <select name="assigned" id="assigned" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                                        <option value="" selected disabled hidden>Choose here</option>
                                        <option value="taha">taha</option>
                                        <option value="moaiz">moaiz</option>
                                        <option value="fahad">fahad</option>
                                        <option value="saad">saad</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label for="title" className="block mb-2 text-sm font-medium text-[#1D1C1D]">Description</label>
                                <textarea type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter description here" required/>
                            </div>
                            <div className='grid grid-cols-2 w-1/2 ml-auto gap-2'>
                                <button type="submit" className="p-2 text-black hover:bg-[#F2F3F5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium border rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">Cancel</button>
                                <button type="submit" className="p-2 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </CSSTransition>
  )
}

export default ModalCreateTask