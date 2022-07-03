import { HttpBaseService, IApiResult, DownloaderFile, IFileDownload } from "sanhab-components-library";
import { AxiosResponse } from 'axios'
import { IAddRequestBody, IEditRequestBody, IAllPagedRequestBody, IActiveOrDeactiveRequestBody, IGetByParentAndChildRequestBody } from "./models"
import HttpBaseConstant from "../HttpBaseConstant"
import { IAdvancedsearchRequestBody } from '../../model/IAdvancedSearch'

class FiscalPeriodApiRequest extends HttpBaseService {
    AllPaged = (requestBody: IAllPagedRequestBody): Promise<any> => {
        return this.send.post("/FiscalPeriod/GetListedPage", requestBody)
    }

    AdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/FiscalPeriod/AdvancedSearch", requestBody)
    }

    InsertFiscalPeriod = (requestBody: IAddRequestBody): Promise<any> => {
        return this.send.post("/FiscalPeriod/Create", requestBody)
    }

    GetFiscalPeriodById = (requestBody: IGetByParentAndChildRequestBody): Promise<any> => {
        return this.send.post(`/FiscalPeriod/GetById`, requestBody)
    }


    GetAllFiscalYears = (): Promise<any> => {
        return this.send.get(`/Common/GetAllFiscalYears`)
    }

    UpdateFiscalPeriod = (requestBody: IEditRequestBody): Promise<any> => {
        return this.send.put("/FiscalPeriod/Update", requestBody)
    }

    ActiveOrDeactiveFiscalPeriod = (requestBody: IActiveOrDeactiveRequestBody): Promise<any> => {
        return this.send.put("FiscalPeriod/ActivateOrDeActivate", requestBody)
    }

    DeleteFiscalPeriod = (requestBody: IGetByParentAndChildRequestBody): Promise<any> => {
        return this.send.delete('/FiscalPeriod/Delete', { data: requestBody })
    }

    GetExcelReport = (): Promise<AxiosResponse<IApiResult<IFileDownload>>> => {
        return new Promise((resolve, reject) => {
            this.send.get("/FiscalPeriod/Excel")
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

    HistoryAdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/FiscalPeriod/HistoryAdvancedSearch", requestBody)
    }

    // CompanyList = (): Promise<any> => {
    //     return this.send.get("/PassengerPolicyInquiry/CompanyList")
    // }
}

export default new FiscalPeriodApiRequest({ url: HttpBaseConstant.url })