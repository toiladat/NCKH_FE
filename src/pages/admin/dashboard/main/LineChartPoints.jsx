import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { getNeedHelpPointsByMonth, getRescueHubPointByMonth, getUserByMonth } from '~/actions/admin'

const months = 5
const today = new Date()
const tempData = []
for ( let i = 0; i< months; i++) {
  const date = new Date(today.getFullYear(), today.getMonth() - ( months - (i+ 1)))
  tempData.push({
    date,
    name: moment(date).format('MMM YYYY'),
    needHelpPoints:0,
    rescueHubPoints: 0,
    users: 0
  })
}
const LineChartPoints = () => {

  const [opacity, setOpacity] = React.useState({
    uv: 1,
    pv: 1
  })

  const handleMouseEnter = (o) => {
    const { dataKey } = o

    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }))
  }

  const handleMouseLeave = (o) => {
    const { dataKey } = o

    setOpacity((op) => ({ ...op, [dataKey]: 1 }))
  }
  const [data, setData] = useState([])
  const { admin } = useSelector(state => state.adminReducer)
  const dispatch= useDispatch()

  const [users, setUsers]= useState([])
  const [rescueHubPoints, setRescueHubPoints]= useState([])
  const [needHelpPoints, setNeedHelpPoints]= useState([])

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getUserByMonth(admin, dispatch)
      const needHelpData = await getNeedHelpPointsByMonth(admin, dispatch)
      const rescueHubData = await getRescueHubPointByMonth(admin, dispatch)

      setUsers(usersData)
      setNeedHelpPoints(needHelpData)
      setRescueHubPoints(rescueHubData)
    }

    fetchData()
  }, [])

  useEffect( () => {
    users?.forEach(user => {
      for ( let i = 0 ; i < months ; i++ ) {
        if ( moment(tempData[i].date).isSame(user?.createdAt, 'month')) return tempData[i].users++
      }
    })
    needHelpPoints?.forEach(Point => {
      for ( let i = 0 ; i < months ; i++ ) {
        if ( moment(tempData[i].date).isSame(Point?.createdAt, 'month')) return tempData[i].needHelpPoints++
      }
    })
    rescueHubPoints?.forEach(Point => {
      for ( let i = 0 ; i < months ; i++ ) {
        if ( moment(tempData[i].date).isSame(Point?.createdAt, 'month')) return tempData[i].rescueHubPoints++
      }
    })
    setData([...tempData])
  }, [users, needHelpPoints, rescueHubPoints])
  return (
    <div style={{ width: '100%', minWidth:250 }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          <Line type="monotone" dataKey="users" strokeOpacity={opacity.pv} stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="rescueHubPoints" strokeOpacity={opacity.uv} stroke="#82ca9d" />
          <Line type="monotone" dataKey="needHelpPoints" strokeOpacity={opacity.pv} stroke="#888a34" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}


export default LineChartPoints
