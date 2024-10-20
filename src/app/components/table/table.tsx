import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { gameOfThronesCharacterTableColumns, gameOfThronesCharacterTableRows } from '@/app/shared/database/sample-table-data';

export type DataGridOptions = {
  rows?: any[];
  pageSize?: number;
  columns?: GridColDef<(typeof defaultRows)[number]>[] | any[];
}

export const defaultRows = gameOfThronesCharacterTableRows;
export const defaultColumns = gameOfThronesCharacterTableColumns;

export default function Table({
    pageSize = 5,
    rows = defaultRows,
    columns = defaultColumns,
  }: DataGridOptions) {

    const onEditStop = (e?: any) => {
        console.log(`On Edit Stop`, e);
    }

    return (
        <Box className={`datagrid dataGridBox`} sx={{ width: `95%`, margin: `0 auto` }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                pageSizeOptions={[pageSize]}
                disableRowSelectionOnClick
                onCellEditStop={(e) => onEditStop(e)}
                initialState={{
                pagination: {
                    paginationModel: {
                        pageSize,
                    },
                },
            }}
        />
        </Box>
    )
}