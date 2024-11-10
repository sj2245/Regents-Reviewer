'use client';

import Table from '../../table/table'; 
import { useContext, useState } from 'react';
import { SharedDatabase } from '@/app/shared/shared';

export default function QuestionTable() {
  let { questions } = useContext<any>(SharedDatabase);
  let [questionColumns,] = useState([
    { field: `id`, headerName: `ID`, sortable: true, width: 50 },
    { field: `subject`, headerName: `Subject`, width: 57, editable: false, },
    { field: `topics`, headerName: `Topics`, width: 267, editable: false, },
    { field: `question`, headerName: `Question`, sortable: true, width: 444, editable: true, },
    { field: `answer`, headerName: `Answers`, width: 82, editable: false, },
    { field: `choices`, headerName: `Options`, width: 106, editable: false, },
    { field: `difficulty`, headerName: `Difficulty`, sortable: false, width: 70, },
    { field: `explanation`, headerName: `Explanation`, width: 433, editable: true, },
  ])

  return (
    <div>Table</div>
    // <Table columns={questionColumns} rows={questions} pageSize={10} />
  )
}