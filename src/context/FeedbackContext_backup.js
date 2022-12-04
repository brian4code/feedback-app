// import { v4 as uuidv4 } from 'uuid'
import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  //   {
  //     id: 1,
  //     text: 'This item is feedback item 1',
  //     rating: 10
  //   },
  //   {
  //     id: 2,
  //     text: 'This item is feedback item 2',
  //     rating: 9
  //   },
  //   {
  //     id: 3,
  //     text: 'This item is feedback item 3',
  //     rating: 7
  //   }
  // 
  // a temp state to store the current editing item 
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: { rating: 10 },
    edit: false
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // fetch feedback from json-server backend
  const fetchFeedback = async () => {
    // send a GET request to server 
    const response = await fetch(
      'feedback?_sort=id&_order=desc'
    )
    const data = await response.json()

    setFeedback(data)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }

  // Add feedback
  const addFeedback = async (newFeedback) => {
    // send a POST request to server to add feedback
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })

    // returning an object in response from POST request 
    const data = await response.json()

    // newFeedback.id = uuidv4()    
    // dont need generate ID, because json-server will auto add ID
    setFeedback([data, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      // send a DELETE request to server 
      await fetch(`/feedback/${id}`, { method: 'DELETE' })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update feedback with editFeedback item  
  const updateFeedback = async (id, updItem) => {
    // send a PUT request to server to update feedback
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updItem)
    })

    const data = await response.json()

    setFeedback(
      feedback.map((item) => (
        item.id === id ? { ...item, ...data } : item))
    )
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  return <FeedbackContext.Provider value={{
    feedback,
    feedbackEdit,
    isLoading,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback,
    setFeedbackEdit,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext

