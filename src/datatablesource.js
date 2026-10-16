export const userColumns = [{field:'id',headerName:'ID',width:100},
    {
        field:'user',headerName:"User",width:170,renderCell:(params)=>{
            return(
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img} alt="avatar"/>
                    {params.row.username}
                </div>
            )
        }
    },
    {
        field:'tel',headerName:'Telephone',width:120
    },
    {
        field:'email',headerName:'Email',width:200
    },

    {
        field:'age',headerName:'Age',width:90
    },
    {
        field:'role',headerName:'Role',width:150
    },
    {
        field:'salaire',headerName:'Salaire',width:90
    },
    {
        field:'status',headerName:'Status',width:90,
        renderCell:(params)=>{
            return(
                <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
            )
        }
    }
]

export const productColumns=[
    {field:'id',headerName:'ID',width:100},
    {
        field:'product',headerName:"Products",width:230,renderCell:(params)=>{
            return(
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img} alt="avatar"/>
                    {params.row.produit}
                </div>
            )
        }
    },
    {
        field:'category',headerName:'Category',width:140
    },
    {
        field:'prix',headerName:'Prix',width:100
    },
    {
        field:'stock',headerName:'Stock',width:100
    },
    {
        field:'status',headerName:'Etat',width:160,
        renderCell:(params)=>{
            return(
                <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
            )
        }
    }
]