import { Form,FormError,FieldError,CheckboxField, Label } from "@redwoodjs/forms"

const SingleTaskToDo = () => {
  return (
    <div className="mx-5">
      <Form>
        <FormError/>

        <CheckboxField
          name="completed"
          className="mx-2"
        ></CheckboxField>
        <Label
          name="completed"
          className="mx-2"
        >prop of description</Label>
      </Form>
    </div>
  )
}

export default SingleTaskToDo
