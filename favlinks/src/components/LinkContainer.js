import { useState, useEffect } from 'react'
import Table from './Table';
import Form from './Form';

const LinkContainer = (props) => {
  const [favLinks, setFavLinks] = useState([])
  const [editingLink, setEditingLink] = useState(null)

  const fetchLinks = async () => {
    try {
      let response = await fetch('/links')
      let data = await response.json()
      setFavLinks(data)
      console.log(data)
    } catch(error) {
      console.log(error)
    }
  }

  const postLink = async (link) => {
    try {
      let response = await fetch('/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(link)
      })
      let message = await response.text()
      console.log(message)
      fetchLinks()
    } catch (error){
      console.log(error)
    }
  }

  const deleteLink = async (id) => {
    try {
      let response = await fetch(`/links/${id}`, {
        method: 'DELETE'
      })
      let message = await response.text()
      console.log(message)
      fetchLinks()
    } catch (error) {
      console.log(error)
    }
  }

  const updateLink = async (id, updatedLink) => {
    try {
      let response = await fetch(`/links/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedLink)
      })
      let message = await response.text()
      console.log(message)
      setEditingLink(null)
      fetchLinks()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      deleteLink(id)
    }
  }

  const handleUpdate = (id) => {
    const linkToEdit = favLinks.find(link => link.id === id)
    setEditingLink(linkToEdit)
  }

  const handleSubmit = (favLink) => {
    if (editingLink) {
      // Update existing link
      updateLink(editingLink.id, favLink)
    } else {
      // Create new link
      postLink(favLink)
    }
  }

  return (
    <div className="container">
      <h1>My Favorite Links</h1>
      <p>Add a new url with a name and link to the table.</p>
      <Table linkData={favLinks} removeLink={handleRemove} updateLink={handleUpdate} />

      <br />

      <h3>{editingLink ? 'Edit Link' : 'Add New'}</h3>
      <Form handleSubmit={handleSubmit} editingLink={editingLink} />
      {editingLink && (
        <button onClick={() => setEditingLink(null)}>Cancel Edit</button>
      )}
    </div>
  )
}

export default LinkContainer