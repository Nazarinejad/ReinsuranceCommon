import { useState } from 'react'
import ViewImageModalHook from './hook'

const ViewImageModal = (props: any) => {


    const [fileList, setFileList] = useState<any[]>([])

    const viewImageModalHook = ViewImageModalHook(props);

    const uploadProps = {
        onRemove: (file: any) => {
            setFileList([])
        },
        beforeUpload: (file: any) => {
            setFileList([file])
            return false;
        },
        fileList,
    };



    return (
        <div className="form_wrapper">
            <img src={viewImageModalHook.url} style={{width:'100%'}} />

        </div >
    );
}

export default ViewImageModal