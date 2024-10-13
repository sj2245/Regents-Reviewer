import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { gameOfThronesCharacterTableColumns, gameOfThronesCharacterTableRows } from '@/app/shared/database/sample-table-data';

export type DataGridOptions = {
  rows?: any[];
  columns?: GridColDef<(typeof defaultRows)[number]>[] | any[];
}

export const defaultRows = gameOfThronesCharacterTableRows;
export const defaultColumns = gameOfThronesCharacterTableColumns;

export default function Table({
    rows = defaultRows,
    columns = defaultColumns,
  }: DataGridOptions) {
    return (
        <Box className={`datagrid dataGridBox`} sx={{ width: `95%`, margin: `0 auto` }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
        />
        </Box>
    )
}