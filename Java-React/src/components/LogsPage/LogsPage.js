import React, {useEffect} from 'react'
import {Card, Row, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../redux/actions";
import {MinusCircleOutlined, PlusSquareOutlined, SwapOutlined} from "@ant-design/icons";


export default function LogsPage() {
	const {logs} = useSelector(state => state.reducer)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(new Actions().getLogs())
	}, []);


	const columns = [
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			width: 150,
			render: (text) =>
				<Row align={'middle'} justify={"space-between"}>
					{text === "Add Card" || text === "Add Board" ? <PlusSquareOutlined/> : (text==="Replace Card" ? <SwapOutlined /> :<MinusCircleOutlined/>)}
					<span style={{fontSize:14}}>{text}</span>
				</Row>

		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
		},
		{
			title: 'Date',
			dataIndex: 'createDate',
			key: 'createDate',
			width: 200,
		},
	];
	return (
		<Card size="small" style={{padding: 30}}>
			<Table dataSource={logs} columns={columns} bordered/>;
		</Card>
	)
}