import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FooterMinimal } from '../components/Footer'

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState('submissions')
  const [submissions, setSubmissions] = useState([])
  const [workItems, setWorkItems] = useState([])
  const [courses, setCourses] = useState([])
  
  // Dynamic Page Sections Builder State
  const [selectedPage, setSelectedPage] = useState('home')
  const [pageSections, setPageSections] = useState([])
  const [newSectionKey, setNewSectionKey] = useState('')
  const [newSectionType, setNewSectionType] = useState('text')
  const [newSectionForm, setNewSectionForm] = useState({ title: '', body: '', description: '', url: '', alt: '', layout: 'media-right', items: [] })
  const [showAddSection, setShowAddSection] = useState(false)

  // Upload progress indicator
  const [uploading, setUploading] = useState(false)

  // Grid Builder helpers
  const [gridForm, setGridForm] = useState({ title: '', subtitle: '', description: '', url: '' })

  // CRUD Forms - Work Items
  const [editingWork, setEditingWork] = useState(null)
  const [workForm, setWorkForm] = useState({ cat: 'drama', size: 'third', img: '', alt: '', label: '', featured: false, work_cat: '', title: '', badges: '' })

  // CRUD Forms - Courses
  const [editingCourse, setEditingCourse] = useState(null)
  const [courseForm, setCourseForm] = useState({ title: '', description: '', level: 'beginner', modules: '', duration: '', price: '', cta_link: '/contact' })

  // Verify auth on mount
  useEffect(() => {
    if (token) {
      fetch('/api/admin/check', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
        if (!res.ok) {
          handleLogout()
        }
      })
      .catch(() => handleLogout())
    }
  }, [token])

  // Fetch admin dashboard lists
  useEffect(() => {
    if (token) {
      fetchSubmissions()
      fetchWork()
      fetchCourses()
      fetchPageSections()
    }
  }, [token, activeTab, selectedPage])

  function handleLogout() {
    localStorage.removeItem('admin_token')
    setToken('')
  }

  async function handleLogin(e) {
    e.preventDefault()
    setLoginError('')
    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        body: formData
      })
      
      if (!res.ok) {
        throw new Error('Invalid username or password')
      }
      
      const data = await res.json()
      localStorage.setItem('admin_token', data.access_token)
      setToken(data.access_token)
    } catch (err) {
      setLoginError(err.message)
    }
  }

  // File Upload Helper
  async function handleFileUpload(e, onUploadSuccess) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      })
      if (res.ok) {
        const data = await res.json()
        onUploadSuccess(data.url)
      } else {
        alert('File upload failed')
      }
    } catch (err) {
      alert('Upload error')
    }
    setUploading(false)
  }

  // Fetch functions
  async function fetchSubmissions() {
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setSubmissions(data)
      }
    } catch (e) { console.log(e) }
  }

  async function fetchWork() {
    try {
      const res = await fetch('/api/work')
      if (res.ok) {
        const data = await res.json()
        setWorkItems(data)
      }
    } catch (e) { console.log(e) }
  }

  async function fetchCourses() {
    try {
      const res = await fetch('/api/courses')
      if (res.ok) {
        const data = await res.json()
        setCourses(data)
      }
    } catch (e) { console.log(e) }
  }

  async function fetchPageSections() {
    try {
      const res = await fetch(`/api/pages/${selectedPage}`)
      if (res.ok) {
        const data = await res.json()
        if (data._sections) {
          setPageSections(data._sections)
        }
      }
    } catch (e) { console.log(e) }
  }

  // Dynamic Section Builder Actions
  async function handleUpdateSection(sectionKey, content) {
    try {
      const res = await fetch(`/api/pages/${selectedPage}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          section_key: sectionKey,
          content
        })
      })
      if (res.ok) {
        alert(`Section '${sectionKey}' successfully saved!`)
        fetchPageSections()
      }
    } catch (err) { alert('Save failed') }
  }

  async function handleDeleteSection(sectionKey) {
    if (!confirm(`Are you sure you want to delete section '${sectionKey}'?`)) return
    try {
      const res = await fetch(`/api/pages/${selectedPage}/${sectionKey}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        fetchPageSections()
      }
    } catch (err) { alert('Delete failed') }
  }

  async function handleAddSection(e) {
    e.preventDefault()
    if (!newSectionKey) return
    
    // Construct content layout based on type
    let content = { type: newSectionType }
    if (newSectionType === 'text') {
      content.title = newSectionForm.title
      content.subtitle = newSectionForm.description
    } else if (newSectionType === 'image') {
      content.title = newSectionForm.title
      content.url = newSectionForm.url
      content.alt = newSectionForm.alt
      content.layout = newSectionForm.layout
    } else if (newSectionType === 'video') {
      content.title = newSectionForm.title
      content.video_url = newSectionForm.url
      content.description = newSectionForm.description
      content.layout = newSectionForm.layout
    } else if (newSectionType === 'grid') {
      content.title = newSectionForm.title
      content.description = newSectionForm.description
      content.items = []
    }
    
    try {
      const res = await fetch(`/api/pages/${selectedPage}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          section_key: newSectionKey,
          content
        })
      })
      if (res.ok) {
        alert(`Custom section '${newSectionKey}' created!`)
        setNewSectionKey('')
        setNewSectionForm({ title: '', body: '', description: '', url: '', alt: '', layout: 'media-right', items: [] })
        setShowAddSection(false)
        fetchPageSections()
      }
    } catch (err) { alert('Add section failed') }
  }

  // Section Ordering
  async function handleSaveSectionOrder(updatedList) {
    const keys = updatedList.map(s => s.section_key)
    try {
      const res = await fetch(`/api/pages/${selectedPage}/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ section_keys: keys })
      })
      if (res.ok) {
        setPageSections(updatedList)
      }
    } catch (err) { alert('Reordering save failed') }
  }

  function moveSection(index, direction) {
    const newList = [...pageSections]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= newList.length) return
    
    const temp = newList[index]
    newList[index] = newList[targetIndex]
    newList[targetIndex] = temp
    
    handleSaveSectionOrder(newList)
  }

  // Grid/List Items Builders
  function addGridItem(sectionIdx) {
    if (!gridForm.title) return
    const newList = [...pageSections]
    const newItems = newList[sectionIdx].content.items || []
    
    newItems.push({
      id: Date.now(),
      title: gridForm.title,
      subtitle: gridForm.subtitle,
      description: gridForm.description,
      url: gridForm.url
    })
    
    newList[sectionIdx].content.items = newItems
    setPageSections(newList)
    setGridForm({ title: '', subtitle: '', description: '', url: '' })
  }

  function deleteGridItem(sectionIdx, itemIdx) {
    const newList = [...pageSections]
    newList[sectionIdx].content.items.splice(itemIdx, 1)
    setPageSections(newList)
  }

  function moveGridItem(sectionIdx, itemIdx, direction) {
    const newList = [...pageSections]
    const items = newList[sectionIdx].content.items
    const targetIdx = itemIdx + direction
    if (targetIdx < 0 || targetIdx >= items.length) return
    
    const temp = items[itemIdx]
    items[itemIdx] = items[targetIdx]
    items[targetIdx] = temp
    
    newList[sectionIdx].content.items = items
    setPageSections(newList)
  }

  // Work Item Ordering
  async function handleSaveWorkOrder(updatedList) {
    const ids = updatedList.map(item => item.id)
    try {
      const res = await fetch('/api/admin/work/reorder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids })
      })
      if (res.ok) {
        setWorkItems(updatedList)
      }
    } catch (err) { alert('Reordering save failed') }
  }

  function moveWork(index, direction) {
    const newList = [...workItems]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= newList.length) return
    
    const temp = newList[index]
    newList[index] = newList[targetIndex]
    newList[targetIndex] = temp
    
    handleSaveWorkOrder(newList)
  }

  // Courses Ordering
  async function handleSaveCourseOrder(updatedList) {
    const ids = updatedList.map(item => item.id)
    try {
      const res = await fetch('/api/admin/courses/reorder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids })
      })
      if (res.ok) {
        setCourses(updatedList)
      }
    } catch (err) { alert('Reordering save failed') }
  }

  function moveCourse(index, direction) {
    const newList = [...courses]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= newList.length) return
    
    const temp = newList[index]
    newList[index] = newList[targetIndex]
    newList[targetIndex] = temp
    
    handleSaveCourseOrder(newList)
  }

  // Work Item CRUD
  async function handleSaveWork(e) {
    e.preventDefault()
    const url = editingWork ? `/api/admin/work/${editingWork.id}` : '/api/admin/work'
    const method = editingWork ? 'PUT' : 'POST'
    
    try {
      const formattedBadges = workForm.badges.split(',').map(b => b.trim()).filter(b => b)
      const payload = { ...workForm, badges: formattedBadges }
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      
      if (res.ok) {
        alert('Work item successfully saved!')
        setEditingWork(null)
        setWorkForm({ cat: 'drama', size: 'third', img: '', alt: '', label: '', featured: false, work_cat: '', title: '', badges: '' })
        fetchWork()
      }
    } catch (err) { alert('Action failed') }
  }

  async function handleDeleteWork(id) {
    if (!confirm('Are you sure you want to delete this portfolio work item?')) return
    try {
      const res = await fetch(`/api/admin/work/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        fetchWork()
      }
    } catch (err) { alert('Delete failed') }
  }

  function startEditWork(item) {
    setEditingWork(item)
    setWorkForm({
      cat: item.cat,
      size: item.size,
      img: item.img,
      alt: item.alt,
      label: item.label,
      featured: item.featured,
      work_cat: item.work_cat,
      title: item.title,
      badges: item.badges.join(', ')
    })
  }

  // Course CRUD Actions
  async function handleSaveCourse(e) {
    e.preventDefault()
    const url = editingCourse ? `/api/admin/courses/${editingCourse.id}` : '/api/admin/courses'
    const method = editingCourse ? 'PUT' : 'POST'
    
    try {
      const formattedModules = courseForm.modules.split(',').map(m => m.trim()).filter(m => m)
      const payload = { ...courseForm, modules: formattedModules }
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      
      if (res.ok) {
        alert('Course successfully saved!')
        setEditingCourse(null)
        setCourseForm({ title: '', description: '', level: 'beginner', modules: '', duration: '', price: '', cta_link: '/contact' })
        fetchCourses()
      }
    } catch (err) { alert('Action failed') }
  }

  async function handleDeleteCourse(id) {
    if (!confirm('Are you sure you want to delete this course?')) return
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        fetchCourses()
      }
    } catch (err) { alert('Delete failed') }
  }

  function startEditCourse(course) {
    setEditingCourse(course)
    setCourseForm({
      title: course.title,
      description: course.description,
      level: course.level,
      modules: course.modules.join(', '),
      duration: course.duration,
      price: course.price,
      cta_link: course.cta_link
    })
  }

  // Render Login Panel
  if (!token) {
    return (
      <div className="contact-layout" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '3rem',
          maxWidth: '450px',
          width: '100%',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          backdropFilter: 'blur(8px)'
        }}>
          <div className="form-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>Admin Login</h2>
            <p>EskeeWalker Strategies CMS Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="contact-form">
            {loginError && (
              <div style={{ color: 'var(--accent2)', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
                {loginError}
              </div>
            )}
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <input 
                id="username" 
                type="text" 
                className="form-input" 
                required 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
              />
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label" htmlFor="password">Password</label>
              <input 
                id="password" 
                type="password" 
                className="form-input" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
            </div>
            <button type="submit" className="submit-btn" style={{ width: '100%', marginTop: '2rem' }}>
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Render Dashboard
  return (
    <div style={{ padding: '8rem 3rem 4rem', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans', letterSpacing: '-0.02em' }}>
            Eskee<span>Walker</span> Dashboard
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Welcome, Admin. Real-time updates active.</p>
        </div>
        <button onClick={handleLogout} className="filter-btn active">
          Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem', alignItems: 'start' }}>
        {/* Navigation Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg2)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <button 
            className={`service-link ${activeTab === 'submissions' ? 'active' : ''}`}
            style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: activeTab === 'submissions' ? 'var(--bg3)' : 'transparent', color: activeTab === 'submissions' ? 'var(--accent)' : 'var(--text)' }}
            onClick={() => setActiveTab('submissions')}
          >
            Form Submissions
          </button>
          <button 
            className={`service-link ${activeTab === 'builder' ? 'active' : ''}`}
            style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: activeTab === 'builder' ? 'var(--bg3)' : 'transparent', color: activeTab === 'builder' ? 'var(--accent)' : 'var(--text)' }}
            onClick={() => setActiveTab('builder')}
          >
            Page Layout Builder
          </button>
          <button 
            className={`service-link ${activeTab === 'portfolio' ? 'active' : ''}`}
            style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: activeTab === 'portfolio' ? 'var(--bg3)' : 'transparent', color: activeTab === 'portfolio' ? 'var(--accent)' : 'var(--text)' }}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio items
          </button>
          <button 
            className={`service-link ${activeTab === 'courses' ? 'active' : ''}`}
            style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: activeTab === 'courses' ? 'var(--bg3)' : 'transparent', color: activeTab === 'courses' ? 'var(--accent)' : 'var(--text)' }}
            onClick={() => setActiveTab('courses')}
          >
            Academy Courses
          </button>
        </div>

        {/* Dynamic Panels */}
        <div style={{ background: 'var(--bg2)', padding: '2.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', minHeight: '500px' }}>
          
          {/* Submissions Tab */}
          {activeTab === 'submissions' && (
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', fontWeight: 700 }}>Client Form Submissions</h3>
              {submissions.length === 0 ? (
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No client enquiries received yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {submissions.map(sub => (
                    <div key={sub.id} style={{ background: 'var(--bg3)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                        <div>
                          <strong style={{ fontSize: '1.1rem' }}>{sub.name}</strong>
                          <span style={{ color: 'var(--muted)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>&lt;{sub.email}&gt;</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                          {new Date(sub.submitted_at).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                        <div><strong>Company:</strong> {sub.company || 'N/A'}</div>
                        <div><strong>Service:</strong> {sub.service || 'N/A'}</div>
                        <div><strong>Budget:</strong> {sub.budget || 'N/A'}</div>
                      </div>
                      <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem', color: 'var(--text)', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '4px' }}>
                        {sub.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Dynamic Page Layout Builder Tab */}
          {activeTab === 'builder' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Visual Page Layout Builder</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Reorder layout components, edit static copy, or add new text, images, and videos.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <label className="form-label" style={{ margin: 0 }}>Select Page:</label>
                  <select 
                    className="form-select" 
                    style={{ width: '180px', padding: '0.5rem 1rem' }}
                    value={selectedPage} 
                    onChange={e => setSelectedPage(e.target.value)}
                  >
                    <option value="home">Home Page</option>
                    <option value="studio">AI Creative Studio</option>
                    <option value="sustainability">Sustainability</option>
                    <option value="about">About Studio</option>
                    <option value="courses">Academy Page</option>
                  </select>
                </div>
              </div>

              {/* Add Custom Section Button */}
              <div style={{ marginBottom: '2rem' }}>
                <button 
                  onClick={() => setShowAddSection(!showAddSection)} 
                  className="filter-btn active"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  {showAddSection ? 'Cancel' : '+ Add Custom Block (Text/Image/Video/Grid)'}
                </button>
              </div>

              {showAddSection && (
                <form onSubmit={handleAddSection} className="contact-form" style={{ marginBottom: '2.5rem', background: 'var(--bg3)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 600 }}>Create New Block</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Block Unique Identifier (Unique Key)</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required 
                        placeholder="e.g. intro_banner, team_members" 
                        value={newSectionKey} 
                        onChange={e => setNewSectionKey(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Block Type</label>
                      <select 
                        className="form-select" 
                        value={newSectionType} 
                        onChange={e => setNewSectionType(e.target.value)}
                      >
                        <option value="text">Text Content Block</option>
                        <option value="image">Image Content Block</option>
                        <option value="video">Embedded Video Block</option>
                        <option value="grid">Team Grid / Dynamic List Block</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label className="form-label">Block Heading / Title</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      placeholder="Enter heading..." 
                      value={newSectionForm.title} 
                      onChange={e => setNewSectionForm(p => ({ ...p, title: e.target.value }))} 
                    />
                  </div>

                  {(newSectionType === 'text' || newSectionType === 'video' || newSectionType === 'grid') && (
                    <div className="form-group" style={{ marginTop: '1rem' }}>
                      <label className="form-label">Description / Subtitle</label>
                      <textarea 
                        className="form-textarea" 
                        placeholder="Enter copy..." 
                        value={newSectionForm.description} 
                        onChange={e => setNewSectionForm(p => ({ ...p, description: e.target.value }))} 
                      />
                    </div>
                  )}

                  {(newSectionType === 'image' || newSectionType === 'video') && (
                    <div className="form-row" style={{ marginTop: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Text-Media Layout Alignment</label>
                        <select 
                          className="form-select" 
                          value={newSectionForm.layout} 
                          onChange={e => setNewSectionForm(p => ({ ...p, layout: e.target.value }))}
                        >
                          <option value="media-right">Text on Left, Media on Right</option>
                          <option value="media-left">Text on Right, Media on Left</option>
                          <option value="media-top">Media on Top, Text Below</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Direct Upload or Paste URL</label>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder={newSectionType === 'image' ? 'https://images.unsplash.com/...' : 'https://www.youtube.com/embed/...'} 
                            value={newSectionForm.url} 
                            onChange={e => setNewSectionForm(p => ({ ...p, url: e.target.value }))} 
                          />
                          <input 
                            type="file" 
                            accept={newSectionType === 'image' ? 'image/*' : 'video/*'} 
                            style={{ display: 'none' }} 
                            id="file-upload-add" 
                            onChange={e => handleFileUpload(e, (url) => setNewSectionForm(p => ({ ...p, url })))} 
                          />
                          <label htmlFor="file-upload-add" className="filter-btn active" style={{ whiteSpace: 'nowrap', cursor: 'pointer', margin: 0 }}>
                            {uploading ? 'Uploading...' : 'Upload File'}
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {newSectionType === 'image' && (
                    <div className="form-group" style={{ marginTop: '1rem' }}>
                      <label className="form-label">Image Alt Description</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. ESG Report showcase mockup" 
                        value={newSectionForm.alt} 
                        onChange={e => setNewSectionForm(p => ({ ...p, alt: e.target.value }))} 
                      />
                    </div>
                  )}

                  <button type="submit" className="submit-btn" style={{ marginTop: '2rem' }}>
                    Append Block to Layout
                  </button>
                </form>
              )}

              {/* Render Section Block Editors dynamically */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {pageSections.map((sec, idx) => {
                  const content = sec.content
                  return (
                    <div 
                      key={sec.section_key} 
                      style={{ 
                        background: 'var(--bg3)', 
                        border: '1px solid var(--border)', 
                        borderRadius: 'var(--radius)', 
                        padding: '2rem'
                      }}
                    >
                      {/* Section Card Header containing Drag-like controls */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.08)', padding: '0.2rem 0.6rem', borderRadius: '4px', textTransform: 'uppercase', marginRight: '0.5rem', color: 'var(--accent)' }}>
                            {content.type || 'text'}
                          </span>
                          <strong style={{ fontSize: '1.1rem', fontFamily: 'Plus Jakarta Sans' }}>{sec.section_key}</strong>
                        </div>
                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                          <button 
                            onClick={() => moveSection(idx, -1)} 
                            disabled={idx === 0}
                            style={{ background: 'transparent', border: '1px solid var(--border)', color: idx === 0 ? 'var(--muted)' : 'var(--text)', padding: '0.4rem 0.6rem', borderRadius: '4px', cursor: idx === 0 ? 'not-allowed' : 'pointer' }}
                            title="Move Up"
                          >
                            ▲
                          </button>
                          <button 
                            onClick={() => moveSection(idx, 1)} 
                            disabled={idx === pageSections.length - 1}
                            style={{ background: 'transparent', border: '1px solid var(--border)', color: idx === pageSections.length - 1 ? 'var(--muted)' : 'var(--text)', padding: '0.4rem 0.6rem', borderRadius: '4px', cursor: idx === pageSections.length - 1 ? 'not-allowed' : 'pointer' }}
                            title="Move Down"
                          >
                            ▼
                          </button>
                          <button 
                            onClick={() => handleDeleteSection(sec.section_key)}
                            style={{ background: 'transparent', border: '1px solid var(--accent2)', color: 'var(--accent2)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', marginLeft: '0.5rem' }}
                          >
                            Delete Block
                          </button>
                        </div>
                      </div>

                      {/* Direct Editing fields inside each block card */}
                      <form onSubmit={(e) => {
                        e.preventDefault()
                        handleUpdateSection(sec.section_key, content)
                      }}>
                        <div className="form-group">
                          <label className="form-label">Block Title</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={content.title || ''} 
                            onChange={e => {
                              const newList = [...pageSections]
                              newList[idx].content.title = e.target.value
                              setPageSections(newList)
                            }}
                          />
                        </div>

                        {(content.type === 'text' || content.type === 'video' || content.type === 'grid' || content.subtitle !== undefined || content.description !== undefined) && (
                          <div className="form-group" style={{ marginTop: '1rem' }}>
                            <label className="form-label">
                              {content.type === 'video' ? 'Description' : 'Subtitle (supports \\n for line breaks)'}
                            </label>
                            <textarea 
                              className="form-textarea" 
                              style={{ minHeight: '80px' }}
                              value={content.subtitle !== undefined ? content.subtitle : (content.description || '')} 
                              onChange={e => {
                                const newList = [...pageSections]
                                if (newList[idx].content.subtitle !== undefined) {
                                  newList[idx].content.subtitle = e.target.value
                                } else {
                                  newList[idx].content.description = e.target.value
                                }
                                setPageSections(newList)
                              }}
                            />
                          </div>
                        )}

                        {/* Layout Alignment Options */}
                        {(content.type === 'image' || content.type === 'video') && (
                          <div className="form-group" style={{ marginTop: '1rem' }}>
                            <label className="form-label">Text-Media Layout Alignment</label>
                            <select 
                              className="form-select"
                              value={content.layout || 'media-right'}
                              onChange={e => {
                                const newList = [...pageSections]
                                newList[idx].content.layout = e.target.value
                                setPageSections(newList)
                              }}
                            >
                              <option value="media-right">Text on Left, Media on Right</option>
                              <option value="media-left">Text on Right, Media on Left</option>
                              <option value="media-top">Media on Top, Text Below</option>
                            </select>
                          </div>
                        )}

                        {/* Media Input with Direct File Upload */}
                        {(content.type === 'image' || content.type === 'video' || content.url !== undefined || content.video_url !== undefined) && (
                          <div className="form-group" style={{ marginTop: '1rem' }}>
                            <label className="form-label">
                              {content.type === 'image' ? 'Image File / URL' : 'Embedded Video File / URL'}
                            </label>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                              <input 
                                type="text" 
                                className="form-input" 
                                value={content.url !== undefined ? content.url : (content.video_url || '')} 
                                onChange={e => {
                                  const newList = [...pageSections]
                                  if (newList[idx].content.url !== undefined) {
                                    newList[idx].content.url = e.target.value
                                  } else {
                                    newList[idx].content.video_url = e.target.value
                                  }
                                  setPageSections(newList)
                                }}
                              />
                              <input 
                                type="file" 
                                accept={content.type === 'image' ? 'image/*' : 'video/*'} 
                                style={{ display: 'none' }} 
                                id={`file-upload-edit-${sec.section_key}`} 
                                onChange={e => handleFileUpload(e, (url) => {
                                  const newList = [...pageSections]
                                  if (newList[idx].content.url !== undefined) {
                                    newList[idx].content.url = url
                                  } else {
                                    newList[idx].content.video_url = url
                                  }
                                  setPageSections(newList)
                                })} 
                              />
                              <label htmlFor={`file-upload-edit-${sec.section_key}`} className="filter-btn active" style={{ whiteSpace: 'nowrap', cursor: 'pointer', margin: 0 }}>
                                {uploading ? 'Uploading...' : 'Upload File'}
                              </label>
                            </div>
                          </div>
                        )}

                        {content.type === 'image' && (
                          <div className="form-group" style={{ marginTop: '1rem' }}>
                            <label className="form-label">Image Alt</label>
                            <input 
                              type="text" 
                              className="form-input" 
                              value={content.alt || ''} 
                              onChange={e => {
                                const newList = [...pageSections]
                                newList[idx].content.alt = e.target.value
                                setPageSections(newList)
                              }}
                            />
                          </div>
                        )}

                        {/* Dynamic Grid Manager (e.g. Team people grid) */}
                        {content.type === 'grid' && (
                          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', fontWeight: 600 }}>Grid Items / Members List</h4>
                            
                            {/* Grid Items List with arrows */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                              {(content.items || []).map((item, itemIdx) => (
                                <div key={item.id || itemIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg2)', padding: '0.8rem 1.2rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {item.url && <img src={item.url} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />}
                                    <div>
                                      <strong>{item.title}</strong>
                                      <span style={{ color: 'var(--accent)', fontSize: '0.75rem', marginLeft: '0.5rem' }}>{item.subtitle}</span>
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                                    <button type="button" onClick={() => moveGridItem(idx, itemIdx, -1)} disabled={itemIdx === 0} style={{ background: 'transparent', border: 'none', color: itemIdx === 0 ? 'var(--muted)' : 'var(--text)', cursor: 'pointer', padding: '0.2rem' }}>▲</button>
                                    <button type="button" onClick={() => moveGridItem(idx, itemIdx, 1)} disabled={itemIdx === (content.items || []).length - 1} style={{ background: 'transparent', border: 'none', color: itemIdx === (content.items || []).length - 1 ? 'var(--muted)' : 'var(--text)', cursor: 'pointer', padding: '0.2rem' }}>▼</button>
                                    <button type="button" onClick={() => deleteGridItem(idx, itemIdx)} style={{ background: 'transparent', border: 'none', color: 'var(--accent2)', cursor: 'pointer', marginLeft: '0.5rem', fontSize: '0.85rem' }}>Delete</button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Add Item form */}
                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '6px', border: '1px dashed var(--border)' }}>
                              <h5 style={{ fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>+ Add Grid Member</h5>
                              <div className="form-row">
                                <div className="form-group">
                                  <label className="form-label">Name / Title</label>
                                  <input type="text" className="form-input" placeholder="e.g. Jitaksh Jain" value={gridForm.title} onChange={e => setGridForm(p => ({ ...p, title: e.target.value }))} />
                                </div>
                                <div className="form-group">
                                  <label className="form-label">Role / Subtitle</label>
                                  <input type="text" className="form-input" placeholder="e.g. Lead Technologist" value={gridForm.subtitle} onChange={e => setGridForm(p => ({ ...p, subtitle: e.target.value }))} />
                                </div>
                              </div>
                              <div className="form-group" style={{ marginTop: '0.8rem' }}>
                                <label className="form-label">Bio Description</label>
                                <textarea className="form-textarea" style={{ minHeight: '60px' }} placeholder="Short bio details..." value={gridForm.description} onChange={e => setGridForm(p => ({ ...p, description: e.target.value }))} />
                              </div>
                              <div className="form-group" style={{ marginTop: '0.8rem' }}>
                                <label className="form-label">Photo Upload / Link</label>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                  <input type="text" className="form-input" placeholder="https://..." value={gridForm.url} onChange={e => setGridForm(p => ({ ...p, url: e.target.value }))} />
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    style={{ display: 'none' }} 
                                    id={`grid-photo-${sec.section_key}`} 
                                    onChange={e => handleFileUpload(e, (url) => setGridForm(p => ({ ...p, url })))} 
                                  />
                                  <label htmlFor={`grid-photo-${sec.section_key}`} className="filter-btn active" style={{ whiteSpace: 'nowrap', cursor: 'pointer', margin: 0 }}>
                                    {uploading ? 'Uploading...' : 'Upload'}
                                  </label>
                                </div>
                              </div>
                              <button type="button" onClick={() => addGridItem(idx)} className="filter-btn active" style={{ marginTop: '1rem' }}>
                                Add Member to List
                              </button>
                            </div>
                          </div>
                        )}

                        <button type="submit" className="submit-btn" style={{ marginTop: '1.5rem', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
                          Confirm Block Changes
                        </button>
                      </form>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', fontWeight: 700 }}>
                {editingWork ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
              </h3>
              <form onSubmit={handleSaveWork} className="contact-form" style={{ marginBottom: '3rem', background: 'var(--bg3)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Category Code</label>
                    <select className="form-select" value={workForm.cat} onChange={e => setWorkForm(p => ({ ...p, cat: e.target.value }))}>
                      <option value="drama">drama</option>
                      <option value="ugc">ugc</option>
                      <option value="ads">ads</option>
                      <option value="sustainability">sustainability</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Size Layout</label>
                    <select className="form-select" value={workForm.size} onChange={e => setWorkForm(p => ({ ...p, size: e.target.value }))}>
                      <option value="large">Large (Full Row)</option>
                      <option value="medium">Medium</option>
                      <option value="half">Half</option>
                      <option value="third">Third</option>
                    </select>
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Image Upload / URL</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <input type="text" className="form-input" placeholder="https://images.unsplash.com/..." required value={workForm.img} onChange={e => setWorkForm(p => ({ ...p, img: e.target.value }))} />
                      <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        id="work-img-upload" 
                        onChange={e => handleFileUpload(e, (url) => setWorkForm(p => ({ ...p, img: url })))} 
                      />
                      <label htmlFor="work-img-upload" className="filter-btn active" style={{ whiteSpace: 'nowrap', cursor: 'pointer', margin: 0 }}>
                        {uploading ? 'Uploading...' : 'Upload'}
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Image Alt Text</label>
                    <input type="text" className="form-input" placeholder="AI Character illustration" required value={workForm.alt} onChange={e => setWorkForm(p => ({ ...p, alt: e.target.value }))} />
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Display Badge Label</label>
                    <input type="text" className="form-input" placeholder="Case Study" required value={workForm.label} onChange={e => setWorkForm(p => ({ ...p, label: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sub-Category Info</label>
                    <input type="text" className="form-input" placeholder="Drama Production" required value={workForm.work_cat} onChange={e => setWorkForm(p => ({ ...p, work_cat: e.target.value }))} />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label className="form-label">Case Study Title</label>
                  <input type="text" className="form-input" placeholder="Brand Character Animation Campaign" required value={workForm.title} onChange={e => setWorkForm(p => ({ ...p, title: e.target.value }))} />
                </div>

                <div className="form-row" style={{ marginTop: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Badges (Comma separated)</label>
                    <input type="text" className="form-input" placeholder="3-part series, YouTube, Meta" required value={workForm.badges} onChange={e => setWorkForm(p => ({ ...p, badges: e.target.value }))} />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem', paddingTop: '2.5rem' }}>
                    <input type="checkbox" id="featured" checked={workForm.featured} onChange={e => setWorkForm(p => ({ ...p, featured: e.target.checked }))} />
                    <label htmlFor="featured" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>Featured Case Study</label>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="submit-btn">
                    {editingWork ? 'Update Portfolio Item' : 'Add Portfolio Item'}
                  </button>
                  {editingWork && (
                    <button type="button" className="filter-btn" onClick={() => {
                      setEditingWork(null)
                      setWorkForm({ cat: 'drama', size: 'third', img: '', alt: '', label: '', featured: false, work_cat: '', title: '', badges: '' })
                    }}>
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>Active Portfolio Entries (Sortable)</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {workItems.map((item, idx) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg3)', padding: '1rem 1.5rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <div>
                      <strong style={{ fontSize: '0.95rem' }}>{item.title}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.2rem' }}>
                        {item.work_cat} · Layout: {item.size}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <button 
                        onClick={() => moveWork(idx, -1)} 
                        disabled={idx === 0}
                        style={{ background: 'transparent', border: '1px solid var(--border)', color: idx === 0 ? 'var(--muted)' : 'var(--text)', padding: '0.3rem 0.5rem', borderRadius: '4px', cursor: idx === 0 ? 'not-allowed' : 'pointer' }}
                      >
                        ▲
                      </button>
                      <button 
                        onClick={() => moveWork(idx, 1)} 
                        disabled={idx === workItems.length - 1}
                        style={{ background: 'transparent', border: '1px solid var(--border)', color: idx === workItems.length - 1 ? 'var(--muted)' : 'var(--text)', padding: '0.3rem 0.5rem', borderRadius: '4px', cursor: idx === workItems.length - 1 ? 'not-allowed' : 'pointer' }}
                      >
                        ▼
                      </button>
                      <button onClick={() => startEditWork(item)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer', marginLeft: '0.5rem' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteWork(item.id)} style={{ background: 'transparent', border: '1px solid var(--accent2)', color: 'var(--accent2)', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', fontWeight: 700 }}>
                {editingCourse ? 'Edit Course' : 'Add Academy Course'}
              </h3>
              <form onSubmit={handleSaveCourse} className="contact-form" style={{ marginBottom: '3rem', background: 'var(--bg3)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Course Title</label>
                    <input type="text" className="form-input" placeholder="Generative AI Animation Mastery" required value={courseForm.title} onChange={e => setCourseForm(p => ({ ...p, title: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Level</label>
                    <select className="form-select" value={courseForm.level} onChange={e => setCourseForm(p => ({ ...p, level: e.target.value }))}>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label className="form-label">Short Description</label>
                  <textarea className="form-textarea" placeholder="Timing, spacing, prompting..." required value={courseForm.description} onChange={e => setCourseForm(p => ({ ...p, description: e.target.value }))} />
                </div>

                <div className="form-row" style={{ marginTop: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Duration (e.g. 6 weeks)</label>
                    <input type="text" className="form-input" required value={courseForm.duration} onChange={e => setCourseForm(p => ({ ...p, duration: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Format / Price (e.g. Hybrid / In-person)</label>
                    <input type="text" className="form-input" required value={courseForm.price} onChange={e => setCourseForm(p => ({ ...p, price: e.target.value }))} />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label className="form-label">Modules (Comma separated)</label>
                  <input type="text" className="form-input" placeholder="Storyboarding, Prompts, Character design" required value={courseForm.modules} onChange={e => setCourseForm(p => ({ ...p, modules: e.target.value }))} />
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="submit-btn">
                    {editingCourse ? 'Update Course' : 'Add Course'}
                  </button>
                  {editingCourse && (
                    <button type="button" className="filter-btn" onClick={() => {
                      setEditingCourse(null)
                      setCourseForm({ title: '', description: '', level: 'beginner', modules: '', duration: '', price: '', cta_link: '/contact' })
                    }}>
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>Active Courses (Sortable)</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {courses.map((course, idx) => (
                  <div key={course.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg3)', padding: '1rem 1.5rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <div>
                      <strong style={{ fontSize: '0.95rem' }}>{course.title}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.2rem' }}>
                        {course.duration} · Level: {course.level}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <button 
                        onClick={() => moveCourse(idx, -1)} 
                        disabled={idx === 0}
                        style={{ background: 'transparent', border: '1px solid var(--border)', color: idx === 0 ? 'var(--muted)' : 'var(--text)', padding: '0.3rem 0.5rem', borderRadius: '4px', cursor: idx === 0 ? 'not-allowed' : 'pointer' }}
                      >
                        ▲
                      </button>
                      <button 
                        onClick={() => moveCourse(idx, 1)} 
                        disabled={idx === courses.length - 1}
                        style={{ background: 'transparent', border: '1px solid var(--border)', color: idx === courses.length - 1 ? 'var(--muted)' : 'var(--text)', padding: '0.3rem 0.5rem', borderRadius: '4px', cursor: idx === courses.length - 1 ? 'not-allowed' : 'pointer' }}
                      >
                        ▼
                      </button>
                      <button onClick={() => startEditCourse(course)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer', marginLeft: '0.5rem' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteCourse(course.id)} style={{ background: 'transparent', border: '1px solid var(--accent2)', color: 'var(--accent2)', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
        <FooterMinimal />
      </div>
    </div>
  )
}
