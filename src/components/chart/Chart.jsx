import "./chart.scss"
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
const data=[
  {
    name:'page A',
    uv:4000,
    pv:2400,
    amt:2400
  },
  {
    name:'page b',
    uv:3000,
    pv:1398,
    amt:2310
  },
  {
    name:'page c',
    uv:2000,
    pv:7600,
    amt:2290
  },
  {
    name:'page d',
    uv:2780,
    pv:3908,
    amt:2000
  },
  {
    name:'page e',
    uv:3456,
    pv:4800,
    amt:2181
  },
  {
    name:'page f',
    uv:3954,
    pv:3478,
    amt:2459
  },
  {
    name:'page g',
    uv:2390,
    pv:3800,
    amt:2500
  },
  {
    name:'page h',
    uv:3490,
    pv:4300,
    amt:2100
  },
]
const Chart = ({aspect,title}) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart width={730} height={250} data={data} margin={{top:10,right:30,left:0,bottom:0}}>
          <defs>
            <linearGradient id="colorUv" xl='0' yl='0' x2='0' y2='0'>
              <stop offset='5%' stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset='95%' stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" xl='0' yl='0' x2='0' y2='0'>
              <stop offset='5%' stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset='95%' stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAmt" xl='0' yl='0' x2='0' y2='0'>
              <stop offset='5%' stopColor="red" stopOpacity={0.8}/>
              <stop offset='95%' stopColor="red" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" stroke="gray"/>
          <Tooltip/>
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#888d48"/>
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d"/>
          <Area type="monotone" dataKey="amt" stroke="red" fill="red"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart