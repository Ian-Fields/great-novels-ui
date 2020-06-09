import React, { useEffect, useState } from 'react'
import Novel from './Novel'
import Search from './Search'
import { filterNovels, retrieveNovels } from '../utils/novels'

export default () => {
  const [novelList, setNovelList] = useState([])
  const [filteredNovelList, setFilteredNovelList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function pullData() {
      const novels = await retrieveNovels()
      setNovelList(novels)
      setFilteredNovelList(novels)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterNovels(novelList, searchTerm)

    setFilteredNovelList(filtered)
  }, [searchTerm])

  return (
    <div className="page">
      <div className="title">Great Novels</div>
      <Search term={searchTerm} setter={setSearchTerm} />
      {
        filteredNovelList.map(novel => (
          <Novel
            key={novel.id}
            id={novel.id}
            name={`${novel.author.nameFirst} ${novel.author.nameLast}`}
            title={novel.title}
          />
        ))
      }
    </div>
  )
}
