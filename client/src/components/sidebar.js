import React from 'react'
import { NavLink } from "react-router-dom";
import { LogoIcon } from './CustomIcons'
import { makeStyles } from "@material-ui/core/styles";
import { AnnotationIcon, HashtagIcon, ClipboardListIcon, DocumentTextIcon, FolderOpenIcon, LogoutIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { FiSettings } from 'react-icons/fi';

const useStyles = makeStyles((theme) => ({
  '@global':{
      body:{
        backgroundColor:"#FFFFFF"
    }
  },
  otherstyles:{
    //  other styles ....
  },

}));

function Sidebar() {
    const classes = useStyles();
    return (
        <div className={classes.body}>
            <div class="relative py-3 z-10 w-[248px] h-screen bg-[#F2F3F5]">
                <div class="relative w-full h-[30px] -mt-1 mb-5 px-3 border-b-2 border-[#E3E5E8]">
                    <div class="flex pl-1 mb-5">
                        <LogoIcon/>
                            <span class="self-center text-[16px] ml-[11px] font-semibold whitespace-nowrap text-[#060607]">Salam Anwar!</span>
                        <FiSettings class="absolute right-3 h-5 text-[16px]"/>
                    </div>
                </div>
                <ul class="space-y-2 px-2">
                    <div className='w-[232px] h-[23px] -mb-2'>
                        <div class="flex items-center text-gray-900">
                            <ChevronRightIcon className='text-[#4F5659] h-3 w-3'/>
                            <span className="text-[#4F5659] flex-1 ml-1 text-sm font-semibold">
                                text channels
                            </span >
                        </div>
                    </div>
                    <li className='w-[232px] bg-[#E5E5E5] rounded h-[38px]'>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#D3D7DB] hover:font-semibold">
                        <AnnotationIcon className='text-[#4F5659] h-5 w-5'/>
                        <NavLink className="nav-link text-[#060607] flex-1 ml-3 whitespace-nowrap" to="/chat">
                            chat
                        </NavLink>
                        </a>
                    </li>
                    <div className='w-[232px] h-[23px]'>
                        <div class="flex items-center text-gray-900 mt-6">
                            <ChevronRightIcon className='text-[#4F5659] h-3 w-3'/>
                            <span className="text-[#4F5659] flex-1 ml-1 text-sm font-semibold">
                                tools
                            </span >
                        </div>
                    </div>
                    <li className='w-[232px] bg-[#E5E5E5] rounded h-[38px]'>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#D3D7DB] -mt-2 hover:font-semibold">
                        <ClipboardListIcon className='text-[#4F5659] h-5 w-5'/>
                        <NavLink className="nav-link text-[#060607] flex-1 ml-3 whitespace-nowrap" to="/about">
                            task-list
                        </NavLink>
                        </a>
                    </li>
                    <li className='w-[232px] bg-[#E5E5E5] rounded h-[38px]'>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#D3D7DB] hover:font-semibold">
                        <DocumentTextIcon className='text-[#4F5659] h-5 w-5'/>
                        <NavLink className="nav-link text-[#060607] flex-1 ml-3 whitespace-nowrap" to="/contact">
                            notes
                        </NavLink>
                        </a>
                    </li>
                    <li className='w-[232px] bg-[#E5E5E5] rounded h-[38px]'>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#D3D7DB] hover:font-semibold">
                       <FolderOpenIcon className='text-[#4F5659] h-5 w-5'/>
                        <NavLink className="nav-link text-[#060607] flex-1 ml-3 whitespace-nowrap" to="/blog">
                            resources
                        </NavLink>
                        </a>
                    </li>
                    <li className='w-[232px] rounded h-[38px]'>
                        <a href="#" class="absolute flex justify-center items-center h-screen w-full h-[52px] bottom-0 left-0 self-center text-[16px] bg-[#D3D7DB] hover:font-semibold">
                            <LogoutIcon className='text-[#F05454] h-5 w-5 mr-2 hover:text-red-600 hover:font-semibold'/>
                            <NavLink className="text-[#F05454] inline-block align-middle whitespace-nowrap hover:font-semibold" to="/blog">
                                Leave Group
                            </NavLink>
                        </a>
                    </li>
                </ul>
                {/* <NavLink class="absolute flex justify-center items-center h-screen w-full h-[52px] bottom-0 left-0 self-center text-[16px] bg-[#D3D7DB] hover:font-semibold" to="/">
                    <LogoutIcon className='text-[#F05454] h-5 w-5 mr-2 hover:text-red-600 hover:font-semibold'/>
                    <span class="text-[#F05454] inline-block align-middle whitespace-nowrap hover:font-semibold">Leave Group</span>
                </NavLink> */}
            </div>
            <div class="absolute flex items-stretch w-screen z-0 h-[38px] bg-white top-0 border-b-2 border-[#E3E5E8]">
                <div class="flex self-center pl-1 ml-[248px]">
                    <HashtagIcon class="text-[#4F5659] h-5 w-4" />
                        <span class="self-center text-[#4F5659] text-[15px] ml-[2px] font-semibold whitespace-nowrap">[page]</span>
                </div>
                <div class="flex self-center absolute right-3 w-1/12 h-3/4 grid grid-cols-2 gap-2">
                    <button type="button" class="text-[#4F5659] ring-[#4F5659] ring-opacity-80 bg-white rounded ring-1 hover:font-semibold font-medium text-sm">Groups</button>
                    <button type="button" class="text-white ring-1 ring-[#E01E5A] bg-[#E01E5A] rounded hover:font-semibold font-medium text-sm">Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar