import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, Grid, TextField, Button, Divider, Box, NativeSelect } from '@material-ui/core'
import { apiInvoker } from '../apiInvoker'





function FlashCard({flashcard}) {
    const [flip, setFlip] = useState(false)
    //flashcard.title on frontside
    //flashcard.description on backside
    return (
      <div onClick={()=> setFlip(!flip)}>

          <div class="flex justify-center relative block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="backface-visbility: hidden">
                <h5 class="absolute mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Frontside</h5>
            </div>
            <div class="backface-visibility: hidden">
                <h5 class="rotate-180 absolute mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Backside</h5>
            </div>

          </div>
        
      </div>
    )
  }
  



  <div>
  <div class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">Here are the smallest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
  </div>
</div>
  export default FlashCard;