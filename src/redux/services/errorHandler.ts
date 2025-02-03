import axios, { AxiosError } from 'axios';

export function isAxiosError<ResponseType>(error: unknown): error is AxiosError<ResponseType> {
    return axios.isAxiosError(error);
}

export const errorHandler = (error: AxiosError) => {
    const { request, response, message } = error;
    if (response) {
      const status = response.status;
      return {
        message,
        status,
      };
    } else if (request) {
      //request sent but no response received
      return {
        message: "server time out",
        status: 503,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return { message: "Something went wrong while setting up request" };
    }
  };