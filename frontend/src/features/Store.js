import { configureStore } from "@reduxjs/toolkit";
import { SignUpSlice } from "./Auth/SignUpSlice";
import { VerifyOTPSlice } from "./Auth/VerifySlice";
import LoginReducer from "./Auth/LoginSlice";
import ResendReducer from "./Auth/ResendOtpSlice";
import ForgetPasswordReducer from "./Auth/ForgetPasswordSlice";
import CompanyReducer from "./Auth/CompanySlice";
import { RequestEmailSlice } from "./Auth/RequestEmail";



const store = configureStore({
    reducer: {
        login: LoginReducer,
        signup: SignUpSlice.reducer,
        verifyOTP: VerifyOTPSlice.reducer,
        resend: ResendReducer,
        forgetPassword:  ForgetPasswordReducer,
        newCompany:  CompanyReducer,
        requestEmail: RequestEmailSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        }),
        devTools : true
});

export default store;
