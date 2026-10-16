import "./table.scss"
import Table from "@mui/material/Table"
import  TableBody  from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer  from "@mui/material/TableContainer"
import  TableHead from "@mui/material/TableHead"
import  Paper  from "@mui/material/Paper"
import  TableRow  from "@mui/material/TableRow"

const TABLE = () => {
    const rows= [
        {
            id:33234345,
            product:"Playstation 5",
            img:"/demo/img/t1.svg",
            customer:"David",
            date:"1 mars",
            amount:980,
            method:"Online Payment",
            status:"Pending",
        },
        {
            id:432454345,
            product:"Redragon",
            img:"/demo/img/t2.svg",
            customer:"Gerald",
            date:"1 mars",
            amount:670,
            method:"Casb on Delivery",
            status:"Pending",
        },
        {
            id:1278439,
            product:"Acer-nitro5",
            img:"/demo/img/t3.svg",
            customer:"John",
            date:"1 mars",
            amount:785,
            method:"Cash on Delivery",
            status:"Approved",
        },
        {
            id:235745,
            product:"Raser Blade",
            img:"/demo/img/t4.svg",
            customer:"Jane",
            date:"1 mars",
            amount:920,
            method:"Online",
            status:"Approved",
        },
        {
            id:234345,
            product:"Asus",
            img:"/demo/img/t5.svg",
            customer:"Harold",
            date:"1 mars",
            amount:2000,
            method:"Online",
            status:"Pending",
        },
    ]

  return (
    <TableContainer component={Paper} className='table'>
        <Table aria-label="simple table" sx={{minwidth:650}}>
            <TableHead>
            <TableRow>
                <TableCell className='tablecell'>ID</TableCell>
                <TableCell className='tablecell'>Product</TableCell>
                <TableCell className='tablecell'>Customer</TableCell>
                <TableCell className='tablecell'>Date</TableCell>
                <TableCell className='tablecell'>Amount</TableCell>
                <TableCell className='tablecell'>Payment Method</TableCell>
                <TableCell className='tablecell'>Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row)=>(
                    <TableRow key={row.id}>
                        <TableCell className='tablecell'>{row.id}</TableCell>
                        <TableCell className='tablecell'>
                            <div className="cellWrapper">
                                <img src={row.img} alt="" className="image" />
                                {row.product}
                            </div>
                        </TableCell>
                        <TableCell className='tablecell'>{row.customer}</TableCell>
                        <TableCell className='tablecell'>{row.date}</TableCell>
                        <TableCell className='tablecell'>{row.amount}</TableCell>
                        <TableCell className='tablecell'>{row.method}</TableCell>
                        <TableCell className='tablecell'>
                            <span className={`status ${row.status}`}>{row.status}</span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    )
}

export default TABLE