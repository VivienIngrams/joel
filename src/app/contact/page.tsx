import ContactForm from '../components/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen mt-20 xl:mt-0 bg-white text-gray-500 ">
      <div className="xl:min-h-screen flex flex-col items-center justify-center mx-6 xl:w-1/3 xl:mx-auto">
        <h1 className="text-2xl xl:text-3xl  w-full text-left font-cinzel py-4">
          Contact
        </h1>
        <ContactForm />
      </div>
    </div>
  )
}
