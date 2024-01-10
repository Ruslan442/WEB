import React from "react";
import { useEffect, useState } from 'react'
import axios from 'axios';
import type { ColumnsType } from 'antd/es/table';
import {Table, Button} from 'antd';

interface DataType {
    country: string;
    name: string;
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Страна',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Название школы',
      dataIndex: 'name',
      key: 'name',
    },
  ]
  

export const Pagination = () => {

    
  const [page, setPage] = useState<number>(1);

  const [dataSourse, setDataSourse] = useState<DataType[]>();

    const getUniversity = async (page: number, limit: number) => {
    const response = await axios.get(`http://universities.hipolabs.com/search?offset=${page}&limit=${limit}`)
    setDataSourse(response.data);    
  }

  const LIMIT_LIST_SCHOOL = 10;

  useEffect(() => {
    getUniversity(page, LIMIT_LIST_SCHOOL)
  }, [page])



    return (    
    <>
        <Table dataSource={dataSourse} columns={columns} pagination={false}/>
        <Button onClick={() => setPage(page - 1)} disabled={!page}>Назад</Button>
        <Button onClick={() => setPage(page + 1)}>Вперед</Button>
    </>
    )
}

export default Pagination;