import { useState, useEffect } from 'react'

const Form = ({ handleSubmit, editingLink }) => {
  const [name, setName] = useState('')
  const [URL, setURL] = useState('')

  // Populate form when editing
  useEffect(() => {
    if (editingLink) {
      setName(editingLink.name)
      setURL(editingLink.URL)
    } else {
      setName('')
      setURL('')
    }
  }, [editingLink])

  const handleChange = (event) => {
    if (event.target.name === 'name') {
      setName(event.target.value)
    } else if (event.target.name === 'URL') {
      setURL(event.target.value)
    }
  }

  const onFormSubmit = (event) => {
    // to prevent page reload on form submit
    event.preventDefault()
    
    // Call the parent's handleSubmit function with the form data
    handleSubmit({ name, URL })
    
    // Clear the form after submission (only if not editing)
    if (!editingLink) {
      setName('')
      setURL('')
    }
  }

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Name:
        <input 
          type="text" 
          name="name" 
          value={name} 
          onChange={handleChange}
          placeholder="Enter link name"
          required
        />
      </label>
      <br />
      <label>
        URL:
        <input 
          type="url" 
          name="URL" 
          value={URL} 
          onChange={handleChange}
          placeholder="Enter URL (e.g., https://example.com)"
          required
        />
      </label>
      <br />
      <button type="submit">{editingLink ? 'Update Link' : 'Add Link'}</button>
    </form>
  )
}

export default Form