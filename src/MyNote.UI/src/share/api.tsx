import { Vocabulary } from '../model/vocabulary';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import Utils from './utils';

export interface IAPI {
    getVocabularies: () => Promise<Array<Vocabulary>>
}

interface CommonResponse<T = any> {
    status: number;
    message: string;
    data: T;
}

export class API implements IAPI {
    private static Instance: IAPI;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://localhost:5001/api',
            timeout: 2500,
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            }
        });

        this.axiosInstance.interceptors.response.use((response: AxiosResponse<CommonResponse>) => {
            if (!response.data.status || response.data.status !== 200) {
                response.status = 500;
                Utils.showConfrimModal('Exception', 'Server error: ' + response.data.message);
            }
            return response;
        }, (error: AxiosError) => {
            if (error.message) {
                Utils.showConfrimModal('Exception', error.message);
            }
            return Promise.reject(error);
        });
    }

    public static getInstance = () => {
        if (API.Instance == null) {
            API.Instance = new API();
        }

        return API.Instance;
    }

    public getVocabularies = () => {
        return this.axiosInstance.get('/learnEN/vocabulary').then((response: AxiosResponse<CommonResponse<Array<string>>>) => {
            return response.data.data.map(item => {
                return {
                    word: item
                };
            });
        });
    }

}