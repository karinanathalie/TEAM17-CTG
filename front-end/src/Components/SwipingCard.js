import CardInfo from "./CardInfo"

export const SwipingCard = () => {
    return(
        <div className="font-poppins bg-darkgray w-1/3 rounded-[16px] mt-32 m-8 text-white align-items-center">
            <div className="text-[32px] font-regular text-center m-16">
                Find the most suitable events <span className="text-pastelyellow"> near you! </span>
            </div>
            <div>
                <CardInfo />
            </div>
        </div>
    )
}