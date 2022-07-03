import { HttpBaseService, IApiResult, DownloaderFile, IFileDownload } from "sanhab-components-library";
import { AxiosResponse } from 'axios'
import { IEditFirstRequestBody, IAllPagedRequestBody, IGetRequestBody, IActiveOrDeactiveRequestBody, IAddFirstSignatureRequestBody, IAllPagedSubTableRequestBody, IQuickSearchRequestBody, IUpdateImageRequestBody, IAddecondSignatureRequestBody, IDeleteRequestBody, IEditSecondRequestBody, ILvlOneExcelRequestBody } from "./models"
import HttpBaseConstant from "../HttpBaseConstant"
import { IAdvancedsearchRequestBody } from '../../model/IAdvancedSearch'

class SignatureApiRequest extends HttpBaseService {
    AllPaged = (requestBody: IAllPagedRequestBody): Promise<any> => {
        return this.send.post("/Signature/GetListedPageFirst", requestBody)
    }

    AllPagedSubTable = (requestBody: IAllPagedSubTableRequestBody): Promise<any> => {
        return this.send.post("/Signature/GetListedPageSecond", requestBody)
    }

    QuickSearch = (requestBody: IQuickSearchRequestBody): Promise<any> => {
        return this.send.post("/Signature/QuickSearch", requestBody)
    }

    GetAllDepartments = (): Promise<any> => {
        return this.send.get("/Common/GetAllDepartment")
    }

    GetAllCompanies = (): Promise<any> => {
        return this.send.get("/Common/GetAllCompanies")
    }

    InsertFirstSignature = (requestBody: IAddFirstSignatureRequestBody): Promise<any> => {
        let formData = new FormData();
        formData.append("UserName", requestBody.userName);
        formData.append("Name", requestBody.name);
        formData.append("Image", requestBody.image);
        formData.append("Department", `${requestBody.department}`);

        return this.send.post("/Signature/CreateFirstSignatory", formData)
    }

    InsertSecondSignature = (requestBody: IAddecondSignatureRequestBody): Promise<any> => {
        
        
        let formData = new FormData();
        formData.append("UserName", requestBody.userName);
        formData.append("Name", requestBody.name);
        formData.append("Image", requestBody.image);
        formData.append("Department", `${requestBody.department}`);
        formData.append("ParentId", `${requestBody.parentId}`);
        requestBody.companyId.forEach((element:number) => {
            formData.append("CompanyId", `${element}`);
        });

        return this.send.post("/Signature/CreateSecondSignatory", formData)
    }

    // InsertSignature = (requestBody: IAddSignatureRequestBody): Promise<any> => {
    //     return this.send.post("/Signature/CreateSignature", requestBody)
    // }

    GetFirstSignatureById = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post(`/Signature/GetByIdFirst`, requestBody)
    }

    GetSecondSignatureById = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post(`/Signature/GetByIdSecond`, requestBody)
    }

    GetImageById = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post(`/Signature/GetImageById`, requestBody)
    }

    GetAllSignaturesBySignatureId = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post(`/Signature/GetAllSignaturesBySignatureId`, requestBody)
    }

    GetAllCumulativesParticipating = (): Promise<any> => {
        return this.send.get(`/common/GetAllCumulativesParticipatingOfInterests`)
    }

    UpdateFirstSignature = (requestBody: IEditFirstRequestBody): Promise<any> => {
        // let formData = new FormData();
        // formData.append("Id", `${requestBody.id}`);
        // formData.append("UserName", requestBody.userName);
        // formData.append("Name", requestBody.name);

        return this.send.put("/Signature/UpdateFirst", requestBody)
    }
    UpdateSecondSignature = (requestBody: IEditSecondRequestBody): Promise<any> => {
        return this.send.put("/Signature/UpdateSecond", requestBody)
    }

    UpdateImage = (requestBody: IUpdateImageRequestBody): Promise<any> => {
        let formData = new FormData();
        formData.append("Id", `${requestBody.id}`);
        formData.append("Image", requestBody.image);

        return this.send.put("/Signature/UpdateImage", formData)
    }

    ActiveOrDeactiveSignature = (requestBody: IActiveOrDeactiveRequestBody): Promise<any> => {
        return this.send.put("/Signature/ActivateOrDeActivate", requestBody)
    }

    GetHistoriesById = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post("/Signature/GetHistoriesById", requestBody)
    }

    DeleteSignature = (requestBody: IDeleteRequestBody): Promise<any> => {
        return this.send.delete('/Signature/Delete', { data: requestBody })
    }

    GetExcelReport = (): Promise<AxiosResponse<IApiResult<IFileDownload>>> => {
        return new Promise((resolve, reject) => {
            this.send.get("/Signature/ExcelForFirstSignatory")
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
            this.send.post("/Signature/ExcelForSecondSignatory", requestBody)
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
        return this.send.post("/Signature/AdvancedSearch", requestBody)
    }

    HistoryAdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/Signature/HistoryAdvancedSearch", requestBody)
    }

    ParentHistoryAdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/SubField/HistoryAdvancedSearchFirst", requestBody)
    }

}

export default new SignatureApiRequest({ url: HttpBaseConstant.url })