
import React from 'react'
import { Form, Image } from 'semantic-ui-react'

const RadioInput = ({input, width, type, label, alt}) => {
  return (
    <Form.Field>
      <div className='ui radio'>
        <input {...input} type={type}/>{' '}
        <Image alt={alt} src={label} avatar/>
      </div>
    </Form.Field>
  )
}

export default RadioInput
