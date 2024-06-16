import { Address } from "./Address";
import {UserHistoryPurchases} from "./UserHistoryPurchases"

export type CustomerProfile = {
    email: string; // כתובת מייל 
    Fname: string; //שם פרטי
    Lname: string; //שם משפחה
    phone: string; //מספר טלפון נייד
    image: string; //תמונה
    birthDate: Date; //תאריך לידה
    password: string; //סיסמה
    confirmPassword:string;
    isActive?: boolean; //האם לקוח פעיל 
    address: Address; // כתובת מגורים --> TYPE ADDRESS
    deliveryAddress?: Address; //כתובת למשלוח --TYPE ADDRESS>
    UserHistoryPurchases?:UserHistoryPurchases[]; //היסטוריית רכישות
}

