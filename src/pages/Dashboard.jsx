import { useEffect, useState } from 'react'
import useGlobal from '../../hooks/useGlobal'
import useToken from '../../hooks/useToken'
import Table from '../components/Table'
import TabFilterExpired from '../components/layouts/table/TabFilterExpired'
import ModuleControl from '../components/module/ModuleControl'
import { fnGetComments, fnGetIssues } from '../utils/getFunctions'
import { validateExpired } from '../utils/validateExpired'

const Dashboard = () => {
  const { token } = useToken()
  const { filter, newIssue, expired, searchingRef, search } =
    useGlobal()

  const [issues, setIssues] = useState([])
  const [sortIssues, setSortIssues] = useState([])

  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [issueSelected, setIssueSelected] = useState({})
  const [showComments, setShowComments] = useState(false)

  const getIssues = async () => {
    const valueSearching =
      searchingRef.current.value === '' ? 'null' : searchingRef.current.value
    const response = await fnGetIssues(token, valueSearching, null)
    setIssues(response)
    setSortIssues(response)
  }

  useEffect(() => {
    const loadingInfo = async () => {
      await getIssues()
      setLoading(false)
    }

    loadingInfo()
  }, [search])

  // Order with de navbar menu
  useEffect(() => {
    if (Object.keys(newIssue).length > 0) {
      setSortIssues([newIssue, ...issues])
      return
    }
    if (filter === 'all') {
      setSortIssues(issues)
      return
    }
    if (filter !== 'all') {
      const sorted = issues.filter((i) => i.status === filter)
      setSortIssues(sorted)
    }
  }, [filter, newIssue])

  // Order with the table menu
  useEffect(() => {
    if (expired === null && filter !== 'all') {
      const sorted = issues.filter((i) => i.status === filter)
      setSortIssues(sorted)
      return
    }
    if (expired !== null && filter !== 'all') {
      const sorted = issues.filter(
        (i) =>
          validateExpired({ days: i.daysConfig, dateCreated: i.created_At }) ===
          expired && i.status === filter
      )
      setSortIssues(sorted)
      return
    }
    if (expired !== null) {
      const sorted = issues.filter(
        (i) =>
          validateExpired({ days: i.daysConfig, dateCreated: i.created_At }) ===
          expired
      )
      setSortIssues(sorted)
      return
    }
    if (expired === null) {
      setSortIssues(issues)
    }
  }, [expired])

  const handleComments = async (issue) => {
    issue._id !== 0 && issue._id !== undefined
      ? setComments(await fnGetComments(token, issue._id))
      : setComments([])
    setShowComments(!showComments)
    setIssueSelected(issue)
  }

  const newComment = (comment) => {
    setComments([comment, ...comments])
  }

  return (
    <main className='w-full grid'>
      <section className='mt-10'>
        <ModuleControl data={sortIssues} />
      </section>

      <section className='w-full mt-10 mx-auto'>
        <TabFilterExpired />
        <Table
          loading={loading}
          issues={sortIssues}
          comments={comments}
          // category={category}
          handleComments={handleComments}
          showComments={showComments}
          issueSelected={issueSelected}
          newComment={newComment}
        />
      </section>
    </main>
  )
}

export default Dashboard
