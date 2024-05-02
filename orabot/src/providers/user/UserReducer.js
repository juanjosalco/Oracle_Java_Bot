export default (state, action) => {
    const { type, payload } = action;
   
    switch (type) {
       case 'SAVE_USER_DATA':
         return {
           ...state,
           userData: payload,
         };
   
       default:
         return state;
    }
   };
   