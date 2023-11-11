import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ReactQuill from 'react-quill'
import styles from './Instructions.module.css'

const Instructions = () => {
    const { control } = useFormContext()
  return (
    <div>
        <Controller
          name="instructions"
          control={control}
          render={({ field: {ref, ...field} }) => <ReactQuill theme='snow' className={styles.qlEditor} ref={ref} {...field} />}
        />
    </div>
  )
}

export default Instructions