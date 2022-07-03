import { HttpBaseService, IApiResult, DownloaderFile, IFileDownload } from "sanhab-components-library";
import { AxiosResponse } from 'axios'
import { IAddRequestBody, IEditRequestBody, IAllPagedRequestBody, IDeleteRequestBody, IGetRequestBody, IActiveOrDeactiveRequestBody } from "./models"
import HttpBaseConstant from "../HttpBaseConstant"
import { IAdvancedsearchRequestBody } from '../../model/IAdvancedSearch'

class FiscalYearApiRequest extends HttpBaseService {
    AllPaged = (requestBody: IAllPagedRequestBody): Promise<any> => {
        return this.send.post("/FiscalYear/GetListedPage", requestBody)
    }
    
    GetAllErrorTypes = (): Promise<any> => {
        return this.send.get("/Enum/GetAllErrorTypes")
    }

    InsertFiscalYear = (requestBody: IAddRequestBody): Promise<any> => {
        return this.send.post("/FiscalYear/Create", requestBody)
    }

    GetFiscalYearById = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post(`/FiscalYear/getById`, requestBody)
    }

    UpdateFiscalYear = (requestBody: IEditRequestBody): Promise<any> => {
        return this.send.put("/FiscalYear/Update", requestBody)
    }

    ActiveOrDeactiveFiscalPeriod = (requestBody: IActiveOrDeactiveRequestBody): Promise<any> => {
        return this.send.put("FiscalYear/ActivateOrDeActivate", requestBody)
    }

    DeleteFiscalYear = (requestBody: IDeleteRequestBody): Promise<any> => {
        return this.send.delete(`/FiscalYear/Delete`, { data: requestBody })
    }

    AdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/FiscalYear/AdvancedSearch", requestBody)
    }
    
    
    HistoryAdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/FiscalYear/HistoryAdvancedSearch", requestBody)
    }


    GetExcelReport = (): Promise<AxiosResponse<IApiResult<IFileDownload>>> => {
        return new Promise((resolve, reject) => {
            this.send.get("/FiscalYear/Excel")
                .then((response: AxiosResponse<IApiResult<IFileDownload>>) => {
                    if (response?.data?.IsSucceed && response?.data?.Result) {
                        DownloaderFile({
                            contentType: response?.data?.Result?.FileContentType,
                            contents: response?.data?.Result?.FileContents,
                            fileExtension: response?.data?.Result?.FileExtension,
                            fileName: response?.data?.Result?.FileName
                        })
                    }
                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    // CompanyList = (): Promise<any> => {
    //     return this.send.get("/PassengerPolicyInquiry/CompanyList")
    // }
}

export default new FiscalYearApiRequest({ url: HttpBaseConstant.url })