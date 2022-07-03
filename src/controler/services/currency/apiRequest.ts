import { HttpBaseService, IApiResult, DownloaderFile, IFileDownload } from "sanhab-components-library";
import { AxiosResponse } from 'axios'
import { IAllPagedRequestBody, IAdvancedsearchRequestBody } from "./models"
import HttpBaseConstant from "../HttpBaseConstant"


class CurrencyApiRequest extends HttpBaseService {
    AllPaged = (requestBody: IAllPagedRequestBody): Promise<any> => {
        return this.send.post("/Currency/GetListedPage", requestBody)
    }

    AdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/Currency/AdvancedSearch", requestBody)
    }

    GetExcelReport = (): Promise<AxiosResponse<IApiResult<IFileDownload>>> => {
        return new Promise((resolve, reject) => {
            this.send.get("/Currency/Excel")
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

}

export default new CurrencyApiRequest({ url: HttpBaseConstant.url })