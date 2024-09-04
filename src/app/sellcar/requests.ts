import { useSelector, } from "react-redux";
import { Dispatch } from 'redux';
import { useGetBrendsMutation } from "../GlobalRedux/api/characteristicsApi";
import { getBrend } from "../GlobalRedux/api/features/carCharacteristicsSlice";
const getBrends = async (dispatch: Dispatch) => {
    const [getAllBrend, { isLoading:isLoadingGetBrend, isError:isErrorGetBrend, error:errorGetBrend, isSuccess:isSuccessGetBrend }] = useGetBrendsMutation();
    try {
      const { data } = await getAllBrend({});
      const carsArr = data.cars ? [...data.cars] : []; 
      carsArr.sort((a, b) => {
        const titleA = a.titlebrend?.toLowerCase() || ''; 
        const titleB = b.titlebrend?.toLowerCase() || '';
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
      if (carsArr.length > 0) { 
        dispatch(getBrend({ cars: carsArr }));
      }
    } catch (error) {
      console.error("Error in getBrends:", error);
    }
  };
  const req = { getBrends }; // Об'єднуємо всі функції в об'єкт
export default req;
