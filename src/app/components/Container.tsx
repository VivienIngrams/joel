import Link from 'next/link'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="">
        
      </header>
      <main>{children}</main>
     <footer>
      </footer>
    </div>
  )
}
