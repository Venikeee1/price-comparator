import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Container } from '@/components/Container'
import { useState } from 'react'
import { ProductList } from '@/components/ProductList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchItems = () => {
    setIsLoading(true)
    fetch('/api/search/' + searchQuery.trim())
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchItems()
  }

  return (
    <main>
      <Container>
        <div className="my-4">Введите названия товара</div>
        <form onSubmit={handleSubmit}>
          <input type="search" placeholder="Введи название товара" className="py-1 px-3 text-zinc-950 rounded-sm w-52" value={searchQuery} onChange={({ target }) => {
            setSearchQuery(target.value)
          }} />
          <button type="submit" className="px-4 py-2 ml-4 bg-slate-500 cursor-pointer rounded-sm">Search</button>
        </form>
        <ProductList loading={isLoading} products={products} />
      </Container>
    </main>
  )
}
