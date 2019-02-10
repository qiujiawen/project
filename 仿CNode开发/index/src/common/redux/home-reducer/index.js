const homeReducer=(state={
    error:false,
    loading:true,
    data:[],
},action)=>{
    switch (action.type) {
        case 'LIST_SUCC':
            return (
                state={
                    loading:true,
                    error:false,
                    data: state.data
                }
            );
        case 'LIST_UPDATA_SUCC':
            return (
                state={
                    error:false,
                    data: action.data,
                    loading:false
                }
            );
        case 'LIST_ERROR':
            return state={
                error:true,
                loading:true,
                data:state={
                    loading:false,
                    data:[],
                }
            };
        default:
            return state;
    }
};

export default homeReducer;