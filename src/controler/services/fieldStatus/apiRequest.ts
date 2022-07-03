import { HttpBaseService, IApiResult, DownloaderFile, IFileDownload } from "sanhab-components-library";
import { AxiosResponse } from 'axios'
import { IAddRequestBody, IGetExcelRequestBody, IEditRequestBody, IAllPagedRequestBody, IDeleteRequestBody, IGetRequestBody, IChangeStatusRequestBody, IEqualizeRequestBody, IGetAllSubFieldsByFieldIdAndCompanyIdRequestBody } from "./models"
import HttpBaseConstant from "../HttpBaseConstant"
import { IAdvancedsearchRequestBody } from '../../model/IAdvancedSearch'

class FieldStatusApiRequest extends HttpBaseService {

    GetAllCompanies = (): Promise<any> => {
        return this.send.get("/FieldStatusDetermination/GetAllCompanies")
    }

    AllPaged = (requestBody: IAllPagedRequestBody): Promise<any> => {
        return this.send.post("/FieldStatusDetermination/GetListedPage", requestBody)
    }

    GetById = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post(`/FieldStatusDetermination/GetById`, requestBody)
    }

    GetAllSubFieldsByFieldId = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post("/Common/GetAllSubFieldsByFieldId", requestBody)
    }
    
    GetAllSubFieldsByFieldIdAndCompanyId = (requestBody: IGetAllSubFieldsByFieldIdAndCompanyIdRequestBody): Promise<any> => {
        return this.send.post("/FieldStatusDetermination/GetAllSubFieldsByFieldIdAndCompanyId", requestBody)
    }

    GetAllFieldsByCompanyId = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post("/FieldStatusDetermination/GetAllFieldsByCompanyId", requestBody)
    }

    GetAllFields = (): Promise<any> => {
        return this.send.get("/Common/GetAllFields")
    }

    Delete = (requestBody: IDeleteRequestBody): Promise<any> => {
        return this.send.delete(`/FieldStatusDetermination/Delete`, { data: requestBody })
    }


    GetHistoriesById = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post("/FieldStatusDetermination/GetHistoriesById", requestBody)
    }

    ChangeStatusForFirstTab = (requestBody: IChangeStatusRequestBody): Promise<any> => {
        return this.send.post("/FieldStatusDetermination/ChangeStatusForFirstTab", requestBody)
    }

    ChangeStatusForSecondTab = (requestBody: IChangeStatusRequestBody): Promise<any> => {
        return this.send.post("/FieldStatusDetermination/ChangeStatusForSecondTab", requestBody)
    }

    ChangeStatusForFourthAndThirdTab = (requestBody: IChangeStatusRequestBody): Promise<any> => {
        return this.send.post("/FieldStatusDetermination/ChangeStatusForFourthAndThirdTab", requestBody)
    }

    Approve = (requestBody: IChangeStatusRequestBody): Promise<any> => {
        return this.send.post("/FieldStatusDetermination/Approve", requestBody)
    }

    DisApprove = (requestBody: IChangeStatusRequestBody): Promise<any> => {
        return this.send.post("/FieldStatusDetermination/DisApprove", requestBody)
    }

    Equalize = (requestBody: IEqualizeRequestBody): Promise<any> => {
        return this.send.put("/FieldStatusDetermination/Equalize", requestBody)
    }


    Insert = (requestBody: IAddRequestBody): Promise<any> => {
        return this.send.post("/FieldStatusDetermination/Create", requestBody)
    }


    Update = (requestBody: IEditRequestBody): Promise<any> => {
        return this.send.put("/FieldStatusDetermination/Update", requestBody)
    }


    GetExcelReport = (requestBody: IGetExcelRequestBody): Promise<AxiosResponse<IApiResult<IFileDownload>>> => {
        return new Promise((resolve, reject) => {
            this.send.post("/FieldStatusDetermination/Excel", requestBody)
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


    AdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/FieldStatusDetermination/AdvancedSearch", requestBody)
    }

    HistoryAdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/FieldStatusDetermination/HistoryAdvancedSearch", requestBody)
    }


    // ActiveOrDeactiveFiscalPeriod = (requestBody: IActiveOrDeactiveRequestBody): Promise<any> => {
    //     return this.send.put("FiscalYear/ActivateOrDeActivate", requestBody)
    // }

    // DeleteField = (requestBody: IDeleteRequestBody): Promise<any> => {
    //     return this.send.delete(`/FiscalYear/Delete` , { data: requestBody})
    // }


}

export default new FieldStatusApiRequest({ url: HttpBaseConstant.url })