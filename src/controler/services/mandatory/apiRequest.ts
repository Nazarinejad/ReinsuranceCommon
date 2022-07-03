import { HttpBaseService, IApiResult, DownloaderFile, IFileDownload } from "sanhab-components-library";
import { AxiosResponse } from 'axios'
import {
    IAddRequestBody, IAllMandatoryRelianceRequestBody, IEditRequestBody, IAllPagedRequestBody,
    IGetRequestBody, IGetHistoryByIdAndChildRequestBody, IActiveOrDeactiveRequestBody,
    IDeleteRecordRequestBody, IAllFiscalYearsRequestBody, IGetDetailForCopyRequestBody,
    ICopyRequestBody, IGetHistoryRequestBody, IDeleteRangeRequestBody,
    ILvlOneExcelRequestBody, ILvlTwoExcelRequestBody
} from "./models"
import HttpBaseConstant from "../HttpBaseConstant"
import { IAdvancedsearchRequestBody } from '../../model/IAdvancedSearch'

class MandatoryApiRequest extends HttpBaseService {
    AllPaged = (requestBody: IAllPagedRequestBody): Promise<any> => {
        return this.send.post("/MandatoryRelianceInformation/GetListedPage", requestBody)
    }

    GetAllMandatoryRelianceInformationByFiscalYearId = (requestBody: IAllMandatoryRelianceRequestBody): Promise<any> => {
        return this.send.post("/MandatoryRelianceInformation/GetAllMandatoryRelianceInformationByFiscalYearId", requestBody)
    }

    GetAllFiscalYearByCompanyId = (requestBody: IAllFiscalYearsRequestBody): Promise<any> => {
        return this.send.post("/MandatoryRelianceInformation/GetAllFiscalYearByCompanyId", requestBody)
    }

    GetAllCompanies = (): Promise<any> => {
        return this.send.get("/Common/GetAllCompanies")
    }

    GetAllFiscalYears = (): Promise<any> => {
        return this.send.get("/Common/GetAllFiscalYears")
    }

    GetAllFields = (): Promise<any> => {
        return this.send.get("/Common/GetAllFields")
    }

    GetAllSubFields = (): Promise<any> => {
        return this.send.get("/Common/GetAllSubFields")
    }

    GetAllSubFieldsByFieldIds = (requestBody: number[]): Promise<any> => {
        return this.send.post("/Common/GetAllSubFieldsByFieldIds", requestBody)
    }

    GetAllSubFieldsByFieldId = (requestBody: IGetHistoryRequestBody): Promise<any> => {
        return this.send.post("/Common/GetAllSubFieldsByFieldId", requestBody)
    }

    InsertMandatory = (requestBody: IAddRequestBody): Promise<any> => {
        return this.send.post("/MandatoryRelianceInformation/Create", requestBody)
    }

    Copy = (requestBody: ICopyRequestBody): Promise<any> => {
        return this.send.post("/MandatoryRelianceInformation/Copy", requestBody)
    }

    GetDetail = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post(`/MandatoryRelianceInformation/GetDetail`, requestBody)
    }

    GetAllCumulativesParticipating = (): Promise<any> => {
        return this.send.get(`/common/GetAllCumulativesParticipatingOfInterests`)
    }

    UpdateMandatory = (requestBody: IEditRequestBody): Promise<any> => {
        return this.send.put("/MandatoryRelianceInformation/Update", requestBody)
    }

    ActiveOrDeactiveMandatory = (requestBody: IActiveOrDeactiveRequestBody): Promise<any> => {
        return this.send.put("/MandatoryRelianceInformation/ActivateOrDeActivate", requestBody)
    }

    GetDetailForCopy = (requestBody: IGetDetailForCopyRequestBody): Promise<any> => {
        return this.send.post("/MandatoryRelianceInformation/GetDetailForCopy", requestBody)
    }

    GetHistoriesById = (requestBody: IGetHistoryRequestBody): Promise<any> => {
        return this.send.post("/MandatoryRelianceInformation/GetHistoriesById", requestBody)
    }

    GetHistoriesByIdAndChildId = (requestBody: IGetHistoryByIdAndChildRequestBody): Promise<any> => {
        return this.send.post("/MandatoryRelianceInformation/GetHistoriesByIdAndChildId", requestBody)
    }

    DeleteMandatory = (requestBody: IDeleteRecordRequestBody): Promise<any> => {
        return this.send.delete('/MandatoryRelianceInformation/Delete', { data: requestBody })
    }

    RangeDelete = (requestBody: IDeleteRangeRequestBody): Promise<any> => {
        return this.send.delete('/MandatoryRelianceInformation/RangeDelete', { data: requestBody })
    }

    GetExcelReport = (): Promise<AxiosResponse<IApiResult<IFileDownload>>> => {
        return new Promise((resolve, reject) => {
            this.send.post("/MandatoryRelianceInformation/ExcelForFirstLevel")
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

    GetLvlOneExcelReport = (requestBody: ILvlOneExcelRequestBody): Promise<AxiosResponse<IApiResult<IFileDownload>>> => {
        return new Promise((resolve, reject) => {
            this.send.post("/MandatoryRelianceInformation/ExcelForSecondLevel", requestBody)
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

    GetLvlTwoExcelReport = (requestBody: ILvlTwoExcelRequestBody): Promise<AxiosResponse<IApiResult<IFileDownload>>> => {
        return new Promise((resolve, reject) => {
            this.send.post("/MandatoryRelianceInformation/ExcelForThirdLevel", requestBody)
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

    AdvancedSearchFirst = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/MandatoryRelianceInformation/AdvancedSearchFirst", requestBody)
    }
    
    AdvancedSearchSecond = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/MandatoryRelianceInformation/AdvancedSearchSecond", requestBody)
    }
    
    AdvancedSearchThird = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/MandatoryRelianceInformation/AdvancedSearchThird", requestBody)
    }

    HistoryAdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/MandatoryRelianceInformation/HistoryAdvancedSearch", requestBody)
    }
    
    ParentHistoryAdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/MandatoryRelianceInformation/HistoryAdvancedSearchFirst", requestBody)
    }

}

export default new MandatoryApiRequest({ url: HttpBaseConstant.url })