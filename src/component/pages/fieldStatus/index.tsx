

import { ConfigProvider } from 'antd';
import FieldStatusContextStore from '../../pages/fieldStatus/context/store'
import classes from './fieldStatus.module.css'
import FieldStatusMain from './fieldStatusMain/index'


const FieldStatus = () => {
    

    return (
        <FieldStatusContextStore>
            <div className={classes.fieldStatus_wrapper}>
                <ConfigProvider direction="rtl">
                    <FieldStatusMain /> 
                </ConfigProvider>
            </div>
        </FieldStatusContextStore>
    )
}
export default FieldStatus