import React from 'react';
import { Badge } from 'react-bootstrap';

const FilterPills = ({ filters, removeFilter }) => {
    const filtersWithIdAndName = filters.map((filter) => {
        return { id: filter, name: filter }
    }) 
  return (
    <div>
      {filtersWithIdAndName.map((filter) => (
        <Badge pill bg="primary" key={filter.id} className="me-2">
          {filter.name}
          <span onClick={() => removeFilter(filter.id)} style={{ cursor: 'pointer', marginLeft: '5px' }}>×</span>
        </Badge>
      ))}
    </div>
  );
};

export default FilterPills;