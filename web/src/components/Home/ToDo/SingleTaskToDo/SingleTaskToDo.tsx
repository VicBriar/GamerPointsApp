import { Form,FormError,FieldError,CheckboxField, Label } from "@redwoodjs/forms"

interface SingleTaskToDoProps {
complete: boolean;
description: string;
id: number;
}

const SingleTaskToDo = (props:SingleTaskToDoProps) => {
  let {complete,description,id} = props;
  return (
    <div className="mx-5">
      <Form className="flex p-3"
      >
        <FormError/>

        <CheckboxField
          name="completed"
          className="mx-2"
          defaultChecked={complete}
        ></CheckboxField>
        <Label
          name="completed"
          className="mx-2"
        >
          {description}
        </Label>
      </Form>
    </div>
  )
}

export default SingleTaskToDo
