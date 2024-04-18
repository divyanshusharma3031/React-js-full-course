import styled from "styled-components";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditCabin, createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { supabaseUrl } from "../../services/supabase";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ editCabin = {} }) {
  const { id: editId, ...editValues } = editCabin;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: async (data) => {
      if (!isEditSession) {
        const val = await createCabin(data);
        return val;
      }
      const val = await EditCabin(data, editId);
      return val;
    },
    onSuccess: (/*data*/) => {//this data comes from the return of mutation function
      // console.log(data);//this data comes from the return of mutation function
      if (!isEditSession) {
        toast.success("New Cabin Created!");
      } else {
        toast.success("Cabin updated successfully");
      }
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: () => {
      if (!isEditSession) {
        toast.error("Error Creating Created");
      } else {
        toast.error("Error updating cabin");
      }
    },
  });
  function onSubmit(data) {
    // data.image.at(0) par file save hoti hai
    const imageType=typeof data.image;
    if (imageType==="string") {
      if (data.image?.startsWith?.(supabaseUrl)) {
        mutate(data);
      } else {
        mutate({ ...data, image: data.image[0] });
      }
    } else {
      mutate({ ...data, image: data.image[0] });
    }
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Name Field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "maxCapacity Field is required",
            min: {
              value: 1,
              message: "Capacity should atleast be 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "regularPrice Field is required",
            min: {
              value: 0,
              message: "Capacity should atleast be 1",
            },
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("Discount", {
            required: "Discount Field is required",
            min: {
              value: 0,
              message: "Capacity should atleast be 1",
            },
            validate: (value) => {
              return value < getValues().regularPrice
                ? true
                : "Discount Should be less than regular";
            },
          })}
        />
        {errors?.Discount?.message && <Error>{errors.Discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "You must upload an image",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit Cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
