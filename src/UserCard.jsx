function UserCard({ name, email, phone, website, company }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      color: '#1a202c'
    }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#2b6cb0' }}>{name}</h3>
      <p style={{ margin: '4px 0' }}><strong>Email:</strong> {email}</p>
      <p style={{ margin: '4px 0' }}><strong>Phone:</strong> {phone}</p>
      <p style={{ margin: '4px 0' }}><strong>Website:</strong> {website}</p>
      <p style={{ margin: '4px 0' }}><strong>Company:</strong> {company?.name || 'N/A'}</p>
    </div>
  );
}

export default UserCard;