import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSetting } from "./useEditSettings";
import { useSettings } from "./useSetting";
import Button from "../../ui/Button";

function UpdateSettingsForm({ isEditing: editMode ,toggleEdit}) {
  const { register, handleSubmit } = useForm();
  const [isEditing, EditSetting] = useEditSetting();
  const [isLoading, settings = {}] = useSettings(); // agar undefined hua to {} empty object se assign ho jaayga
  if (isLoading) {
    return <Spinner />;
  }
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakfastPrice,
  } = settings;
  function onSubmit(data) {
    EditSetting(data);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          {...register("minBookingLength", {
            required: "This Field is Reqiuired",
          })}
          disabled={!editMode}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={!editMode || isEditing}
          {...register("maxBookingLength", {
            required: "This Field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          disabled={!editMode || isEditing}
          {...register("maxGuestPerBooking", {
            required: "This Field is required",
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={!editMode || isEditing}
          {...register("breakfastPrice", {
            required: "This Field is required",
          })}
        />
      </FormRow>
      {editMode && (
        <FormRow>
          <Button>Save</Button>
        </FormRow>
      )}
    </Form>
  );
}
export default UpdateSettingsForm;
