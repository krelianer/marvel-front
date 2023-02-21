import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper';
import Moment from 'moment';
import 'moment/locale/fr';

export const DEFAULT_CHARACTER_SORT_DIRECTION = "asc";
export const DEFAULT_CHARACTER_SORT_FIELD = "name";

const headCells = [
  {
    id: "name",
    label: "Name",
    align: "left",
    sortActive: true
  },
  {
    id: "id",
    label: "Id",
    align: "right",
    sortActive: false
  },
  {
    id: "modified",
    label: "Modified",
    align: "right",
    sortActive: true
  }
]

const CharacterTable = forwardRef((props, ref) => {

  const { characters, shouldDisplay, characterEntries, onSearchChange, onCharacterSelect } = props;

  const [page, setPage] = useState(0);
  const [sortDirection, setSortDirection] = useState(DEFAULT_CHARACTER_SORT_DIRECTION);
  const [sortField, setSortField] = useState(DEFAULT_CHARACTER_SORT_FIELD);

  useImperativeHandle(ref, () => ({
    resetTable
  }));

  /**
   * Reset the table state to it's original form
   */
  const resetTable = () => {
    setPage(0);
    setSortDirection(DEFAULT_CHARACTER_SORT_FIELD);
    setSortField(DEFAULT_CHARACTER_SORT_FIELD);
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
    onSearchChange(newPage, sortDirection, sortField);
  }

  const handleSort = (property) => {
    // Id cannot be sorted since the API does not handle it
    if (property === 'id')
      return;

    if (property === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortDirection("asc");
    }
    setSortField(property);
    onSearchChange(page, sortDirection, property);
  };

  return (
    <div>
      {shouldDisplay &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            {/* Table Header */}
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    onClick={() => handleSort(headCell.id)}
                    align={headCell.align}>
                    {headCell.sortActive && <TableSortLabel
                      active={sortField === headCell.id}
                      direction={sortDirection}>
                      {headCell.label}
                    </TableSortLabel>}
                    {!headCell.sortActive &&
                      headCell.label
                    }
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {characters.map((row) => (
                <TableRow onClick={() => onCharacterSelect(row)}
                  key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{Moment(row.modified).format('DD MMMM YYYY, h:mm:ss a')}</TableCell>
                </TableRow>
              ))}
            </TableBody>


            {/* Table Footer */}
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={characterEntries}
                  rowsPerPage={20}
                  rowsPerPageOptions={[]}
                  page={page}
                  onPageChange={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer >
      }
    </div>
  )
});

CharacterTable.propTypes = {
  characters: PropTypes.array.isRequired,
  characterEntries: PropTypes.number.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onCharacterSelect: PropTypes.func.isRequired,
  shouldDisplay: PropTypes.bool.isRequired
};

export default CharacterTable