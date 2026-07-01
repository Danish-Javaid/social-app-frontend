'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export default function FeedPage() {
  const router = useRouter()
  const { user, isAuthenticated, fetchMe, logout, isLoading } = useAuthStore()
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    fetchMe().then(() => {
      const auth = useAuthStore.getState().isAuthenticated
      if (!auth) router.replace('/login')
    })
  }, [])

  const handleLogout = async () => {
    await logout()
    router.replace('/login')
  }

  const switchTab = (tab: string) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading || !user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #5B52E7 0%, #4C43D4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 12px'
          }} />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  const TAB_BASE = {
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#64748b',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    position: 'relative' as const
  }

  const TAB_ACTIVE = {
    ...TAB_BASE,
    background: '#EEF2FF',
    color: '#5B52E7'
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <div style={{ fontFamily: 'inherit', color: '#1a202c', minHeight: '100vh', paddingBottom: '48px' }}>

        {/* Navbar */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: '#5B52E7',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
              boxShadow: '0 4px 6px rgba(91, 82, 231, 0.2)'
            }}>F</div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>FOMO</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: '#f8fafc',
            padding: '4px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            {['home', 'explore', 'messages', 'notifications', 'communities', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                style={activeTab === tab ? TAB_ACTIVE : TAB_BASE}
                onMouseEnter={(e) => {
                  if (activeTab !== tab) {
                    (e.target as HTMLButtonElement).style.color = '#1a202c'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab) {
                    (e.target as HTMLButtonElement).style.color = '#64748b'
                  }
                }}
              >
                <i className={`fa-solid fa-${tab === 'home' ? 'house' : tab === 'explore' ? 'compass' : tab === 'messages' ? 'comment-dots' : tab === 'notifications' ? 'bell' : tab === 'communities' ? 'users' : 'user'}`}></i>
                <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                {(tab === 'messages' || tab === 'notifications') && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#06b6d4',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid white'
                  }}>{tab === 'messages' ? '4' : '3'}</span>
                )}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{
              background: '#5B52E7',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 4px 6px rgba(91, 82, 231, 0.1)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#4C43D4'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#5B52E7'
            }}>
              <i className="fa-solid fa-plus" style={{ fontSize: '12px' }}></i>
              <span>Create</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => switchTab('profile')}>
              <div style={{ position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt={`${user.username} Avatar`} style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid #e2e8f0'
                }} />
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '10px',
                  height: '10px',
                  background: '#10b981',
                  border: '2px solid white',
                  borderRadius: '50%'
                }}></span>
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>{user.username}</span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: '#ef4444',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#dc2626'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ef4444'
              }}
            >
              <i className="fa-solid fa-sign-out-alt" style={{ fontSize: '14px' }}></i>
              <span>Logout</span>
            </button>
          </div>
        </nav>

        <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', marginTop: '32px' }}>

          {/* HOME TAB */}
          {activeTab === 'home' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '32px' }}>
              <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Stories */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  overflowX: 'auto'
                }} className="no-scrollbar">
                  {[
                    { name: 'Your story', icon: true },
                    { name: 'Sofia', gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)' },
                    { name: 'Marcus', gradient: 'linear-gradient(135deg, #5B52E7 0%, #06b6d4 100%)' },
                    { name: 'Priya', gradient: 'linear-gradient(135deg, #a855f7 0%, #818cf8 100%)' },
                    { name: 'Jordan', gradient: '#e5e7eb' },
                    { name: 'Zara', gradient: 'linear-gradient(135deg, #7c3aed 0%, #60a5fa 100%)' },
                    { name: 'Kai', gradient: '#e5e7eb' }
                  ].map((person, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      flexShrink: 0,
                      cursor: 'pointer'
                    }}>
                      <div style={{
                        position: 'relative',
                        padding: '2px',
                        background: person.gradient
                      }}>
                        <img src={`https://images.unsplash.com/photo-${idx === 0 ? '1534528741775-53994a69daeb' : idx === 1 ? '1494790108377-be9c29b29330' : idx === 2 ? '1507003211169-0a1dd7228f2d' : idx === 3 ? '1517841905240-472988babdf9' : idx === 4 ? '1500648767791-00dcc994a43e' : idx === 5 ? '1524504388940-b1c1722653e1' : '1492562080023-ab3db95bfbce'}?auto=format&fit=crop&w=100&q=80`} style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid white'
                        }} />
                        {idx === 0 && (
                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: '20px',
                            height: '20px',
                            background: '#5B52E7',
                            color: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            border: '2px solid white',
                            fontWeight: 'bold'
                          }}>+</div>
                        )}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748b' }}>{person.name}</span>
                    </div>
                  ))}
                </div>

                {/* Create Post */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt={`${user.username} Avatar`} style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid #e2e8f0'
                    }} />
                    <input type="text" placeholder={`What's on your mind, ${user.username}?`} style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      color: '#374151',
                      fontSize: '16px',
                      outline: 'none'
                    }} />
                  </div>
                  <hr style={{ border: '1px solid #e2e8f0' }} />
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '4px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#9ca3af' }}>
                      {['image', 'camera', 'face-smile', 'hashtag', 'globe'].map((icon) => (
                        <button key={icon} style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '18px',
                          color: '#9ca3af',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#5B52E7'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
                          <i className={`fa-${icon.includes('-') ? 'solid' : 'regular'} fa-${icon}`}></i>
                        </button>
                      ))}
                    </div>
                    <button style={{
                      background: 'rgba(91, 82, 231, 0.5)',
                      color: 'white',
                      fontWeight: '500',
                      padding: '8px 24px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      cursor: 'not-allowed',
                      border: 'none'
                    }}>Post</button>
                  </div>
                </div>

                {/* Posts */}
                {[
                  {
                    author: 'Sofia Chen',
                    handle: '@sofiachen',
                    verified: true,
                    time: '2h ago',
                    text: 'Just shipped something huge at work today. Six months of late nights, weekends, and countless iterations — and it finally clicked. Reminder: great things take time, and that\'s okay. 🚀 #product #design',
                    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
                  },
                  {
                    author: 'Marcus Johnson',
                    handle: '@marcusjohn',
                    verified: true,
                    time: '4h ago',
                    text: 'Spent the weekend at Electric Forest and my soul is completely renewed. There\'s something about 60,000 people all vibrating on the same frequency that just... resets everything. 🌲 🎶',
                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
                    postImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80'
                  }
                ].map((post, idx) => (
                  <div key={idx} style={{
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '24px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ position: 'relative' }}>
                          <img src={post.image} style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }} />
                          <span style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: '10px',
                            height: '10px',
                            background: '#10b981',
                            border: '2px solid white',
                            borderRadius: '50%'
                          }}></span>
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#1a202c', cursor: 'pointer' }}>{post.author}</span>
                            {post.verified && <i className="fa-solid fa-circle-check" style={{ color: '#3b82f6', fontSize: '12px' }}></i>}
                          </div>
                          <span style={{ fontSize: '12px', color: '#9ca3af' }}>{post.handle} · {post.time}</span>
                        </div>
                      </div>
                      <button style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '18px',
                        color: '#9ca3af'
                      }}>
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                    </div>
                    <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '14px', marginBottom: '16px' }}>
                      {post.text}
                    </p>
                    {post.postImage && (
                      <img src={post.postImage} style={{
                        borderRadius: '12px',
                        maxHeight: '380px',
                        width: '100%',
                        objectFit: 'cover',
                        border: '1px solid #e2e8f0',
                        boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.05)'
                      }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '16px',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <i className="fa-solid fa-magnifying-glass" style={{ color: '#9ca3af' }}></i>
                  <input type="text" placeholder="Search FOMO..." style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    fontSize: '14px',
                    outline: 'none'
                  }} />
                </div>

                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1a202c', fontWeight: 'bold', fontSize: '16px' }}>
                    <i className="fa-solid fa-arrow-trend-up" style={{ color: '#5B52E7' }}></i>
                    <span>Trending now</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { tag: '#DesignSystems', hot: true, count: '24.2K' },
                      { tag: '#AIArt', hot: true, count: '18.7K' },
                      { tag: '#WebDev', hot: false, count: '12.4K' },
                      { tag: '#Minimalism', hot: false, count: '9.8K' },
                      { tag: '#OpenSource', hot: false, count: '7.2K' }
                    ].map((trend, idx) => (
                      <div key={idx} style={{ cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>{trend.tag}</span>
                          {trend.hot && <i className="fa-solid fa-fire" style={{ color: '#f59e0b', fontSize: '12px' }}></i>}
                        </div>
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>{trend.count} posts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EXPLORE TAB */}
          {activeTab === 'explore' && (
            <div style={{ maxWidth: '768px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px 16px'
                }}>
                  <i className="fa-solid fa-magnifying-glass" style={{ color: '#9ca3af', fontSize: '16px' }}></i>
                  <input type="text" placeholder="Search users, posts, topics..." style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    fontSize: '14px',
                    outline: 'none'
                  }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {['All', 'People', 'Posts', 'Tags'].map((filter) => (
                    <button key={filter} style={{
                      background: filter === 'All' ? '#5B52E7' : 'transparent',
                      color: filter === 'All' ? 'white' : '#64748b',
                      padding: '6px 16px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (filter !== 'All') (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9'
                    }}
                    onMouseLeave={(e) => {
                      if (filter !== 'All') (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                    }}>
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1a202c', fontWeight: 'bold', fontSize: '16px' }}>
                  <i className="fa-solid fa-arrow-trend-up" style={{ color: '#5B52E7' }}></i>
                  <span>Trending Topics</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {[
                    { tag: '#DesignSystems', hot: true, count: '24.2K', featured: true },
                    { tag: '#AIArt', hot: true, count: '18.7K', featured: true },
                    { tag: '#WebDev', hot: false, count: '12.4K', featured: false },
                    { tag: '#Minimalism', hot: false, count: '9.8K', featured: false },
                    { tag: '#OpenSource', hot: false, count: '7.2K', featured: false }
                  ].map((trend, idx) => (
                    <div key={idx} style={{
                      border: trend.featured ? '1px solid #cbd5e1' : '1px solid #e2e8f0',
                      borderRadius: '9999px',
                      padding: '8px 16px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: trend.featured ? '#5B52E7' : '#374151',
                      background: trend.featured ? '#EEF2FF' : '#f8fafc',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}>
                      <span>{trend.tag}</span>
                      {trend.hot && <i className="fa-solid fa-fire" style={{ color: '#f59e0b' }}></i>}
                      <span style={{ color: trend.featured ? '#5B52E7' : '#9ca3af', fontWeight: '400' }}>{trend.count} posts</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Creators */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1a202c', fontWeight: 'bold', fontSize: '16px' }}>
                  <i className="fa-regular fa-star" style={{ color: '#5B52E7' }}></i>
                  <span>Featured Creators</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {[
                    { name: 'Sofia Chen', handle: '@sofiachen', followers: '48.2K', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
                    { name: 'Marcus Johnson', handle: '@marcusjohn', followers: '92.1K', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
                    { name: 'Priya Sharma', handle: '@priyasharma', followers: '34.5K', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80' },
                    { name: 'Jordan Lee', handle: '@jordanlee', followers: '12.8K', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' }
                  ].map((creator, idx) => (
                    <div key={idx} style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={creator.image} style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }} />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#1a202c' }}>{creator.name}</span>
                            {idx < 3 && <i className="fa-solid fa-circle-check" style={{ color: '#3b82f6', fontSize: '10px' }}></i>}
                          </div>
                          <span style={{ fontSize: '12px', color: '#9ca3af' }}>{creator.handle} · {creator.followers} followers</span>
                        </div>
                      </div>
                      <button style={{
                        background: '#5B52E7',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '6px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#4C43D4'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#5B52E7'
                      }}>
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
              gap: 0,
              border: '1px solid #e2e8f0',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              minHeight: '580px'
            }}>
              {/* Messages List */}
              <div style={{ gridColumn: 'span 4', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  padding: '16px',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(91, 82, 231, 0.05)'
                }}>
                  <i className="fa-solid fa-magnifying-glass" style={{ color: '#9ca3af', fontSize: '12px' }}></i>
                  <input type="text" placeholder="Search messages..." style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    fontSize: '12px',
                    outline: 'none'
                  }} />
                </div>
                <div style={{ flex: 1, overflowY: 'auto', borderBottom: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}>
                  {[
                    { name: 'Sofia Chen', message: 'That looks absolutely ama...', time: '2m ago', unread: 3, online: true, active: true },
                    { name: 'Marcus Johnson', message: 'Can\'t wait to collaborate on so...', time: '1h ago', unread: 0, online: false },
                    { name: 'Priya Sharma', message: 'Photos from Kyoto are up ...', time: '3h ago', unread: 1, online: true },
                    { name: 'Jordan Lee', message: 'That Rust article you shared w...', time: 'Yesterday', unread: 0, online: true }
                  ].map((msg, idx) => (
                    <div key={idx} style={{
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      background: msg.active ? 'rgba(91, 82, 231, 0.1)' : 'transparent',
                      cursor: 'pointer',
                      borderLeft: msg.active ? '4px solid #5B52E7' : 'none',
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!msg.active) e.currentTarget.style.background = '#f8fafc'
                    }}
                    onMouseLeave={(e) => {
                      if (!msg.active) e.currentTarget.style.background = 'transparent'
                    }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img src={`https://images.unsplash.com/photo-${idx === 0 ? '1494790108377-be9c29b29330' : idx === 1 ? '1507003211169-0a1dd7228f2d' : idx === 2 ? '1517841905240-472988babdf9' : '1500648767791-00dcc994a43e'}?auto=format&fit=crop&w=100&q=80`} style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }} />
                        {msg.online && (
                          <span style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: '10px',
                            height: '10px',
                            background: msg.online ? '#10b981' : '#cbd5e1',
                            border: '2px solid white',
                            borderRadius: '50%'
                          }}></span>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#1a202c' }}>{msg.name}</span>
                          <span style={{ fontSize: '10px', color: '#9ca3af' }}>{msg.time}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: msg.unread ? '500' : '400' }}>{msg.message}</p>
                      </div>
                      {msg.unread > 0 && (
                        <span style={{
                          background: '#06b6d4',
                          color: 'white',
                          fontSize: '10px',
                          fontWeight: 'bold',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>{msg.unread}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat */}
              <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', background: 'rgba(15, 23, 42, 0.02)' }}>
                <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '14px' }}>
                  {[
                    { own: false, text: 'Hey! Did you see the new design system I posted?', time: '10:42 AM' },
                    { own: true, text: 'Yes! It\'s gorgeous. I love the color palette you went with', time: '10:44 AM' },
                    { own: false, text: 'Thanks! Took forever to get the indigo just right 🥰', time: '10:45 AM' },
                    { own: true, text: 'I can imagine. The contrast ratios must have been a nightmare', time: '10:46 AM' },
                    { own: false, text: 'That looks absolutely amazing! ✨', time: '10:48 AM' }
                  ].map((msg, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      flexDirection: msg.own ? 'row-reverse' : 'row',
                      maxWidth: msg.own ? '75%' : '75%',
                      marginLeft: msg.own ? 'auto' : 0
                    }}>
                      {!msg.own && (
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          marginTop: '4px'
                        }} />
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: msg.own ? 'right' : 'left' }}>
                        <div style={{
                          background: msg.own ? '#5B52E7' : 'white',
                          color: msg.own ? 'white' : '#1a202c',
                          padding: '10px 16px',
                          borderRadius: '16px',
                          borderTopLeftRadius: msg.own ? '16px' : '0px',
                          borderTopRightRadius: msg.own ? '0px' : '16px',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                          border: msg.own ? 'none' : '1px solid #e2e8f0'
                        }}>
                          {msg.text}
                        </div>
                        <div style={{ fontSize: '10px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: msg.own ? 'flex-end' : 'flex-start' }}>
                          <span>{msg.time}</span>
                          {msg.own && <i className="fa-solid fa-check-double" style={{ color: '#5B52E7' }}></i>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div style={{
                  padding: '16px',
                  background: 'white',
                  borderTop: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    color: '#9ca3af'
                  }}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                  <div style={{
                    flex: 1,
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <input type="text" placeholder="Message..." style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      fontSize: '12px',
                      outline: 'none'
                    }} />
                    <button style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      marginLeft: '8px',
                      color: '#5B52E7',
                      fontSize: '14px'
                    }}>
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: '#9ca3af', textTransform: 'uppercase' }}>Today</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid #f1f5f9' }}>
                {[
                  { user: 'Sofia Chen', icon: 'heart', iconBg: '#f43f5e', action: 'liked your recent post', detail: '"Just shipped something huge..." · 2m ago', unread: true },
                  { user: 'Zara Williams', icon: 'user-plus', iconBg: '#5B52E7', action: 'started following you', detail: '15m ago', button: 'Follow', unread: true },
                  { user: 'Priya Sharma', icon: 'comment', iconBg: '#06b6d4', action: 'commented on your post', detail: '"Love this perspective! 🙌"', unread: true },
                  { user: 'Kai Nakamura', icon: 'at', iconBg: '#a855f7', action: 'mentioned you in a comment', detail: '"@alexrivera nailed it!"', unread: false },
                  { user: 'Marcus Johnson', icon: 'heart', iconBg: '#f43f5e', action: 'and 47 others liked your post', detail: '3h ago', unread: false }
                ].map((notif, idx) => (
                  <div key={idx} style={{
                    padding: '16px 0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    borderBottom: idx < 4 ? '1px solid #f1f5f9' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img src={`${['https://images.unsplash.com/photo-1494790108377-be9c29b29330', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', 'https://images.unsplash.com/photo-1517841905240-472988babdf9', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'][idx]}?auto=format&fit=crop&w=100&q=80`} alt={`${notif.user} profile`} style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }} />   
                        <div style={{
                          position: 'absolute',
                          bottom: '-4px',
                          right: '-4px',
                          background: notif.iconBg,
                          color: 'white',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '8px',
                          border: '1px solid white',
                          fontWeight: 'bold'
                        }}>
                          <i className={`fa-solid fa-${notif.icon}`}></i>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', color: '#1f2937', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 'bold', cursor: 'pointer' }}>{notif.user}</span> {notif.action}
                        </div>
                        {notif.detail && (
                          <div style={{
                            fontSize: '12px',
                            background: notif.icon === 'comment' || notif.icon === 'at' ? '#f8fafc' : 'transparent',
                            border: notif.icon === 'comment' || notif.icon === 'at' ? '1px solid #e2e8f0' : 'none',
                            borderRadius: '6px',
                            padding: notif.icon === 'comment' || notif.icon === 'at' ? '8px 10px' : 0,
                            color: notif.icon === 'comment' || notif.icon === 'at' ? '#374151' : '#9ca3af',
                            fontWeight: notif.icon === 'comment' || notif.icon === 'at' ? '500' : '400',
                            marginTop: '4px'
                          }}>
                            {notif.detail}
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                      {notif.button && (
                        <button style={{
                          background: '#5B52E7',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '600',
                          padding: '6px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}>
                          {notif.button}
                        </button>
                      )}
                      {notif.unread && (
                        <div style={{
                          width: '10px',
                          height: '10px',
                          background: '#06b6d4',
                          borderRadius: '50%',
                          flexShrink: 0
                        }}></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  height: '192px',
                  background: '#d1d5db',
                  position: 'relative'
                }}>
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }} />
                  <button style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}>
                    <i className="fa-regular fa-image"></i>
                    <span>Edit cover</span>
                  </button>
                </div>
                <div style={{ padding: '24px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-64px', left: '24px' }}>
                    <div style={{ position: 'relative' }}>
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80" style={{
                        width: '112px',
                        height: '112px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '4px solid white',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                      }} />
                      <span style={{
                        position: 'absolute',
                        bottom: '4px',
                        right: '8px',
                        width: '16px',
                        height: '16px',
                        background: '#10b981',
                        border: '2px solid white',
                        borderRadius: '50%'
                      }}></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', marginBottom: '24px' }}>
                    <button style={{
                      border: '1px solid #e2e8f0',
                      color: '#374151',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      background: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                      <i className="fa-solid fa-pen" style={{ fontSize: '10px' }}></i>
                      <span>Edit profile</span>
                    </button>
                    <button onClick={handleLogout} style={{
                      border: '1px solid #e2e8f0',
                      color: '#374151',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      background: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                      <i className="fa-solid fa-gear"></i>
                    </button>
                  </div>

                  <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>{user.username}</h2>
                        <i className="fa-solid fa-circle-check" style={{ color: '#3b82f6', fontSize: '14px' }}></i>
                      </div>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>@{user.username}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#374151', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Designer & creator</span> <span>·</span> <span>Building beautiful things</span> <span>✦</span> <span style={{ color: '#9ca3af' }}><i className="fa-solid fa-location-dot" style={{ fontSize: '10px', marginRight: '4px' }}></i>NYC</span>
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '24px',
                      paddingTop: '8px',
                      borderTop: '1px solid #f1f5f9'
                    }}>
                      <div style={{ fontSize: '12px', color: '#64748b' }}><strong style={{ color: '#1a202c', fontWeight: 'bold', fontSize: '14px' }}>247</strong> Posts</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}><strong style={{ color: '#1a202c', fontWeight: 'bold', fontSize: '14px' }}>12.4K</strong> Followers</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}><strong style={{ color: '#1a202c', fontWeight: 'bold', fontSize: '14px' }}>891</strong> Following</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '336px',
                margin: '0 auto'
              }}>
                {['Posts', 'Media', 'Saved'].map((tab) => (
                  <button key={tab} style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '8px',
                    fontSize: '12px',
                    fontWeight: tab === 'Posts' ? 'bold' : '500',
                    color: tab === 'Posts' ? '#5B52E7' : '#9ca3af',
                    background: tab === 'Posts' ? '#EEF2FF' : 'transparent',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (tab !== 'Posts') e.currentTarget.style.color = '#1a202c'
                  }}
                  onMouseLeave={(e) => {
                    if (tab !== 'Posts') e.currentTarget.style.color = '#9ca3af'
                  }}>
                    <i className={`fa-${tab === 'Posts' ? 'solid fa-table-cells' : 'regular fa-' + (tab === 'Media' ? 'image' : 'bookmark')}`} style={{ fontSize: '10px' }}></i>
                    <span>{tab}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* COMMUNITIES TAB */}
          {activeTab === 'communities' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{
                  background: 'rgba(107, 114, 128, 0.1)',
                  padding: '4px',
                  border: '1px solid rgba(107, 114, 128, 0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  width: '100%',
                  maxWidth: '544px'
                }}>
                  {['Discover', 'My Communities'].map((tab) => (
                    <button key={tab} style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: tab === 'Discover' ? 'white' : '#64748b',
                      background: tab === 'Discover' ? '#5B52E7' : 'transparent',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (tab !== 'Discover') e.currentTarget.style.color = '#1a202c'
                    }}
                    onMouseLeave={(e) => {
                      if (tab !== 'Discover') e.currentTarget.style.color = '#64748b'
                    }}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                {[
                  { name: 'Design Nerds', category: 'Design', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80', desc: 'A community for designers who obsess over the details. Typography, systems, craft — all welcome.', members: '12.4K', posts: '3.4K', joined: true },
                  { name: 'Tech Builders', category: 'Technology', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80', desc: 'For developers, founders, and makers building the next generation of software and tools.', members: '89.2K', posts: '18.9K', joined: false },
                  { name: 'Wanderlust Collective', category: 'Travel', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80', desc: 'Sharing hidden gems, itineraries, and stories from paths less traveled across the globe.', members: '43.1K', posts: '8.2K', joined: false },
                  { name: 'Sound & Rhythm', category: 'Music', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80', desc: 'From lo-fi bedroom beats to underground techno. Reviewing tracks, equipment, and festivals live.', members: '26.7K', posts: '5.1K', joined: false }
                ].map((community, idx) => (
                  <div key={idx} style={{
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ position: 'relative', height: '144px', background: '#d1d5db' }}>
                        <img src={community.image} style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }} />
                        <span style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'rgba(255, 255, 255, 0.9)',
                          color: '#1a202c',
                          fontSize: '10px',
                          fontWeight: 'bold',
                          padding: '6px 10px',
                          borderRadius: '9999px',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>{community.category}</span>
                      </div>
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <h3 style={{ fontWeight: 'bold', fontSize: '16px', color: '#1a202c', cursor: 'pointer' }}>{community.name}</h3>
                        <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>{community.desc}</p>
                      </div>
                    </div>
                    <div style={{
                      padding: '20px',
                      paddingTop: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#9ca3af' }}>
                        <span><i className="fa-solid fa-users" style={{ marginRight: '4px' }}></i>{community.members} members</span>
                        <span><i className="fa-solid fa-file-pen" style={{ marginRight: '4px' }}></i>{community.posts} posts</span>
                      </div>
                      <button style={{
                        border: community.joined ? '1px solid #e2e8f0' : 'none',
                        color: community.joined ? '#64748b' : 'white',
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: community.joined ? '6px 16px' : '6px 20px',
                        borderRadius: '8px',
                        background: community.joined ? 'white' : '#5B52E7',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (community.joined) {
                          e.currentTarget.style.background = '#f8fafc'
                        } else {
                          e.currentTarget.style.background = '#4C43D4'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (community.joined) {
                          e.currentTarget.style.background = 'white'
                        } else {
                          e.currentTarget.style.background = '#5B52E7'
                        }
                      }}>
                        <span>{community.joined ? 'Joined' : 'Join'}</span>
                        {community.joined && <i className="fa-solid fa-check" style={{ fontSize: '10px' }}></i>}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  )
}