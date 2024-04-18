import {useMutation,useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useEditSetting()
{
    const queryClient=useQueryClient();
    const {isLoading:isEditing,mutate:EditSetting}=useMutation({
        mutationFn:async (newCabinData)=>{
            const data=await updateSetting(newCabinData);
            return data;
        },
        onSuccess:(data)=>{
            toast.success("Settings updated Succesfully");
            queryClient.invalidateQueries({
                queryKey:["settings"]
            });
        },
        onError:(error)=>{
            toast.error("Error updating settings");
            console.log(error);
        }
    });
    return [isEditing,EditSetting];
}