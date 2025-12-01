import React from 'react'

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Update</th>
        <th>Remove</th>
      </tr>
    </thead>
  )
}

const TableBody = (props) => {
  const rows = props.linkData.map((row) => {
    // Handle both uppercase and lowercase URL field names
    const url = row.URL || row.url || ''
    return (
      <tr key={row.id}>
        <td>{row.name}</td>
        <td>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>{url}</a>
        </td>
        <td>
          <button onClick={() => props.updateLink(row.id)}>Update</button>
        </td>
        <td>
          <button onClick={() => props.removeLink(row.id)}>Delete</button>
        </td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}

const Table = (props) => {
  return (
    <table>
      <TableHeader />
      <TableBody linkData={props.linkData} removeLink={props.removeLink} updateLink={props.updateLink} />
    </table>
  )
}

export default Table
