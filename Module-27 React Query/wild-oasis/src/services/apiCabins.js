import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins cant be found");
  }
  return cabins;
}

export async function EditCabin(newCabin, id) {
  const hasPath = newCabin.image?.startsWith?.(supabaseUrl);
  if (!hasPath) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
      "/",
      ""
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`;
    const { data, error } = await supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
      throw new Error("Cabin could not be created");
    }
    // 2.Upload file
    const { error: UploadError } = await supabase.storage
      .from("cabinImages")
      .upload(imageName, newCabin.image);
    // 3. Agar uploading mai dikkat aa jaye to delete the stored cabin
    if (UploadError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(UploadError);
      throw new Error(
        "Cabin image cant be uploaded,Cabin could not be created"
      );
    }
    return data;
  } else {
    const { data, error: UploadError } = await supabase
      .from("cabins")
      .update({ ...newCabin })
      .eq("id", id)
      .select();
    if (UploadError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(UploadError);
      throw new Error("Cabin image cant be uploaded,Cabin could not be edited");
    }
    return data;
  }
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  // 1)Create cabin
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single(); //the reason is thiks wors here is that the object structure is same as the row in supabase agar nahi ho toh manually apko banana padega obviouslly
  // this .single() returns the first value of the array[ returns arr[0]].
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }
  // 2.Upload file
  const { error: UploadError } = await supabase.storage
    .from("cabinImages")
    .upload(imageName, newCabin.image);
  // 3. Agar uploading mai dikkat aa jaye to delete the stored cabin
  if (UploadError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(UploadError);
    throw new Error("Cabin image cant be uploaded,Cabin could not be created");
  }
  return data;
}

export async function deleteCabins(id) {
  console.log(id);
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin couldnt be deleted");
  }
  return "Deleted Successfully";
}
