import { useState } from "react";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";
const Container=styled.div`
  display: flex;
  justify-content: space-between;
`
function Settings() {
  const [isEditing,setIsEditing]=useState(false);
  const toggleEdit=()=>
  {
    setIsEditing((isEditing)=>{
      return !isEditing;
    })
  }
  return <Row>
    <Container>
      <Heading as="h1">Update hotel settings</Heading>
      <Button onClick={toggleEdit}>{!isEditing?"Edit Settings":"Close"}</Button>
    </Container>
    <UpdateSettingsForm isEditing={isEditing} toggleEdit={toggleEdit}/>
  </Row>
}

export default Settings;
