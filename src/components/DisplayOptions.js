function DisplayOptions(props){

    if (props.curr_category === 0){
        return(
            <>
            <option value="Not Started" selected>Not started</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
            </>
        )
    }
    else if (props.curr_category === 1){
        return(
            <>
            <option value="In Progress" selected>In Progress</option>
            <option value="Not Started">Not Started</option>
            <option value="Complete">Complete</option>
            </>
        )
    }
    else{
        return(
            <>
            <option value="Complete" selected>Complete</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            </>
        )
    }
}

export default DisplayOptions