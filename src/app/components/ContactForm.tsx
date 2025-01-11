'use client'

const ContactForm: React.FC = () => {
  async function handleSubmit(event: any) {
    event.preventDefault()

    const formData = new FormData(event.target)
    console.log(formData)
    try {
      const response = await fetch('/api', {
        method: 'post',

        body: formData,
      })

      if (!response.ok) {
        throw new Error(`response status: ${response.status}`)
      }
      const responseData = await response.json()
      console.log(responseData)
      alert('Message successfully sent')
    } catch (err) {
      console.error(err)
      alert('Error, please try resubmitting the form')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="font-cinzel w-full">
     
        <div className="flex flex-col">
          <label htmlFor="name" className="uppercase text-sm py-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="off"
            required
            minLength={3}
            maxLength={150}
            className="font-arsenal border-2  rounded border-stone-400 p-1"
            type="text"
          />
        </div>
     
      <div className="flex flex-col py-1">
        <label htmlFor="email" className="uppercase text-sm py-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          autoComplete="off"
          required
          minLength={8}
          maxLength={150}
          className="font-arsenal border-2  rounded border-stone-400 p-1"
          type="email"
        />
      </div>
      <div className="flex flex-col py-1">
        <label htmlFor="subject" className="uppercase text-sm py-1">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          autoComplete="off"
          className="font-arsenal border-2  rounded border-stone-400 p-1"
          type="text"
        />
      </div>
      <div className="flex flex-col py-1">
        <label htmlFor="message" className="uppercase text-sm py-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          autoComplete="off"
          required
          minLength={20}
          maxLength={600}
          className="font-arsenal border-2 rounded border-stone-400 p-1"
          rows={5}
        />
      </div>
      <button
        type="submit"
        className=" mt-4 hover:text-black  hover:scale-105 ease-in duration-600 border-2 rounded-lg shadow-md p-2 bg-gray-100"
        >
        Send Message
      </button>
    </form>
  )
}

export default ContactForm
