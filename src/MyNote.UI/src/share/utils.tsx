export default class Utils {
    public static delay = async (delay: number = 500) => {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

}