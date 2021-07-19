import { Modal } from "antd";

export default class Utils {
    public static delay = async (delay: number = 500) => {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    public static getRandomInt = (border: number) => {
        return Math.floor(Math.random() * border);
    }

    public static showConfrimModal = (title: string, content: string, icon?: JSX.Element) => {
        Modal.confirm({
            title,
            content: <p>{content}</p>,
            icon,
            onOk() {
                Modal.destroyAll()
            },
            onCancel() {
                Modal.destroyAll()
            }
        })
    }
}