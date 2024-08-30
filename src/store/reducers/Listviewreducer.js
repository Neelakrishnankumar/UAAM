import { createSlice } from "@reduxjs/toolkit";
import {ML_rows,ML_columns,PM_columns,PM_rows,M_columns,M_rows,P_columns,p_rows,Pro_columns,Pro_rows} from '../../dataApi/mockDataApi'
export const listviewSlice = createSlice({
    name: "listViewData",
    initialState: { value:p_rows, column:P_columns},
    reducers: {
      addListview: (state, action) => {
        switch (action.payload) {
          case 'Product Category':
            state.value = p_rows;
            state.column = P_columns ;
            break;
            case "Product Master":
            state.value = PM_rows;
            state.column = PM_columns;
            break;
            case "Material Category":
            state.value = M_rows;
            state.column = M_columns;
            break;
            case "Proforma Invoice":
              state.value = Pro_rows;
              state.column = Pro_columns;
              break;
              case 'Material List':
                state.value = ML_rows;
                state.column = ML_columns ;
                break;
          default:
            state.value = p_rows;
            state.column = P_columns;
         
        }
    
      },
    },
  });
  export const apiActions = listviewSlice.actions;
  export default listviewSlice.reducer;