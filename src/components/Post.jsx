import {useParams, Navigate, useNavigate, Routes, Route} from 'react-router-dom'

function Post() {
  const params = useParams()
  const navigate = useNavigate()

  // redirect to another page by navigate() 
  const onClick = () => {
    console.log('redirect to another page')
    navigate('/about')
  }

  // use <Navigate> tag to redirect to another page
  // let status = 404
  // if (status === 404) {
  //   return (
  //     <Navigate to='/about' />
  //   )
  // }

  return (
    <div>
      <h1>Post</h1>
      <button onClick={onClick}>Click</button>
      {/* only display for nested route path */}
      <Routes>
        <Route path='/show' element={<h1>Nested content</h1>} />
      </Routes>
    </div>
  )

  // return (
  //   <div>
  //     <h1>Post {params.id}</h1>
  //     <h3>Name: {params.name}</h3>
  //   </div>
  // )
}

export default Post