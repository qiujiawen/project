const userReducer=(state={
    data:{},
    loading:true,
    error:false
},action)=>{
    switch (action.type) {
        case 'USER_UPDATA_SUCC':
            return(
                state={
                    data:action.data,
                    loading:false,
                    error:false
                }
            );
        case 'USER_ERROR':
            return(
                state={
                    data:{},
                    loading:false,
                    error:true
                }
            )
        default:
            return state;
    }
};

export default userReducer;