import { notification } from 'antd';

export function PushNotification(type: string, message: string, description?: string) {
    let placement: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | undefined = 'topRight'
    switch (type) {

        case 'error':
            notification.error({
                message: message,
                description: description,
                placement: placement
            });
            break;

        case 'success':
            notification.success({
                message: message,
                description: description,
                placement: placement
            });
            break;

        case 'info':
            notification.info({
                message: message,
                description: description,
                placement: placement
            });
            break;
        
        case 'warning':
            notification.warning({
                message: message,
                description: description,
                placement: placement
            });
            break;

        default:
            break;
    }

}