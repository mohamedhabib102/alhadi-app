import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import { FormEvent } from "react";


interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}


interface BodyRequest {
   personID: number;
   amount: number;
   paymentMethod: string;
}
const confirmDonation = async(e:FormEvent, body: BodyRequest) =>{
    e.preventDefault();

    try {
        console.log(body);
        const res = await instance.post("/api/Donations/CreatePaymentSession", 
        body,
      {
        skipAuth: true,
      } as CustomAxiosRequestConfig)
      console.log(res);
      
    } catch (error) {
        console.log(error);
    }
}

export default confirmDonation;