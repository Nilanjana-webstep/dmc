export const  generateFourDigitOTP =()=> {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    return otp;
}

export const varifyOtp = (storedOtp,userOtp)=>{

    return storedOtp == userOtp;

}