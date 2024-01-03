import React, { useEffect, useState, useRef } from 'react'

const API_URL = 'https://cloudinary-demo.onrender.com/images'

export const App = () => {
  const fileInput = useRef()
  const [name, setName] = useState('')
  const [images, setImages] = useState('')
  const [reload, setReload] = useState(false)

  const fetchImages = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(json => {
        setImages(json)
        console.log(json)
      })
  }

  useEffect(() => {
    fetchImages()
  }, [reload])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', fileInput.current.files[0])
    formData.append('name', name)

    fetch(API_URL, { method: 'POST', body: formData })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setReload(!reload)
      })
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <legend>Upload image</legend>
          <label>
            Image
            <input type="file" ref={fileInput} />
          </label>

          <label>
            Name
            <input type="text" maxLength="20" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <button type="submit">
            Submit
          </button>
        </fieldset>
      </form>
      <section>
        {images.length > 0 && (
          images.map((image) => (
            <div className="card" key={image.imageUrl}>
              <div>
                <img src={image.imageUrl} />
              </div>
              <p>{image.name}</p>
            </div>
          ))
        )}

      </section>
    </>
  )
}
