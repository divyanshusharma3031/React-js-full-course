import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";
export function useDeleteCabin()
{
    const queryClient = useQueryClient();
    const { isLoading: isDeleting, mutate:deleteCabin } = useMutation({
      mutationFn: async (id) => {
        const data = await deleteCabins(id);
        console.log(data);
      },
      onSuccess: () => {
        // What to do when mutation is Succesfully.
    
        // We want to refresh This is done by invalidating the cache
        toast.success("Succesfully deleted");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
      },
      onError: (err) => {
        toast("Error in deleting ", err);
      },
    });
    return [isDeleting,deleteCabin];
}
