"use client"
import { useAuth } from "@/utils/AuthContext";
import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import {  useRouter} from "next/navigation";
import FadeInOnScroll from "../ui/FadeInOnScroll";


interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}


interface ResponseData {
    sectionName: string;
    sectionImage: string;
    amount: number;
    donationDate: string;
}




const MyDonationFC: React.FC = () => {
    const {user, loading} = useAuth();
    const [dontion, setDonation] = useState<ResponseData[]>([])
    const router = useRouter();

    useEffect(() => {
        if (loading) return; 

      if (!user.id) {
        router.replace("/");
        return;
      }

    }, [user, router, loading]);

    useEffect(() => {

        if (user.id) {
            myDontion()
        }
    },[user.id])
     

    const myDontion = async () => {
        const id = Number(user.id);
        try {
            const res = await instance.get(
                `/api/Donations/GetMyDonations?personID=${id}`,
            {
            skipAuth: true,
          } as CustomAxiosRequestConfig)
          setDonation(res.data)
    
        } catch (error) {
            console.log(error);
        }
    }
     
    return (
      <>
      {!dontion.length ? 
      (<p className="text-center m-auto text-lg"> لا يوجد تبرعات حاليا يمكنك التبرع الأن </p>) : (

        <div className="grid md:grid-cols-3 gap-6 p-4">
            {dontion.map((donation, index) => (
        <FadeInOnScroll key={index}>
        <div
          key={index}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition"
        >
          <Image
            src={donation.sectionImage}
            alt={donation.sectionName}
            width={200}
            height={120}
            className="rounded-t w-full h-96 bg-cover max-w-full"
          />
          <div className="py-2.5 px-3 text-right">
              <h3 className="text-lg font-semibold text-gray-800">{donation.sectionName}</h3>
              <p className="text-gray-600">المبلغ: {donation.amount} ريال</p>
              <p className="text-gray-500 text-sm">
              تاريخ التبرع: {new Date(donation.donationDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

          </div>
        </div>
        </FadeInOnScroll>
      ))}
        </div>

      
  )}
      </>

    );
}

export default MyDonationFC;