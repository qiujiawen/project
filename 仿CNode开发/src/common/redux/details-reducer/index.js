const detailsReducer=(state={
    data:{},
    loading:true,
    error:false
},action)=>{
    switch (action.type) {
        case 'DETAILS_SUCC':
            return state={
                loading:true,
                error:false
            };
        case 'DETAILS_UPDATA_SUCC':
            return state={
                data:action.data,
                loading:false,
                error:false
            };
        case 'DETAILS_ERROR':
            return state={
                data:{},
                loading:false,
                error:true
            };
        default:
            return state;
    }
};

export default detailsReducer;