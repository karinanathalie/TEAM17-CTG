import { Input } from "@mui/material"
import { InputForm } from "./Input"
import { ButtonFull2, ButtonFull, ButtonYellow } from "./Button"


export const RegistrationCard = () => {
    return(
        <div className="font-poppins p-[32px] h-[54px] rounded-[8px] bg-black text-white w-1/3 h-auto">
            <div className="font-[500] text-[20px] w-full">
                Volunteer Registration
                 <div className="w-full mt-4">
                    <InputForm type="text" name="Phone Number" placeholder="Phone Number" > A </InputForm>
                    <InputForm type="text" name="Ethinicity" placeholder="Ethnicity" > A </InputForm>
                    <InputForm type="text" name="Gender" placeholder="Gender" > A </InputForm>
                </div>
                <div className="text-white flex justify-end text-[12px]">
                    Register as volunteer 
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <ButtonYellow> Save </ButtonYellow>
            </div>
        </div>
    )
}