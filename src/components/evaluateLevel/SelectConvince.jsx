import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { getProvinces, getDistrictsByProvince } from 'sub-vn';

const SelectConvince = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // Lấy danh sách tỉnh khi load component
  useEffect(() => {
    const provincesData = getProvinces();
    setProvinces(provincesData);
  }, []);

  // Khi chọn tỉnh, cập nhật danh sách huyện
  const handleProvinceChange = (event) => {
    const provinceCode = event.target.value;
    setSelectedProvince(provinceCode);
    setSelectedDistrict(''); // Reset huyện khi chọn tỉnh mới
    const districtsData = getDistrictsByProvince(provinceCode);
    setDistricts(districtsData);
  };

  // Khi chọn huyện
  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
      {/* Select Province */}
      <FormControl fullWidth>
        <InputLabel>Tỉnh / Thành phố</InputLabel>
        <Select
          value={selectedProvince}
          label="Tỉnh / Thành phố"
          onChange={handleProvinceChange}
        >
          {provinces.map((province) => (
            <MenuItem key={province.code} value={province.code}>
              {province.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Select District */}
      <FormControl fullWidth disabled={!selectedProvince}>
        <InputLabel>Quận / Huyện</InputLabel>
        <Select
          value={selectedDistrict}
          label="Quận / Huyện"
          onChange={handleDistrictChange}
        >
          {districts.map((district) => (
            <MenuItem key={district.code} value={district.code}>
              {district.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectConvince;
