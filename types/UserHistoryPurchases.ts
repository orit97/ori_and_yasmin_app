
export type productsArray={
    ProductId:number, // מזהה מוצר
    amountPurcahse:number, //כמות שנרכשה
}

export type UserHistoryPurchases={
    numOfPurchases:number, //מספר רכישה
    productsArray:productsArray, //מערך מוצרים
    priceOnDayOfPurchase:number, //מחיר המוצר ביום הרכישה 
    dateOfPurchase:Date // תאריך ביצוע הרכישה
}



