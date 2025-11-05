"use client";

import instance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import ChangeUserRole from "./PopupChangeUser";
import CustomHeader from "../ui/CustomHeader";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

interface Users {
  personID: number;
  name: string;
  e_Mail: string;
  phoneNumber: string;
  role: string;
  isVerified: number;
}

const UsersContent: React.FC = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false)
  const [userId, setUserId] = useState<number>(0)

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await instance.get("/api/Donations/GetAllPersons", {
        skipAuth: true,
      } as CustomAxiosRequestConfig);

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);


  const handelToggle = () => {
    setToggle(!toggle)
  }

  return (
    <>
    <ChangeUserRole
     toggle={toggle}
     setToggle={setToggle}
     getAllUsers= {getAllUsers}
     userId={userId}
    />
    <div className="p-6">
       <CustomHeader
         content={{
           title: "قائمة المستخدمين",
           description: "صفحة تعرض جميع المستخدمين مع إمكانية تعديل أدوارهم وإدارة بياناتهم.",
         }}
       />
      {loading ? (
        <p className="text-center text-gray-500">جاري تحميل المستخدمين...</p>
      ) : users.length > 0 ? (
        <div className="flex flex-col gap-4">
          {users.map((user, index) => (
            <div
              key={user.personID}
              className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {index + 1}- {user.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.role === "Admin"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {user.role === "Admin" ? "أدمن" : "مستخدم"}
                </span>
              </div>
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">البريد:</span>{" "}
                {user.e_Mail}
              </p>

                 <p className="text-gray-600">
                <span className="font-medium text-gray-700">الهاتف:</span>{" "}
                {user.phoneNumber}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">عملية التحقق:</span>{" "}
                {user.isVerified === 0 ? " لم يتم التحقق " : " تم التحقق بنجاح "}
              </p>
              <button 
              onClick={() => {
                handelToggle()
                setUserId(user.personID)
              }}
              className="mt-3 px-3 py-1.5 cursor-pointer text-white transition hover:bg-blue-500 rounded-full font-medium bg-blue-400"> تغير الدور </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">لا يوجد مستخدمين</p>
      )}
    </div>
     </>
  );
};

export default UsersContent;
