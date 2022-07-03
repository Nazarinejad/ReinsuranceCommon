import { StorageName } from "sanhab-components-library"
import  api  from "../services/fiscalYear/apiRequest";
const GetAllErrorType = () => {
    // let errorList: IErrorType[] = []
    api.GetAllErrorTypes()
    .then(response => {
        window?.sessionStorage?.setItem(StorageName.ERROR_TYPE, JSON.stringify(response?.data?.Result))
    })

    
}

export default GetAllErrorType
