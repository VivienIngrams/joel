import ContactForm from '../components/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen mt-20 md:mt-0 bg-white text-gray-500 ">
      <div className="md:min-h-screen flex flex-col items-center justify-center mx-6 md:w-1/3 md:mx-auto">
        <h1 className="text-2xl md:text-3xl  w-full text-left font-cinzel py-4">
          Contact
        </h1>
        <ContactForm />
      </div>
    </div>
  )
}
