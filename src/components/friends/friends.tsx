import { useUserStore } from "../../zustand/user_store/UserStore"

export const Friends = () => {
    const my_data = useUserStore((state) => state.user)
    const getReferals = useUserStore((state) => state.getReferals)
    console.log(my_data().userId!)
    console.log(getReferals(my_data().userId!))

    return (
        <div class=" text-white m-auto text-center w-screen h-screen">
            Friends
        </div>
    )
}